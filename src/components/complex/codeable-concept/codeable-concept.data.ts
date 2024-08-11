import {FhirElementData} from '../../../internal/base/fhir-data-element.data'
import {CodingData}      from '../coding/coding.data'

export type CodeableConceptData = FhirElementData & {
  coding: CodingData[]
  text?: string
}
