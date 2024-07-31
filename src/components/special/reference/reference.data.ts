import {FhirDataElementData} from '../../../internal/base/fhir-data-element.data'
import {IdentifierData}      from '../../complex/identifier/identifier.data'
import {URI}                 from '../../primitive/primitive.data'

// TODO: How do we annotate a reference so that it can a ref for a specific or a limited subset of types
export type ReferenceData = FhirDataElementData & {
  reference?: string
  type?: URI
  identifier?: IdentifierData
  display?: string
}
