import {FhirElementData} from '../../../internal/base/fhir-data-element.data'
import {Code, XHTML}     from '../../primitive/primitive.data'

export type NarrativeData = FhirElementData & {
  status: Code
  div: XHTML
}
