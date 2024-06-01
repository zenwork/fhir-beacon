/**
 * Count the number of nodes in a JSON structure
 * @param jsonData
 */
export function countNodes(jsonData: any) {
  let count = 0
  if (typeof jsonData === 'object' && jsonData !== null) {
    for (let key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        ++count
        count += countNodes(jsonData[key])
      }
    }
  }
  return count
}
