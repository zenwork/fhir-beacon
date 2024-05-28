import {BaseData}       from '../../../internal/base/BaseData'
import {IdentifierData} from '../../complex/identifier/identifier.data'
import {URI}            from '../../primitive/primitive.data'

export type ReferenceData = BaseData & {
  reference?: string
  type?: URI
  identifier?: IdentifierData
  display?: string
}
