import {FhirDataElementData}              from '../../../internal/base/fhir-data-element.data'
import {QuantityData, SimpleQuantityData} from '../quantity/quantity.data'

export type RatioData = FhirDataElementData & {
  numerator?: QuantityData
  denominator?: SimpleQuantityData
}
