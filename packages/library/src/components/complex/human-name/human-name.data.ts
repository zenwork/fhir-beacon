import {FhirElementData}  from '../../../internal'
import {Code, FhirString} from '../../primitive'
import {PeriodData}       from '../index'



export type HumanNameData = FhirElementData & {
  use?: Code
  text?: FhirString
  family?: FhirString
  given: FhirString[]
  prefix: FhirString[]
  suffix: FhirString[]
  period?: PeriodData
}
