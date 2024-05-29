import {BaseElementData} from '../../../internal/base/base-element.data'
import {DateTime}        from '../../primitive/primitive.data'

export type PeriodData = BaseElementData & {
  start?: DateTime
  end?: DateTime
}
