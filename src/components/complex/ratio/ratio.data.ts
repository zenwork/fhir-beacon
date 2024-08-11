import {FhirElementData}                  from '../../../internal/base/fhir-data-element.data'
import {QuantityData, SimpleQuantityData} from '../quantity/quantity.data'

export type RatioData = FhirElementData & {
  numerator?: QuantityData
  denominator?: SimpleQuantityData
}
