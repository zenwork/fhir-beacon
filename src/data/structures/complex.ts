import {BaseData}                     from '../../BaseData'
import {Code, DateTime, Decimal, URI} from './index'

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

export type SimpleQuantityData = QuantityData //simple data rule applies

export type CodeableConceptData = BaseData & {
  coding: CodingData[]
  text?: string
}
export type PeriodData = BaseData & {
  start?: DateTime
  end?: DateTime
}

export type ReferenceData = BaseData & {
  reference?: string
  type?: URI
  identifier?: Identifier
  display?: string
}

export type Identifier = BaseData & {
  use?: Code
  type?: CodeableConceptData
  system?: URI
  value?: string
  period?: PeriodData
  assigner?: ReferenceData
}
