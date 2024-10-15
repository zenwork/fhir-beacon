import {FhirElementData}    from '../../../internal'
import {SimpleQuantityData} from '../quantity/quantity.data'

export type RangeData = FhirElementData & {
  low?: SimpleQuantityData
  high?: SimpleQuantityData
}
