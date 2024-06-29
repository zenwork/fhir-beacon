import {hasAll}  from './hasAll'
import {hasNone} from './hasNone'

/**
 * Check if object has all or none of the required properties defined. This is useful when a set of properties require to exist together.
 *
 * @param obj the object to inspect
 * @param prop the properties to check for
 */
export function hasAllOrNone(obj: any, props: string[]) {
  return hasAll(obj, props) || hasNone(obj, props)
}
