import {BaseElementData} from '../../../internal/base/base-element.data'
import {Code, URI}       from '../../primitive/primitive.data'

import {ReferenceData}       from '../../special/reference/reference.data'
import {CodeableConceptData} from '../codeable-concept/codeable-concept.data'
import {PeriodData}          from '../period/period.data'

export type IdentifierData = BaseElementData & {
  use?: Code
  type?: CodeableConceptData
  system?: URI
  value?: string
  period?: PeriodData
  assigner?: ReferenceData
}
