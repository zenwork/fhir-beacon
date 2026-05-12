import type { CodeIds } from "../../codes";
import type { Choice } from "../../valuesets";
import type { Decorateable } from "../builder/builder.type";
import type { StructureDefinition } from "../definition/StructureDefinition";
import {
	type Defs,
	type ExtensionDef,
	type ExtensionLocation,
	type PropertyDef,
	isExtensionDef,
	isPropertyDef,
} from "../definition/definition.type";
import type {
	ErrorNodeKey,
	Validations,
} from "../../internal/base/Validations.type";
import { checkCardinality } from "./cardinalityChecker";
import { resolveValue } from "./pathResolver";

export function validateProfile<T extends Decorateable>(
	def: StructureDefinition<T>,
	data: T,
	validations: Validations,
): void {
	const profileName = def.type.profileName || def.type.value;

	checkChoiceGroups(def, data, validations, profileName);

	def.props.forEach((propDef: Defs<T>, storageKey: string) => {
		if (isPropertyDef(propDef)) {
			validatePropertyDef(propDef, data, validations, profileName, storageKey);
		} else if (isExtensionDef(propDef)) {
			validateExtensionDef(propDef, data as unknown, validations, profileName);
		}
	});
}

function checkChoiceGroups<T extends Decorateable>(
	def: StructureDefinition<T>,
	data: T,
	validations: Validations,
	profileName: string,
): void {
	const groups = new Map<string, string[]>();
	def.props.forEach((propDef: Defs<T>, storageKey: string) => {
		if (isPropertyDef(propDef) && propDef.choice) {
			const existing = groups.get(propDef.choice) ?? [];
			groups.set(propDef.choice, [...existing, storageKey]);
		}
	});

	groups.forEach((storageKeys, choicePrefix) => {
		const present = storageKeys.filter(
			(sk) => resolveValue(data, sk) != null,
		);
		if (present.length > 1) {
			validations.add({
				fqk: { path: [{ node: `${choicePrefix}[x]` }] },
				message: `Only one ${choicePrefix}[x] may be present, but found: ${present.join(", ")} (${profileName})`,
			});
		}
	});
}

function validatePropertyDef<T extends Decorateable>(
	def: PropertyDef<T>,
	data: T,
	validations: Validations,
	profileName: string,
	storageKey: string,
): void {
	// Use storage key for data access so choice props (e.g. "valueString") resolve correctly
	const value = resolveValue(data, storageKey);
	const fqk = { path: [{ node: storageKey }] };

	const cardResult = checkCardinality(value, def.cardinality);
	if (cardResult === "required") {
		validations.add({
			fqk,
			message: `${storageKey} is required (${def.cardinality}) (${profileName})`,
		});
	} else if (cardResult === "tooMany") {
		validations.add({
			fqk,
			message: `${storageKey} exceeds maximum cardinality (${def.cardinality}) (${profileName})`,
		});
	}

	if (def.type === "Reference" && def.typeNarrowing.length > 0 && value != null) {
		validateReferenceTypeNarrowing(
			def.typeNarrowing,
			value,
			validations,
			profileName,
			storageKey,
		);
	}

	def.constraints.forEach((constraint) => {
		const fixedValue = (constraint as { _fixedValue?: unknown })._fixedValue;
		const result = constraint(data, fixedValue);
		if (!result.success) {
			const message =
				((result as { success: false; message?: string }).message ??
					`Constraint ${String(constraint.name)} failed for ${storageKey}`) +
				` (${profileName})`;
			validations.add({ fqk, message });
		}
	});

	if (value == null) return;

	if (Array.isArray(def.bindings) && def.bindings.length > 0) {
		validateInlineCodeBinding(
			value,
			def.bindings as Choice[],
			fqk,
			validations,
			profileName,
		);
	} else if (typeof def.bindings === "string") {
		validateCodeIdsBinding(
			value,
			def.bindings as CodeIds,
			fqk,
			validations,
			profileName,
		);
	}
}

