import {BaseElementData}  from '../../../internal/base/base-element.data'
import {FhirString}       from '../../primitive/primitive.data'
import {ContactPointData} from '../../resources/patient/patient.data'

export type ContactDetailData = BaseElementData & {
  name?: FhirString
  telecom?: ContactPointData[]
}
