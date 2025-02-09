import {FhirElementData}               from '../../../internal'
import {Code, FhirString, PositiveInt} from '../../primitive'
import {PeriodData}                    from '../index'



export type ContactPointData = FhirElementData & {
  system?: Code
  value?: FhirString
  use?: Code
  rank?: PositiveInt
  period?: PeriodData

}
