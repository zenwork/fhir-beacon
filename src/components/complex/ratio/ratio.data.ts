import {BaseElementData}                  from '../../../internal/base/base-element.data'
import {QuantityData, SimpleQuantityData} from '../quantity/quantity.data'

export type RatioData = BaseElementData & {
  numerator?: QuantityData
  denominator?: SimpleQuantityData
}
