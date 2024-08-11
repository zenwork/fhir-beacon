import {FhirElementData} from '../../../internal/base/fhir-data-element.data'

import {ReferenceData}       from '../../special/reference/reference.data'
import {CodeableConceptData} from '../codeable-concept/codeable-concept.data'

// see: https://www.hl7.org/fhir/R5/references.html#CodeableReference
export type CodeableReferenceData = FhirElementData & {
  concept?: CodeableConceptData
  reference?: ReferenceData
}
