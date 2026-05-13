import { DatatypeDef } from "../../DatatypeDef";
import type { DatatypeName } from "../../DatatypeName";
import { PrimitiveDef } from "../../PrimitiveDef";
import type { PrimitiveName } from "../../PrimitiveName";
import { ResourceDef } from "../../ResourceDef";
import type { ResourceName } from "../../ResourceName";
import type { CodeIds } from "../../codes";
import type { DomainResourceData } from "../../internal";
import type { Choice, Choices } from "../../valuesets";
import type { Decorateable } from "../builder";
import { definitionProperty } from "../builder/definitionProperty";
import { StructureDefinition } from "../definition/StructureDefinition";
import type {
	DefConstraintAssertion,
	ExtensionDef,
	NarrowableNames,
	PropertyDef,
	TypeName,
} from "../definition/definition.type";
import { BindingStrength, Example } from "../util";
import { checkCardinality, resolveValue } from "../validation";

export type FhirStructureDefinition = {
	resourceType: string;
	id?: string;
	url?: string;
	name?: string;
	type: string;
	snapshot?: {
		element?: FhirElementDefinition[];
	};
};

export type FhirElementDefinition = {
	id?: string;
	path: string;
	min?: number;
	max?: string;
	type?: FhirElementType[];
	binding?: {
		strength?: string;
		valueSet?: string;
	};
	mustSupport?: boolean;
	isModifier?: boolean;
	isSummary?: boolean;
	sliceName?: string;
	slicing?: {
		discriminator?: unknown[];
		rules?: string;
	};
	constraint?: unknown[];
	condition?: string[];
	[key: `fixed${string}`]: unknown;
	[key: `pattern${string}`]: unknown;
};

export type FhirElementType = {
	code?: string;
	profile?: string[];
	targetProfile?: string[];
};

export type FhirStructureDefinitionImportDiagnostic = {
	severity: "warning" | "error";
	code:
		| "invalid-structure-definition"
		| "unsupported-feature"
		| "unsupported-type"
		| "skipped-element";
	path?: string;
	message: string;
};

export type FhirStructureDefinitionImportResult<T extends Decorateable> = {
	profile: StructureDefinition<T>;
	diagnostics: FhirStructureDefinitionImportDiagnostic[];
};

type FhirElementValueConstraint = {
	key: string;
	value: unknown;
};

type ImportedExtensionValueTypeName = DatatypeName | PrimitiveName;

export function importFhirStructureDefinition<
	T extends Decorateable = DomainResourceData,
>(
	source: FhirStructureDefinition,
): FhirStructureDefinitionImportResult<T> {
	const diagnostics: FhirStructureDefinitionImportDiagnostic[] = [];
	const type = toBeaconProfileType(source, diagnostics);
	const profile = new StructureDefinition<T>(type);
	const rootPath = source.type;

	if (source.resourceType !== "StructureDefinition") {
		diagnostics.push({
			severity: "error",
			code: "invalid-structure-definition",
			message: `Expected resourceType StructureDefinition, received ${source.resourceType}`,
		});
	}

	const elements = source.snapshot?.element;
	if (!elements) {
		diagnostics.push({
			severity: "error",
			code: "invalid-structure-definition",
			message: "StructureDefinition snapshot.element is missing",
		});
		return { profile, diagnostics };
	}

	const backboneRegistry = new Map<string, PropertyDef<T>>();
	const sliceChildrenByRootPath = buildSliceChildrenByRootPath(elements);
	for (const element of elements) {
		importElement(
			profile,
			rootPath,
			element,
			diagnostics,
			backboneRegistry,
			sliceChildrenByRootPath,
		);
	}

	return { profile, diagnostics };
}

