import {FhirElementData}                                                                from '../../../internal'
import {Base64Binary, Code, DateTime, Decimal, FhirString, Integer64, PositiveInt, Url} from '../../primitive'

export type AttachmentData = FhirElementData & {
  contentType?: Code
  language?: Code
  data?: Base64Binary
  url?: Url
  size?: Integer64
  hash?: Base64Binary
  title?: FhirString
  creation?: DateTime
  height?: PositiveInt
  width?: PositiveInt
  frames?: PositiveInt
  duration?: Decimal
  pages?: PositiveInt
}
