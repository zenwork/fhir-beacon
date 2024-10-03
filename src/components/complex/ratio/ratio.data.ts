import {FhirElementData} from '../../../internal'
import {QuantityData, SimpleQuantityData} from '../quantity/quantity.data'

export type RatioData = FhirElementData & {
  numerator?: QuantityData
  denominator?: SimpleQuantityData
}
