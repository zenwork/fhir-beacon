import {FhirElementData}    from '../../../internal/base/data/fhir-data-element.data'
import {Code, Decimal, URI} from '../../primitive/primitive.data'

//TODO: Rule: If a code for the unit is present, the system SHALL also be present. see:
// https://www.hl7.org/fhir/datatypes.html#quantity
export type QuantityData = FhirElementData & {
  value?: Decimal //decimal
  comparator?: Code
  unit?: string
  system?: URI
  code?: Code
}


export type SimpleQuantityData = Omit<QuantityData, 'comparator'>

export enum QuantityVariations {
  age = 'age',
  count = 'count',
  distance = 'distance',
  duration = 'duration',
  simple = 'simple',
  unknown = 'unknown',
}