function importElement<T extends Decorateable>(
	profile: StructureDefinition<T>,
	rootPath: string,
	element: FhirElementDefinition,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
	backboneRegistry: Map<string, PropertyDef<T>>,
	sliceChildrenByRootPath: Map<string, FhirElementDefinition[]>,
): void {
	if (element.path === rootPath) {
		reportUnsupportedElementMetadata(element, diagnostics);
		return;
	}

	if (!element.path.startsWith(`${rootPath}.`)) {
		diagnostics.push({
			severity: "warning",
			code: "skipped-element",
			path: element.path,
			message: `Skipped element outside root type ${rootPath}`,
		});
		return;
	}

	reportUnsupportedElementMetadata(element, diagnostics);

	const relativePath = element.path.slice(rootPath.length + 1);
	if (relativePath.includes(".")) {
		if (isSliceChildElement(element, rootPath, sliceChildrenByRootPath)) {
			return;
		}
		importNestedElement(rootPath, element, diagnostics, backboneRegistry);
		return;
	}

	const identityRelativePath = elementIdentityPath(element).slice(rootPath.length + 1);
	if (element.sliceName) {
		importNamedSlice(
			profile,
			rootPath,
			element,
			diagnostics,
			sliceChildrenByRootPath,
		);
		return;
	}

	if (relativePath.includes(":") || identityRelativePath.includes(":")) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message:
				"FHIR slice child element is not imported outside named slice processing",
		});
		return;
	}

	const typeRefs = element.type ?? [];
	if (typeRefs.length === 0) {
		diagnostics.push({
			severity: "warning",
			code: "skipped-element",
			path: element.path,
			message: "Skipped element without a type",
		});
		return;
	}

	const choicePrefix = choicePrefixFor(relativePath);
	for (const typeRef of typeRefs) {
		const typeName = toImportedTypeName(typeRef.code, rootPath, relativePath);
		if (!typeName) {
			diagnostics.push({
				severity: "warning",
				code: "unsupported-type",
				path: element.path,
				message: `Unsupported FHIR element type ${typeRef.code ?? "(missing)"}`,
			});
			continue;
		}

		const key = choicePrefix ? choiceKey(typeName) : relativePath;
		const storageKey = flattenImportedKey(key, choicePrefix);
		const fixedValue = fixedValueFor(element);
		const patternValue = patternValueFor(element);
		const constraints = [
			...(fixedValue ? [fixedValueConstraint<T>(storageKey, fixedValue.value)] : []),
			...(patternValue ? [patternConstraint<T>(storageKey, patternValue.value)] : []),
		];
		const property = definitionProperty<T>(
			key,
			typeName,
			typeNarrowingFor(typeRef, diagnostics, element.path),
			cardinalityFor(element),
			bindingFor(element),
			bindingStrengthFor(element, diagnostics),
			constraints,
			choicePrefix,
			undefined,
			element.mustSupport,
			element.isModifier,
			element.isSummary,
		);

		profile.set(property);
		if (typeRef.code === "BackboneElement") {
			const storedProperty = profile.getProperty(storageKey);
			if (storedProperty) {
				backboneRegistry.set(element.path, storedProperty);
			}
		}
	}
}

function importNamedSlice<T extends Decorateable>(
	profile: StructureDefinition<T>,
	rootPath: string,
	element: FhirElementDefinition,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
	sliceChildrenByRootPath: Map<string, FhirElementDefinition[]>,
): void {
	const sliceRootPath = elementIdentityPath(element);
	const sliceRelativePath = sliceRootPath.slice(rootPath.length + 1);
	if (!sliceRelativePath.includes(":") || sliceRelativePath.includes(":.")) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message: "FHIR named slice is missing a supported slice path",
		});
		return;
	}

	const parentRelativePath = sliceRelativePath.split(":")[0];
	const parent = profile.getProperty(parentRelativePath);
	if (!parent) {
		diagnostics.push({
			severity: "warning",
			code: "skipped-element",
			path: element.path,
			message: `Skipped named slice without imported parent ${rootPath}.${parentRelativePath}`,
		});
		return;
	}

	if (
		parentRelativePath === "modifierExtension" &&
		importModifierExtensionSlice(
			profile,
			rootPath,
			element,
			diagnostics,
			sliceChildrenByRootPath,
		)
	) {
		return;
	}

	const discriminator = sliceDiscriminatorFor(
		sliceRootPath,
		sliceChildrenByRootPath.get(sliceRootPath) ?? [],
	);
	if (!discriminator) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message:
				"FHIR named slice is not imported because no simple fixed or pattern discriminator child was found",
		});
		return;
	}

	const parentStorageKey = parent.storageKey ?? parentRelativePath;
	parent.constraints = parent.constraints.concat([
		namedSliceCardinalityConstraint<T>(
			parentStorageKey,
			discriminator.childPath,
			discriminator.value,
			cardinalityFor(element),
			element.sliceName,
		),
	]);
	diagnostics.push({
		severity: "warning",
		code: "unsupported-feature",
		path: element.path,
		message:
			"Imported named slice as a simplified discriminator-filtered cardinality constraint; full FHIR slicing semantics, ordering, open/closed rules, and reslicing are not enforced.",
	});
}

