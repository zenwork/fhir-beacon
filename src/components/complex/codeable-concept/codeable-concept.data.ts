import {FhirElementData} from '../../../internal/base/data/fhir-data-element.data'
import {CodingData}      from '../coding/coding.data'

export type CodeableConceptData = FhirElementData & {
  coding: CodingData[]
  text?: string
}
