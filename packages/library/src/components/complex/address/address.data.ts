import {FhirElementData}  from '../../../internal'
import {Code, FhirString} from '../../primitive'
import {PeriodData}       from '../index'



export type AddressData = FhirElementData & {
  use?: Code
  type?: Code
  text?: FhirString
  line: FhirString[]
  city?: FhirString
  district?: FhirString
  state?: FhirString
  postalCode?: FhirString
  country?: FhirString
  period?: PeriodData
}
