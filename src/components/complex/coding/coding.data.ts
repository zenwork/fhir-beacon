import {BaseElementData} from '../../../internal/base/base-element.data'

export type CodingData = BaseElementData & {
  version?: string,
  system?: string,
  code?: string,
  display?: string
}
