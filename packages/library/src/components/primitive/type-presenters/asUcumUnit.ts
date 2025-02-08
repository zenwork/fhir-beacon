import {useSystem}     from '../../../codes/use-system'
import {Choice}        from '../../../valuesets/ValueSet.data'
import {toPrimitive}   from '../type-converters/type-converters'


export type Ucum = { code: string, display: string }


export const asUcumUnit: toPrimitive<string, Ucum> = (code: string): Ucum => {
  const found: Choice | undefined = useSystem('http://hl7.org/fhir/ValueSet/ucum-common').choices.find(c => c.value === code)

  const display = found?.display || 'n/a'

  return { code: code || '', display }
}
