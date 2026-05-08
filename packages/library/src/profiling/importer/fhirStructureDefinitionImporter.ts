import { DatatypeDef } from "../../DatatypeDef";
import type { DatatypeName } from "../../DatatypeName";
import { PrimitiveDef } from "../../PrimitiveDef";
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
	NarrowableNames,
	TypeName,
} from "../definition/definition.type";
import { BindingStrength, Example } from "../util";
import { resolveValue } from "../validation";

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

type FixedValue = {
	key: string;
	value: unknown;
};

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

	for (const element of elements) {
		importElement(profile, rootPath, element, diagnostics);
	}

	return { profile, diagnostics };
}

function importElement<T extends Decorateable>(
	profile: StructureDefinition<T>,
	rootPath: string,
	element: FhirElementDefinition,
	diagnostics: FhirStructureDefinitionImportDiagnostic[],
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
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message: "Nested backbone and nested extension import is not supported yet",
		});
		return;
	}

	if (element.sliceName || relativePath.includes(":")) {
		diagnostics.push({
			severity: "warning",
			code: "unsupported-feature",
			path: element.path,
			message: "FHIR slicing and named slices are not imported yet",
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
		const typeName = toBeaconTypeName(typeRef.code);
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
		const constraints = fixedValue
			? [fixedValueConstraint<T>(storageKey, fixedValue.value)]
			: [];
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
): FixedValue | undefined {
	const record = element as Record<string, unknown>;
	const fixedKeys = Object.keys(element).filter(
		(key) => key.startsWith("fixed") && record[key] !== undefined,
	);
	if (fixedKeys.length === 0) return undefined;
	const key = fixedKeys[0];
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

	for (const key of Object.keys(element)) {
		if (key.startsWith("pattern")) {
			diagnostics.push({
				severity: "warning",
				code: "unsupported-feature",
				path: element.path,
				message: `FHIR ${key} metadata is not imported yet`,
			});
		}
	}
}
