import {FhirElementData} from '../../../internal'
import {IdentifierData}  from '../../complex/identifier/identifier.data'
import {URI}             from '../../primitive/primitive.data'

export type ReferenceData = FhirElementData & {
  reference?: string
  type?: URI
  identifier?: IdentifierData
  display?: string
}
