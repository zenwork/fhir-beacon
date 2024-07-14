import {Comparators} from '../../../codesystems'
import {toPrimitive} from '../type-converters'


export type Comparator = { code: string, display: string, definition: string }
export const asQuantityComparator: toPrimitive<string, Comparator> = (code: string): Comparator => {
  const found = Comparators.concept.find(c => c.code == code)
  const display = found?.display || 'n/a'
  const definition = found?.definition || 'n/a'
  return {code: code || '', display, definition}
}
