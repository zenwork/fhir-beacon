import {FhirElementData} from '../../../internal'
import {Code, XHTML}     from '../../primitive/primitive.data'

export type NarrativeData = FhirElementData & {
  status: Code
  div: XHTML
}
