export const hasSome = (data: Array<any> | null | undefined, verbose: boolean = false) => {
  return verbose || (Array.isArray(data) && data.length > 0)
}

/**
 * The hasMany function determines if an array has more than 1 item.
 *
 * @param {Array<any> | null | undefined} data - The data array to check.
 * @param {boolean} [verbose=false] - Optional parameter to enable verbose mode.
 * @returns {boolean} - Returns true if the array has more than one item, false otherwise.
 */
export const hasMany = (data: Array<any> | null | undefined, verbose: boolean = false) => {
  return verbose || (Array.isArray(data) && data.length > 1)
}

export const hasOnlyOne = (data: Array<any> | null | undefined, verbose: boolean = false) => {
  return verbose || (Array.isArray(data) && data.length == 1)
}

// export const hasNone = (data: Array<any> | null | undefined, verbose: boolean = false) => {
//   return verbose || (!data || (Array.isArray(data) && data.length <= 0))
// }

export const isDefined = (data: any | null | undefined, verbose: boolean = false) => {
  return verbose || data
}
