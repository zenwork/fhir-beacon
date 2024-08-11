import {FhirElementData}    from '../../../internal/base/fhir-data-element.data'
import {SimpleQuantityData} from '../quantity/quantity.data'

export type RangeData = FhirElementData & {
  low?: SimpleQuantityData
  high?: SimpleQuantityData
}
