/**
 * Stringify a value with special handling for arrays of strings or numbers.
 * Arrays of strings or numbers are rendered on a single line, while complex arrays
 * are stringified normally.
 *
 * @param i - The value to stringify
 * @returns The stringified value
 */
export function stringify(i: unknown): string {
  // First stringify the value with standard indentation
  let value = JSON.stringify(i, null, 4)

  // Handle string values (remove quotes)
  if (value.charAt(0) === '"') {
    value = value.substring(1)
    if (value.charAt(value.length - 1) === '"') {
      value = value.substring(0, value.length - 1)
    }
    return value
  }

  // Handle arrays
  if (Array.isArray(i)) {
    // Check if array contains only strings or numbers
    const isSimpleArray = i.every(item =>
                                    typeof item === 'string' ||
                                    typeof item === 'number'
    )

    if (isSimpleArray) {
      // Format simple arrays on a single line
      return '[ ' + i.map(item =>
                            typeof item === 'string' ? `"${item}"` : item
      ).join(', ') + ' ]'
    }
  }

  // Process nested arrays in objects
  if (typeof i === 'object' && i !== null) {
    try {
      // Parse the JSON string to work with the object structure
      const obj = JSON.parse(value)

      // Function to process object and its nested properties
      const processObject = (obj: any): any => {
        if (!obj || typeof obj !== 'object') return obj

        // Handle arrays
        if (Array.isArray(obj)) {
          const isSimpleArray = obj.every(item =>
                                            typeof item === 'string' ||
                                            typeof item === 'number'
          )

          if (isSimpleArray) {
            // Mark simple arrays for later formatting
            return { __simpleArray: true, values: obj }
          }

          // Process each item in complex arrays
          return obj.map(item => processObject(item))
        }

        // Process object properties
        const result: any = {}
        for (const key in obj) {
          result[key] = processObject(obj[key])
        }
        return result
      }

      // Process the object
      const processed = processObject(obj)

      // Convert back to JSON string with custom replacer
      const formattedJson = JSON.stringify(processed, (key, value) => {
        if (value && typeof value === 'object' && value.__simpleArray === true) {
          // Format simple arrays on a single line
          return value.values
        }
        return value
      }, 4)

      // Replace simple array formatting in the JSON string
      return formattedJson.replace(/\[\s+(?:(?:"[^"]*")|(?:\d+))(?:,\s+(?:(?:"[^"]*")|(?:\d+)))*\s+\]/g, (match) => {
        // Convert multi-line array to single line
        return match.replace(/\s+/g, ' ')
      })
    } catch (e) {
      // If any error occurs during processing, return the original value
      return value
    }
  }

  return value
}