function validateInlineCodeBinding(
	value: unknown,
	choices: Choice[],
	fqk: { path: ErrorNodeKey[] },
	validations: Validations,
	profileName: string,
): void {
	if (typeof value !== "string") return;
	const isValid = choices.some((c) => c.value === value);
	if (!isValid) {
		const validCodes = choices.map((c) => c.value).join(", ");
		validations.add({
			fqk,
			message: `'${value}' is not a valid choice. Valid values: ${validCodes} (${profileName})`,
		});
	}
}

function validateCodeIdsBinding(
	value: unknown,
	id: CodeIds,
	fqk: { path: ErrorNodeKey[] },
	validations: Validations,
	profileName: string,
): void {
	if (typeof value !== "string") return;
	const choices = validations.choices(id);
	const isValid = choices.choices.some((c) => c.value === value);
	if (!isValid) {
		const validCodes = choices.choices.map((c) => c.value).join(", ");
		validations.add({
			fqk,
			message: `'${value}' is not a valid ${id} code. Valid codes are: ${validCodes} (${profileName})`,
		});
	}
}

function validateExtensionDef(
	def: ExtensionDef,
	data: unknown,
	validations: Validations,
	profileName: string,
): void {
	const pathPrefix: ErrorNodeKey[] = [
		{ node: "extension" },
		{ node: def.url },
	];

	const extensionArray = resolveExtensionArray(data, def.extensionLocation);
	const matching: Record<string, unknown>[] = extensionArray
		? (extensionArray.filter(
				(e): e is Record<string, unknown> =>
					typeof e === "object" &&
					e !== null &&
					(e as Record<string, unknown>).url === def.url,
			) as Record<string, unknown>[])
		: [];

	const cardResult = checkCardinality(matching, def.cardinality);
	if (cardResult === "required") {
		validations.add({
			fqk: { path: pathPrefix },
			message: `Extension ${def.url} is required (${def.cardinality}) (${profileName})`,
		});
	} else if (cardResult === "tooMany") {
		validations.add({
			fqk: { path: pathPrefix },
			message: `Extension ${def.url} exceeds maximum cardinality (${def.cardinality}) (${profileName})`,
		});
	}

	for (const entry of matching) {
		if (def.subdefs) {
			// biome-ignore lint/suspicious/noExplicitAny: subdefs are typed as any in definition
			def.subdefs.forEach((subDef: Defs<any>) => {
				if (isExtensionDef(subDef)) {
					validateExtensionSubDef(
						subDef,
						entry,
						pathPrefix,
						validations,
						profileName,
					);
				}
			});
		}
	}
}

function validateExtensionSubDef(
	def: ExtensionDef,
	parentEntry: Record<string, unknown>,
	parentPath: ErrorNodeKey[],
	validations: Validations,
	profileName: string,
): void {
	const keyStr = Array.isArray(def.key) ? def.key.join(".") : def.key;
	const value = resolveValue(parentEntry, def.key as string);
	if (value == null) return;

	const valuePath: ErrorNodeKey[] = [...parentPath, { node: keyStr }];
	const inlineChoices =
		Array.isArray(def.bindings) && def.bindings.length > 0
			? (def.bindings as Choice[])
			: null;

	if (inlineChoices) {
		if (def.valueType === "CodeableConcept") {
			validateCodeableConceptBinding(
				value as { coding?: Array<{ code?: string }> },
				inlineChoices,
				valuePath,
				validations,
				profileName,
			);
		} else if (def.valueType === "Coding") {
			validateCodingBinding(
				value as { code?: string },
				inlineChoices,
				valuePath,
				validations,
				profileName,
			);
		} else {
			if (typeof value === "string") {
				validateInlineCodeBinding(
					value,
					inlineChoices,
					{ path: valuePath },
					validations,
					profileName,
				);
			}
		}
	}
}

