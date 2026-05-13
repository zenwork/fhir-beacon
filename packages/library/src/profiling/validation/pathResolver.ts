export function resolveValue(data: unknown, key: string | string[]): unknown {
	if (Array.isArray(key)) {
		return key.reduce((current: unknown, segment: string) => {
			if (current == null || typeof current !== "object") return undefined;
			return (current as Record<string, unknown>)[segment];
		}, data);
	}
	if (data == null || typeof data !== "object") return undefined;
	return (data as Record<string, unknown>)[key];
}
