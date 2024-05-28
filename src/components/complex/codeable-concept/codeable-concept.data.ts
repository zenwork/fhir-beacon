import {BaseData}   from '../../../internal/base/BaseData'
import {CodingData} from '../coding/coding.data'

export type CodeableConceptData = BaseData & {
  coding: CodingData[]
  text?: string
}
