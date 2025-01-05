import {FhirElementData} from '../../../internal'
import {Code, Decimal}   from '../../primitive'

export type MoneyData = FhirElementData & {
  value: Decimal
  currency: Code
}
