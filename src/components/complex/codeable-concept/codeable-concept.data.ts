import {FhirDataElementData} from '../../../internal/base/fhir-data-element.data'
import {CodingData}          from '../coding/coding.data'

export type CodeableConceptData = FhirDataElementData & {
  coding: CodingData[]
  text?: string
}
