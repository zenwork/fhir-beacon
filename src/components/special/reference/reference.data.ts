import {FhirElementData} from '../../../internal/base/data/fhir-data-element.data'
import {IdentifierData}  from '../../complex/identifier/identifier.data'
import {URI}             from '../../primitive/primitive.data'

// TODO: How do we annotate a reference so that it can a ref for a specific or a limited subset of types
export type ReferenceData = FhirElementData & {
  reference?: string
  type?: URI
  identifier?: IdentifierData
  display?: string
}
