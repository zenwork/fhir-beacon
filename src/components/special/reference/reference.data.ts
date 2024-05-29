import {BaseElementData} from '../../../internal/base/base-element.data'
import {IdentifierData}  from '../../complex/identifier/identifier.data'
import {URI}             from '../../primitive/primitive.data'

export type ReferenceData = BaseElementData & {
  reference?: string
  type?: URI
  identifier?: IdentifierData
  display?: string
}
