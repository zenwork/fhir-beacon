import {FhirDataElementData} from '../../../internal/base/fhir-data-element.data'
import {DateTime}            from '../../primitive/primitive.data'

export type PeriodData = FhirDataElementData & {
  start?: DateTime
  end?: DateTime
}
