import {BaseElementData}    from '../../../internal/base/base-element.data'
import {SimpleQuantityData} from '../quantity/quantity.data'

export type RangeData = BaseElementData & {
  low?: SimpleQuantityData
  high?: SimpleQuantityData
}
