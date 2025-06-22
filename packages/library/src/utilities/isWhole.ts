export function isWholeNumber(num: string | number | undefined): boolean {
  if (num === undefined) return false
  if (typeof num === 'string') return parseFloat(num) === Math.round(parseFloat(num))
  return num === Math.round(num)
}
