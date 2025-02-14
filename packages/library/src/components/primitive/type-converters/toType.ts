import {FhirTypes}         from '../../.././fhirtypes/code-systems'
import {toPrimitive, Type} from './type-converters'



export const toType: toPrimitive<string, Type> = (value: string): Type => {

  if (value && FhirTypes.find(f => f.kind === 'resource' && f.code === value)) return value as Type

  throw new TypeError(`${value} is not one of the accepted canonical resource types. see: http://hl7.org/fhir/R5/valueset-resource-types.html`)
}
