import {BaseData}    from '../../../internal/base/BaseData'
import {Code, XHTML} from '../../primitive/primitive.data'

export type NarrativeData = BaseData & {
  status: Code
  div: XHTML
}
