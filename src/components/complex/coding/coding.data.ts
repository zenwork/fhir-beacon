import {BaseData} from '../../../internal/base/BaseData'

export type CodingData = BaseData & {
  version?: string,
  system?: string,
  code?: string,
  display?: string
}
