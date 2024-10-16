/**
 * Count the number of nodes in a JSON structure
 * @param jsonData
 */
export function countNodes(jsonData: any) {
  let count = 0
  if (typeof jsonData === 'object' && jsonData !== null) {
    for (const key in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
        ++count
        count += countNodes(jsonData[key])
      }
    }
  }
  return count
}