function importModifierExtensionSlice<T extends Decorateable>(
	profile: StructureDefinition<T>,
	rootPath: string,
	element: FhirElementDefinition,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
	sliceChildrenByRootPath: Map<string, FhirElementDefinition[]>,
): boolean {
	const sliceRootPath = elementIdentityPath(element);
	const children = sliceChildrenByRootPath.get(sliceRootPath) ?? [];
	const discriminator = sliceDiscriminatorFor(sliceRootPath, children);

	if (
		!discriminator ||
		discriminator.childPath !== "url" ||
		typeof discriminator.value !== "string"
	) {
		return false;
	}

	const valueChildren = children.filter((child) => {
		const childPath = elementIdentityPath(child).slice(sliceRootPath.length + 1);
		return childPath.startsWith("value");
	});

	if (valueChildren.length === 0) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message:
				"Modifier extension slice was imported for cardinality only; value[x] constraints were not found",
		});
		return false;
	}

	if (valueChildren.length > 1) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message:
				"Modifier extension slice contains multiple value[x] children; imported using the first value definition only",
		});
	}

	const valueChild = valueChildren[0];
	const valueTypes = valueChild.type ?? [];
	if (valueTypes.length === 0) {
		return false;
	}
	if (valueTypes.length > 1) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: valueChild.path,
			message:
				"Modifier extension value[x] has multiple type options; imported using the first type only",
		});
	}

	const typeCode = valueTypes[0]?.code;
	const importedType = toImportedTypeName(
		typeCode,
		rootPath,
		valueChild.path.slice(rootPath.length + 1),
	);
	if (!importedType || !isExtensionValueTypeName(importedType)) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-type",
			path: valueChild.path,
			message: `Unsupported modifier extension value type ${typeCode ?? "(missing)"}`,
		});
		return false;
	}

	const extensionDef: ExtensionDef = {
		defType: "extension",
		choice: undefined,
		key: element.sliceName ?? profileName(discriminator.value),
		url: discriminator.value,
		extensionLocation: { kind: "modifier", path: "modifierExtension" },
		label: element.sliceName ?? profileName(discriminator.value),
		display: undefined,
		description: undefined,
		valueType: importedType,
		valueTypeNarrowing: typeNarrowingFor(
			valueTypes[0]!,
			diagnostics,
			valueChild.path,
		),
		cardinality: cardinalityFor(element),
		bindings: bindingFor(valueChild),
		bindingStrength: bindingStrengthFor(valueChild, diagnostics),
		isModifier: true,
		isSummary: element.isSummary,
		subdefs: undefined,
		extendRender: new Map(),
		overrideRender: new Map(),
	};

	profile.set(extensionDef);
	return true;
}

function buildSliceChildrenByRootPath(
	elements: FhirElementDefinition[],
): Map<string, FhirElementDefinition[]> {
	const childrenByRootPath = new Map<string, FhirElementDefinition[]>();

	for (const element of elements) {
		const identityPath = elementIdentityPath(element);
		if (!identityPath.includes(":")) continue;

		const lastDotIndex = identityPath.lastIndexOf(".");
		if (lastDotIndex < 0) continue;

		const rootPath = identityPath.slice(0, lastDotIndex);
		if (!rootPath.includes(":")) continue;

		const children = childrenByRootPath.get(rootPath) ?? [];
		childrenByRootPath.set(rootPath, [...children, element]);
	}

	return childrenByRootPath;
}

