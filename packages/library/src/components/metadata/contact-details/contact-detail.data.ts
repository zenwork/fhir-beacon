import {FhirElementData}  from '../../../internal'
import {ContactPointData} from '../../complex/contact-point/contact-point.data'
import {FhirString}       from '../../primitive/primitive.data'



export type ContactDetailData = FhirElementData & {
  name?: FhirString
  telecom?: ContactPointData[]
}
