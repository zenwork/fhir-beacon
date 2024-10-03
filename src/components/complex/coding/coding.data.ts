import {FhirElementData} from '../../../internal'

export type CodingData = FhirElementData & {
  version?: string,
  system?: string,
  code?: string,
  display?: string
}