function isSliceChildElement(
	element: FhirElementDefinition,
	rootPath: string,
	sliceChildrenByRootPath: Map<string, FhirElementDefinition[]>,
): boolean {
	const identityPath = elementIdentityPath(element);
	if (!identityPath.slice(rootPath.length + 1).includes(":")) return false;

	const lastDotIndex = identityPath.lastIndexOf(".");
	if (lastDotIndex < 0) return false;

	return sliceChildrenByRootPath.has(identityPath.slice(0, lastDotIndex));
}

function elementIdentityPath(element: FhirElementDefinition): string {
	return element.id ?? element.path;
}

function sliceDiscriminatorFor(
	sliceRootPath: string,
	children: FhirElementDefinition[],
): { childPath: string; value: unknown } | null {
	for (const child of children) {
		const childPath = elementIdentityPath(child).slice(sliceRootPath.length + 1);
		if (!childPath || childPath.includes(".")) continue;

		const fixedValue = fixedValueFor(child);
		if (fixedValue) {
			return { childPath, value: fixedValue.value };
		}

		const patternValue = patternValueFor(child);
		if (patternValue) {
			return { childPath, value: patternValue.value };
		}
	}

	return null;
}

function namedSliceCardinalityConstraint<T extends Decorateable>(
	parentStorageKey: string,
	discriminatorChildPath: string,
	discriminatorValue: unknown,
	sliceCardinality: string,
	sliceName: string | undefined,
): DefConstraintAssertion<T> {
	const constraint = ((data: T) => {
		const parentValue = resolveValue(data, parentStorageKey);
		if (!Array.isArray(parentValue)) return { success: true };

		const matchingItems = parentValue.filter((item) =>
			structurallyContains(
				resolveValue(item, discriminatorChildPath),
				discriminatorValue,
			),
		);
		const cardResult = checkCardinality(matchingItems, sliceCardinality);
		return {
			success: cardResult === "ok",
			message: `${parentStorageKey} slice${sliceName ? ` ${sliceName}` : ""} requires ${sliceCardinality} entries matching ${discriminatorChildPath} ${JSON.stringify(discriminatorValue)}`,
		};
	}) as DefConstraintAssertion<T>;

	constraint._constraintType = "slice-cardinality";
	return constraint;
}

function importNestedElement<T extends Decorateable>(
	rootPath: string,
	element: FhirElementDefinition,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
	backboneRegistry: Map<string, PropertyDef<T>>,
): void {
	const relativePath = element.path.slice(rootPath.length + 1);
	const firstDotIndex = relativePath.indexOf(".");
	const parentRelPath = relativePath.slice(0, firstDotIndex);
	const childRelPath = relativePath.slice(firstDotIndex + 1);

	if (childRelPath.includes(".")) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message: "Nested backbone import supports one child level only",
		});
		return;
	}

	const parent = backboneRegistry.get(`${rootPath}.${parentRelPath}`);
	if (!parent) {
		diagnostics.push({
			severity: "warning",
			code: "skipped-element",
			path: element.path,
			message: `Skipped nested element without imported backbone parent ${rootPath}.${parentRelPath}`,
		});
		return;
	}

	const typeRefs = element.type ?? [];
	if (typeRefs.length === 0) {
		diagnostics.push({
			severity: "warning",
			code: "skipped-element",
			path: element.path,
			message: "Skipped nested element without a type",
		});
		return;
	}

	parent.subdefs ??= new Map();
	const choicePrefix = choicePrefixFor(childRelPath);
	for (const typeRef of typeRefs) {
		const typeName = toImportedTypeName(typeRef.code, rootPath, relativePath);
		if (!typeName) {
			diagnostics.push({
				severity: "warning",
				code: "unsupported-type",
				path: element.path,
				message: `Unsupported FHIR element type ${typeRef.code ?? "(missing)"}`,
			});
			continue;
		}

		const key = choicePrefix ? choiceKey(typeName) : childRelPath;
		const storageKey = flattenImportedKey(key, choicePrefix);
		const fixedValue = fixedValueFor(element);
		const patternValue = patternValueFor(element);
		const constraints = [
			...(fixedValue ? [fixedValueConstraint<T>(storageKey, fixedValue.value)] : []),
			...(patternValue ? [patternConstraint<T>(storageKey, patternValue.value)] : []),
		];
		const childProperty = definitionProperty<T>(
			key,
			typeName,
			typeNarrowingFor(typeRef, diagnostics, element.path),
			cardinalityFor(element),
			bindingFor(element),
			bindingStrengthFor(element, diagnostics),
			constraints,
			choicePrefix,
			undefined,
			element.mustSupport,
			element.isModifier,
			element.isSummary,
		);

		parent.subdefs.set(storageKey, childProperty);
		if (typeRef.code === "BackboneElement") {
			backboneRegistry.set(element.path, childProperty);
		}
	}
}

