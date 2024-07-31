export function isBlank(val: unknown): boolean {
  return val === null || val === undefined || val + '' === ''
}
