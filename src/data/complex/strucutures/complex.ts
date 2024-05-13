import {BaseData}                     from '../../../BaseData'
import {ReferenceData}                from '../../../special/structures'
import {Code, DateTime, Decimal, URI} from '../../primitive/structures'

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

export type IdentifierData = BaseData & {
  use?: Code
  type?: CodeableConceptData
  system?: URI
  value?: string
  period?: PeriodData
  assigner?: ReferenceData
}
