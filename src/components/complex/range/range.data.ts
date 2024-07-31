import {FhirDataElementData} from '../../../internal/base/fhir-data-element.data'
import {SimpleQuantityData}  from '../quantity/quantity.data'

export type RangeData = FhirDataElementData & {
  low?: SimpleQuantityData
  high?: SimpleQuantityData
}
