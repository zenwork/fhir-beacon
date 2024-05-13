import {Comparators} from '../../codesystems'
import {toPrimitive} from '../converters'

export type Comparator = { code: string, display: string, definition: string }
export const asQuantityComparator: toPrimitive<string, Comparator> = (code: string): Comparator => {
  let found = Comparators.concept.find(c => c.code == code)
  let display = found?.display || 'n/a'
  let definition = found?.definition || 'n/a'
  return {code: code || '', display, definition}
}
