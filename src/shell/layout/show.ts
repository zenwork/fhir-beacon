/**
 * Displays the index if it is a number, otherwise returns an empty string.
 * @param {number|string} idx - The index to be displayed.
 * @return {string} - The formatted index or an empty string.
 */
export function show(idx: number | ''): string {
  return typeof idx === 'number' ? ' ' + idx : ''
}
