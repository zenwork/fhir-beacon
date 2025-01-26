import {BackboneElementData, DomainResourceData} from '../../../internal'
import {
  CodeableConceptData,
  CodeableReferenceData,
  CodingData,
  IdentifierData,
  MoneyData,
  PeriodData
}                                                from '../../complex'
import {
  DateTime,
  FhirString,
  Markdown,
  PositiveInt
}                                                from '../../primitive'
import {
  ReferenceData
}                                                from '../../special'



export type AccountCoverageData = BackboneElementData & {
  coverage: ReferenceData
  priority?: PositiveInt
}

export type AccountGuarantorData = BackboneElementData & {
  party: ReferenceData
  onHold?: boolean
  period?: PeriodData
}

export type AccountDiagnosisData = BackboneElementData & {
  sequence?: PositiveInt
  condition: CodeableReferenceData
  dateOfDiagnosis?: DateTime
  type: CodeableConceptData[]
  onAdmission?: boolean
  packageCode: CodeableConceptData[]
}

export type AccountProcedureData = BackboneElementData & {
  sequence?: PositiveInt
  code: CodeableReferenceData
  dateOfService?: DateTime
  type: CodeableConceptData[]
  packageCode: CodeableConceptData[]
  device: ReferenceData[]
}

export type AccountRelatedAccountData = BackboneElementData & {
  relationship?: CodeableConceptData
  account: ReferenceData
}

export type AccountBalanceData = BackboneElementData & {
  aggregate?: CodeableConceptData
  term?: CodeableConceptData
  estimate?: boolean
  amount: MoneyData

}

export type AccountData = DomainResourceData & {
  identifier: IdentifierData[]
  status: CodingData
  billingStatus?: CodeableConceptData
  type?: CodeableConceptData
  name?: FhirString
  subject: ReferenceData[]
  servicePeriod: PeriodData
  coverage: AccountCoverageData[]
  owner?: ReferenceData
  description?: Markdown
  guarantor: AccountGuarantorData[]
  diagnosis: AccountDiagnosisData[]
  procedure: AccountProcedureData
  relatedAccount: AccountRelatedAccountData[]
  currency?: CodeableConceptData
  balance: AccountBalanceData[]
}
