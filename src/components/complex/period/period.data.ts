import {BaseData} from '../../../internal/base/BaseData'
import {DateTime} from '../../primitive/primitive.data'

export type PeriodData = BaseData & {
  start?: DateTime
  end?: DateTime
}
