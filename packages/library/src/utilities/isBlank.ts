export function isBlank(val: unknown): boolean {
  // Explicit check for booleans
  if (typeof val === 'boolean') {
    return false
  }
  // Original checks, excluding true and false as string
  return val === null || val === undefined || val + '' === ''
}
