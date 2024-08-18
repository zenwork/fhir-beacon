import {FhirElementData} from '../../../internal/base/fhir-data-element.data'
import {DateTime}        from '../../primitive/primitive.data'

export type PeriodData = FhirElementData & {
  start?: DateTime
  end?: DateTime
}
