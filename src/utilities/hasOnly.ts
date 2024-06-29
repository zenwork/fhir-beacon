/**
 * Check if object has only one specific property defined. This is useful with some types that have no required
 * properties and require different display logic based on what is defined.
 *
 * @param obj the object to inspect
 * @param prop the property to check for
 */
export function hasOnly(obj: any, prop: string) {
  return Object.keys(obj).length === 1 && obj.hasOwnProperty(prop) && obj[prop]
}
