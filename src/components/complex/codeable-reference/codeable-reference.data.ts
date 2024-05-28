import {BaseData} from '../../../internal/base/BaseData'

import {ReferenceData}       from '../../special/reference/reference.data'
import {CodeableConceptData} from '../codeable-concept/codeable-concept.data'

export type CodeableReferenceData = BaseData & {
  concept?: CodeableConceptData
  reference?: ReferenceData
}
