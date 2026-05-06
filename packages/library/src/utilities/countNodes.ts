/**
 * Count the number of nodes in a JSON structure
 * @param jsonData
 */
export function countNodes(jsonData: unknown) {
	let count = 0;
	if (typeof jsonData === "object" && jsonData !== null) {
		const typedData = jsonData as Record<string, unknown>;
		for (const key in typedData) {
			if (Object.prototype.hasOwnProperty.call(typedData, key)) {
				++count;
				count += countNodes(typedData[key]);
			}
		}
	}
	return count;
}
