import {FhirElementData}                                   from '../../../internal'
import {Canonical, Code, Decimal, FhirString, PositiveInt} from '../../primitive'
import {SimpleQuantityData}                                from '../quantity'



export type SampledDataData = FhirElementData & {
  origin: SimpleQuantityData
  interval?: Decimal
  intervalUnit?: Code
  factor?: Decimal
  lowerLimit?: Decimal
  upperLimit?: Decimal
  dimensions: PositiveInt
  codeMap?: Canonical
  offset?: FhirString
  data?: FhirString
}
