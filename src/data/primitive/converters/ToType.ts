import {FhirTypes}   from '../../codesystems'
import {toPrimitive} from './index'


export type Type = string
export const toType: toPrimitive<string, Type> = (value: string): Type => {

  if (value && FhirTypes.find(f => f.kind === 'resource' && f.code === value)) return value as Type

  throw new TypeError(`${value} is not one of the accepted canonical resource types. see: http://hl7.org/fhir/R5/valueset-resource-types.html`)
}
