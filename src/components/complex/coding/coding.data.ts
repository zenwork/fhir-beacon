import {FhirDataElementData} from '../../../internal/base/fhir-data-element.data'

export type CodingData = FhirDataElementData & {
  version?: string,
  system?: string,
  code?: string,
  display?: string
}
