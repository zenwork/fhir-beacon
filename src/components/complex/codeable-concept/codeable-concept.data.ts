import {BaseElementData} from '../../../internal/base/base-element.data'
import {CodingData}      from '../coding/coding.data'

export type CodeableConceptData = BaseElementData & {
  coding: CodingData[]
  text?: string
}
