import {FhirElementData} from '../../../internal'
import {CodingData}      from '../coding/coding.data'

export type CodeableConceptData = FhirElementData & {
  coding?: CodingData[]
  text?: string
}
