import {BaseData}           from '../../../internal/base/BaseData'
import {Code, Decimal, URI} from '../../primitive/primitive.data'

//TODO: Rule: If a code for the unit is present, the system SHALL also be present. see: https://www.hl7.org/fhir/datatypes.html#quantity
export type QuantityData = BaseData & {
  value?: Decimal //decimal
  comparator?: Code
  unit?: string
  system?: URI
  code?: Code
}


export type SimpleQuantityData = Omit<QuantityData, 'comparator'>
