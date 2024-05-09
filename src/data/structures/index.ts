import {Code, Decimal, URI} from '../converters'

export type Id = string | null

export type BaseData = {
  id?: Id,
  extension?: [],
}

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
