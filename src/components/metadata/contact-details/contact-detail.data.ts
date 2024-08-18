import {FhirElementData}  from '../../../internal/base/fhir-data-element.data'
import {FhirString}       from '../../primitive/primitive.data'
import {ContactPointData} from '../../resources/patient/patient.data'

export type ContactDetailData = FhirElementData & {
  name?: FhirString
  telecom?: ContactPointData[]
}
