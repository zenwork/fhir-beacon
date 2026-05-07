export type CardinalityResult = "ok" | "required" | "tooMany";

export function parseCardinality(cardinality: string): {
	min: number;
	max: number | null;
} {
	const [minPart, maxPart] = cardinality.split("..");
	return {
		min: Number.parseInt(minPart, 10),
		max: maxPart === "*" ? null : Number.parseInt(maxPart, 10),
	};
}

export function checkCardinality(
	value: unknown,
	cardinality: string,
): CardinalityResult {
	const { min, max } = parseCardinality(cardinality);

	if (Array.isArray(value)) {
		const count = value.length;
		if (count < min) return "required";
		if (max !== null && count > max) return "tooMany";
		return "ok";
	}

	const present = value !== undefined && value !== null;
	if (min >= 1 && !present) return "required";
	if (max === 0 && present) return "tooMany";
	return "ok";
}
