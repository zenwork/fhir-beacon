/**
 * Check if object has all or none of the required properties defined. This is useful when a set of properties require to exist together.
 *
 * @param obj the object to inspect
 * @param props the properties to check for
 */
export function hasAll(obj: any, props: string[]) {
  return props.reduce((acc, p) => Object.prototype.hasOwnProperty.call(obj, p) && acc, true)
}
