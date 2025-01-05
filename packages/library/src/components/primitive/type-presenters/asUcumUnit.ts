import {FhirUcumUnits} from '../../../codesystems/code-systems'
import {toPrimitive}   from '../type-converters/type-converters'


export type Ucum = { code: string, display: string }


export const asUcumUnit: toPrimitive<string, Ucum> = (code: string): Ucum => {
  const found = FhirUcumUnits.concepts.find(c => c.code == code)
  const display = found?.display || 'n/a'

  return { code: code || '', display }
}
