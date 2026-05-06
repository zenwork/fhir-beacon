/**
 * Check if object has only one specific property defined. This is useful with some types that have no required
 * properties and require different display logic based on what is defined.
 *
 * @param obj the object to inspect
 * @param prop the property to check for
 */
export function hasOnly(obj: Record<string, unknown>, prop: string) {
	const hasOneProperty = Object.keys(obj).length === 1;
	const hasThisProp = Object.prototype.hasOwnProperty.call(obj, prop);
	const propDefined = obj[prop] !== undefined;
	return hasOneProperty && hasThisProp && propDefined;
}
