import {BaseData}           from '../../resources/structures'
import {Code, Decimal, URI} from '../converters'


export type Id = string
export type Instant = string
export type Canonical = URI
export type Language = string

export type XHTML = string


export type CodingData = BaseData & {
  version?: string,
  system?: string,
  code?: string,
  display?: string
}

export type QuantityData = BaseData & {
  value?: Decimal //decimal
  comparator?: Code
  unit?: string
  system?: URI
  code?: Code
}
