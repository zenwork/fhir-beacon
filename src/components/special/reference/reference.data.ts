import {BaseElementData} from '../../../internal/base/base-element.data'
import {IdentifierData}  from '../../complex/identifier/identifier.data'
import {URI}             from '../../primitive/primitive.data'

// TODO: How do we annotate a reference so that it can a ref for a specific or a limited subset of types
export type ReferenceData = BaseElementData & {
  reference?: string
  type?: URI
  identifier?: IdentifierData
  display?: string
}