function validateCodeableConceptBinding(
	concept: { coding?: Array<{ code?: string }> },
	choices: Choice[],
	valuePath: ErrorNodeKey[],
	validations: Validations,
	profileName: string,
): void {
	concept.coding?.forEach((coding, index) => {
		const isValid = choices.some((c) => c.value === coding.code);
		if (!isValid) {
			const validCodes = choices.map((c) => c.value).join(", ");
			const codingNode: ErrorNodeKey =
				index === 0 ? { node: "coding" } : { node: "coding", index };
			validations.add({
				fqk: { path: [...valuePath, codingNode, { node: "code" }] },
				message: `'${coding.code}' is not a valid choice. Valid values: ${validCodes} (${profileName})`,
			});
		}
	});
}

function validateCodingBinding(
	coding: { code?: string },
	choices: Choice[],
	valuePath: ErrorNodeKey[],
	validations: Validations,
	profileName: string,
): void {
	const isValid = choices.some((c) => c.value === coding.code);
	if (!isValid) {
		const validCodes = choices.map((c) => c.value).join(", ");
		validations.add({
			fqk: { path: [...valuePath, { node: "code" }] },
			message: `'${coding.code}' is not a valid choice. Valid values: ${validCodes} (${profileName})`,
		});
	}
}

function resolveExtensionArray(
	data: unknown,
	location: ExtensionLocation,
): unknown[] | null {
	if (!data || typeof data !== "object") return null;
	const record = data as Record<string, unknown>;

	switch (location.kind) {
		case "root": {
			const ext = record.extension;
			return Array.isArray(ext) ? ext : null;
		}
		case "primitive": {
			const primitiveData = record[`_${location.primitiveKey}`];
			if (!primitiveData || typeof primitiveData !== "object") return null;
			const ext = (primitiveData as Record<string, unknown>).extension;
			return Array.isArray(ext) ? ext : null;
		}
		case "modifier": {
			const ext = record.modifierExtension;
			return Array.isArray(ext) ? ext : null;
		}
		case "nested":
			return null;
	}
}

function validateReferenceTypeNarrowing(
	allowedTypes: readonly string[],
	value: unknown,
	validations: Validations,
	profileName: string,
	storageKey: string,
): void {
	const entries = Array.isArray(value) ? value : [value];

	entries.forEach((item, index) => {
		if (!item || typeof item !== "object") return;

		const reference = (item as Record<string, unknown>).reference;
		if (typeof reference !== "string") return;

		const targetType = extractReferenceTargetType(reference, allowedTypes);
		if (!targetType || allowedTypes.includes(targetType)) return;

		const storageNode: ErrorNodeKey = Array.isArray(value)
			? { node: storageKey, index }
			: { node: storageKey };

		validations.add({
			fqk: { path: [storageNode, { node: "reference" }] },
			message: `${storageKey} reference target must be one of: ${allowedTypes.join(", ")}; found ${targetType} (${profileName})`,
		});
	});
}

function extractReferenceTargetType(
	reference: string,
	allowedTypes: readonly string[],
): string | null {
	const segments = referenceSegments(reference);
	if (segments.length === 0) return null;

	const allowedSegment = segments.find((segment) => allowedTypes.includes(segment));
	if (allowedSegment) return allowedSegment;

	if (!isAbsoluteReference(reference)) {
		return segments[0] ?? null;
	}

	const resourceLikeSegment = segments.find((segment, index) => {
		const nextSegment = segments[index + 1];
		return (
			/^[A-Z][A-Za-z]+$/.test(segment) &&
			nextSegment !== undefined &&
			nextSegment !== "_history"
		);
	});

	return resourceLikeSegment ?? null;
}

function referenceSegments(reference: string): string[] {
	const path = isAbsoluteReference(reference)
		? parseAbsoluteReferencePath(reference)
		: reference;

	return path
		.split("/")
		.map((segment) => segment.trim())
		.filter((segment) => segment.length > 0);
}

function parseAbsoluteReferencePath(reference: string): string {
	try {
		return new URL(reference).pathname;
	} catch {
		return reference;
	}
}

function isAbsoluteReference(reference: string): boolean {
	return /^[a-z][a-z0-9+.-]*:\/\//i.test(reference);
}
