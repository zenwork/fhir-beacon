import {Comparators} from '../../../codesystems/code-systems'
import {toPrimitive} from '../type-converters/type-converters'


export type Comparator = { code: string, display: string, definition: string }

export function quantityComparatorChoices(): { display: string, code: string, definition: string }[] {
  return Comparators.concept
}

export const asQuantityComparator: toPrimitive<string, Comparator> = (code: string): Comparator => {
  const found = quantityComparatorChoices().find(c => c.code == code)
  const display = found?.display || 'n/a'
  const definition = found?.definition || 'n/a'
  return { code: code || '', display, definition }
}
