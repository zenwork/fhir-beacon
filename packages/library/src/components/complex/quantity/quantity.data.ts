import {FhirElementData}    from '../../../internal'
import {Code, Decimal, URI} from '../../primitive/primitive.data'

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
