import {FhirElementData} from '../../../internal'
import {DateTime}        from '../../primitive/primitive.data'

export type PeriodData = FhirElementData & {
  start?: DateTime
  end?: DateTime
}
