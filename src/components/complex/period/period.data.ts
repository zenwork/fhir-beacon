import {FhirElementData} from '../../../internal/base/data/fhir-data-element.data'
import {DateTime}        from '../../primitive/primitive.data'

export type PeriodData = FhirElementData & {
  start?: DateTime
  end?: DateTime
}