function toBeaconProfileType(
	source: FhirStructureDefinition,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
): ResourceDef | DatatypeDef {
	const profileName = source.name ?? source.id ?? "";

	if (ResourceDef.isValid(source.type)) {
		return new ResourceDef(source.type as ResourceName, profileName);
	}

	if (DatatypeDef.isValid(source.type)) {
		return new DatatypeDef(source.type as DatatypeName, profileName);
	}

	diagnostics.push({
		severity: "error",
		code: "unsupported-type",
		message: `Unsupported StructureDefinition type ${source.type}`,
	});
	return new ResourceDef(source.type as never, profileName);
}

function toBeaconTypeName(typeCode: string | undefined): TypeName | null {
	if (!typeCode) return null;
	if (PrimitiveDef.isValid(typeCode)) return typeCode as TypeName;
	if (DatatypeDef.isValid(typeCode)) return typeCode as TypeName;
	if (ResourceDef.isValid(typeCode)) return typeCode as TypeName;
	return null;
}

function isExtensionValueTypeName(
	typeName: TypeName,
): typeName is ImportedExtensionValueTypeName {
	return PrimitiveDef.isValid(typeName) || DatatypeDef.isValid(typeName);
}

function toImportedTypeName(
	typeCode: string | undefined,
	rootPath: string,
	relativePath: string,
): TypeName | null {
	if (typeCode === "BackboneElement") {
		return backboneTypeNameFor(rootPath, relativePath);
	}
	return toBeaconTypeName(typeCode);
}

function backboneTypeNameFor(rootPath: string, relativePath: string): TypeName {
	return `${rootPath}${capitalizePath(relativePath)}` as TypeName;
}

function capitalizePath(path: string): string {
	return path
		.split(".")
		.map((segment) => segment.replace(/:.+$/, ""))
		.filter(Boolean)
		.map((segment) => `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`)
		.join("");
}

function cardinalityFor(element: FhirElementDefinition): string {
	return `${element.min ?? 0}..${element.max ?? "1"}`;
}

function bindingFor(
	element: FhirElementDefinition,
): CodeIds | Choice[] | Choices {
	const valueSet = element.binding?.valueSet;
	if (!valueSet) return [];
	return valueSetToCodeId(valueSet) as CodeIds;
}

function bindingStrengthFor(
	element: FhirElementDefinition,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
): BindingStrength {
	const strength = element.binding?.strength;
	if (!strength) return Example;

	const parsed = BindingStrength.fromString(strength);
	if (parsed) return parsed;

	diagnostics.push({
		severity: "warning",
		code: "unsupported-feature",
		path: element.path,
		message: `Unsupported binding strength ${strength}; imported as example`,
	});
	return Example;
}

function valueSetToCodeId(valueSet: string): string {
	const tail = valueSet.split("|")[0]?.split("/").filter(Boolean).pop();
	if (!tail) return valueSet;
	return tail.startsWith("vs-") ? tail : `vs-${tail}`;
}

function choicePrefixFor(path: string): string | undefined {
	return path.endsWith("[x]") ? path.slice(0, -3) : undefined;
}

function choiceKey(typeName: TypeName): string {
	return `${typeName.charAt(0).toUpperCase()}${typeName.slice(1)}`;
}

function flattenImportedKey(key: string, choicePrefix: string | undefined): string {
	return `${choicePrefix ?? ""}${key}`;
}

