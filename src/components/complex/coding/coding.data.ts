import {FhirElementData} from '../../../internal/base/data/fhir-data-element.data'

export type CodingData = FhirElementData & {
  version?: string,
  system?: string,
  code?: string,
  display?: string
}
