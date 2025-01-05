/**
 * Extracts the value of a specific key from a JSON string without parsing.
 * @param key - The key whose value needs to be extracted.
 * @param jsonText - The JSON as plain text.
 * @returns The value as a string, or null if the key is not found.
 */
export function getValueFromJsonKey(key: string, jsonText: string): string | null {
  // Create a regex to match the key and its value
  const regExp = new RegExp(`"${key}"\\s*:\\s*"(.*?)"`)
  const match = jsonText.match(regExp)
  return match ? match[1] : null // Return the captured value or null if no match
}

/**
 * Checks if the File System Access API is available in the browser.
 * @returns A boolean indicating the availability of the API.
 */
export function isFileSystemAPISupported(): boolean {
  return (
    'showDirectoryPicker' in window &&
    'FileSystemHandle' in window &&
    'FileSystemDirectoryHandle' in window &&
    'FileSystemFileHandle' in window
  )
}
