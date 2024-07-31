import {FhirDataElementData} from '../../../internal/base/fhir-data-element.data'
import {Code, XHTML}         from '../../primitive/primitive.data'

export type NarrativeData = FhirDataElementData & {
  status: Code
  div: XHTML
}
