import {BaseElementData} from '../../../internal/base/base-element.data'
import {Code, XHTML}     from '../../primitive/primitive.data'

export type NarrativeData = BaseElementData & {
  status: Code
  div: XHTML
}
