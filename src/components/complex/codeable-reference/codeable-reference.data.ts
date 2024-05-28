import {BaseElementData} from '../../../internal/base/base-element.data'

import {ReferenceData}       from '../../special/reference/reference.data'
import {CodeableConceptData} from '../codeable-concept/codeable-concept.data'

// see: https://www.hl7.org/fhir/R5/references.html#CodeableReference
export type CodeableReferenceData = BaseElementData & {
  concept?: CodeableConceptData
  reference?: ReferenceData
}
