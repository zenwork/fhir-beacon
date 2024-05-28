import {BaseData}                     from '../../../BaseData'
import {ReferenceData}                from '../../../special/structures'
import {Code, DateTime, Decimal, URI} from '../../primitive/structures'

export type CodingData = BaseData & {
  version?: string,
  system?: string,
  code?: string,
  display?: string
}

//TODO: Rule: If a code for the unit is present, the system SHALL also be present. see: https://www.hl7.org/fhir/datatypes.html#quantity
export type QuantityData = BaseData & {
  value?: Decimal //decimal
  comparator?: Code
  unit?: string
  system?: URI
  code?: Code
}

export type SimpleQuantityData = Omit<QuantityData, 'comparator'>

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

export type CodeableReferenceData = BaseData & {
  concept?: CodeableConceptData
  reference?: ReferenceData
}