function typeNarrowingFor(
	typeRef: FhirElementType,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
	path: string,
): NarrowableNames[] {
	const profiles = typeRef.targetProfile ?? typeRef.profile ?? [];
	const narrowed: NarrowableNames[] = [];

	for (const profile of profiles) {
		const name = profileName(profile);
		if (ResourceDef.isValid(name) || DatatypeDef.isValid(name)) {
			narrowed.push(name as NarrowableNames);
		} else {
			diagnostics.push({
				severity: "warning",
				code: "unsupported-type",
				path,
				message: `Unsupported type narrowing profile ${profile}`,
			});
		}
	}

	return narrowed;
}

function profileName(profileUrl: string): string {
	const url = profileUrl.split("|")[0] ?? profileUrl;
	return url.split("/").filter(Boolean).pop() ?? url;
}

function fixedValueFor(
	element: FhirElementDefinition,
): FhirElementValueConstraint | undefined {
	const record = element as Record<string, unknown>;
	const fixedKeys = Object.keys(element).filter(
		(key) => key.startsWith("fixed") && record[key] !== undefined,
	);
	if (fixedKeys.length === 0) return undefined;
	const key = fixedKeys[0];
	return { key, value: record[key] };
}

function patternValueFor(
	element: FhirElementDefinition,
): FhirElementValueConstraint | undefined {
	const record = element as Record<string, unknown>;
	const patternKeys = Object.keys(element).filter(
		(key) => key.startsWith("pattern") && record[key] !== undefined,
	);
	if (patternKeys.length === 0) return undefined;
	const key = patternKeys[0];
	return { key, value: record[key] };
}

function fixedValueConstraint<T extends Decorateable>(
	storageKey: string,
	fixedValue: unknown,
): DefConstraintAssertion<T> {
	const constraint = ((data: T, expected: unknown = fixedValue) => {
		const actual = resolveValue(data, storageKey);
		return {
			success: deepEqual(actual, expected),
			message: `${storageKey} must equal fixed value ${JSON.stringify(expected)}`,
		};
	}) as DefConstraintAssertion<T> & { _fixedValue?: unknown };

	constraint._fixedValue = fixedValue;
	return constraint;
}

function patternConstraint<T extends Decorateable>(
	storageKey: string,
	patternValue: unknown,
): DefConstraintAssertion<T> {
	const constraint = ((data: T) => {
		const actual = resolveValue(data, storageKey);
		return {
			success: structurallyContains(actual, patternValue),
			message: `${storageKey} must match pattern ${JSON.stringify(patternValue)}`,
		};
	}) as DefConstraintAssertion<T>;

	constraint._constraintType = "pattern";
	return constraint;
}

function structurallyContains(actual: unknown, pattern: unknown): boolean {
	if (pattern == null || actual == null) return Object.is(actual, pattern);

	if (Array.isArray(pattern)) {
		// MVP behavior: array pattern matching is exact JSON equality, not full FHIR pattern[x] semantics.
		return deepEqual(actual, pattern);
	}

	if (typeof pattern !== "object") {
		return Object.is(actual, pattern) || deepEqual(actual, pattern);
	}

	if (typeof actual !== "object" || Array.isArray(actual)) return false;

	const actualRecord = actual as Record<string, unknown>;
	const patternRecord = pattern as Record<string, unknown>;

	return Object.keys(patternRecord).every(
		(key) =>
			Object.prototype.hasOwnProperty.call(actualRecord, key) &&
			structurallyContains(actualRecord[key], patternRecord[key]),
	);
}

function deepEqual(actual: unknown, expected: unknown): boolean {
	return JSON.stringify(actual) === JSON.stringify(expected);
}

function reportUnsupportedElementMetadata(
	element: FhirElementDefinition,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
): void {
	if (element.slicing) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message: "FHIR slicing metadata is not imported yet",
		});
	}

	if (element.constraint?.length) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message: "FHIRPath constraints are not imported yet",
		});
	}

	if (element.condition?.length) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message: "FHIR element conditions are not imported yet",
		});
	}

}
