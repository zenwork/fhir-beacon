import {FhirElementData}    from '../../../internal/base/data/fhir-data-element.data'
import {SimpleQuantityData} from '../quantity/quantity.data'

export type RangeData = FhirElementData & {
  low?: SimpleQuantityData
  high?: SimpleQuantityData
}
