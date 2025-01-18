import {
  AttachmentData,
  Canonical,
  Code,
  CodeableConceptData,
  CodingData,
  ContactDetailData,
  FhirDate,
  FhirString,
  IdentifierData,
  Markdown,
  PeriodData,
  ReferenceData,
  URI,
  Url,
  UsageContextData
}                                                                 from '../components'
import {BackboneElementData, DomainResourceData, FhirElementData} from '../internal'



export type RelatedArtifactData = FhirElementData & {
  type: Code
  classifier?: CodeableConceptData[]
  label?: FhirString
  display?: FhirString
  citation?: Markdown
  document?: AttachmentData
  resource?: Canonical
  resourceReference?: ReferenceData
  publicationStatus?: Code
  publicationDate?: FhirDate

}
type ValueSetDesignationData = BackboneElementData & {
  language?: Code
  use?: CodingData
  additionalUse: CodingData[]
  value: FhirString
}
type ValueSetConceptData = BackboneElementData & {
  code: Code
  display?: FhirString
  designation: ValueSetDesignationData[]

}
type ValueSetFilterData = BackboneElementData & {
  property: Code
  op: Code
  value: FhirString
}
export type ValueSetIncludeExcludeData = BackboneElementData & {
  system?: URI
  version?: FhirString
  concept?: ValueSetConceptData[]
  filter: ValueSetFilterData[]
  valueSet?: Canonical[]
  copyright?: FhirString

}
export type ValueSetComposeData = BackboneElementData & {
  lockedDate?: FhirDate
  inactive?: boolean
  include: ValueSetIncludeExcludeData[]
  exclude: ValueSetIncludeExcludeData[]
  property: FhirString[]
}
export type ValueSetData = DomainResourceData & {
  url?: Url
  identifier: IdentifierData[]
  version?: FhirString
  versionAlgorithm?: FhirString
  versionAlgorithmCoding?: CodingData
  name?: FhirString
  title?: FhirString
  status: FhirString
  experimental?: boolean
  date?: FhirString
  publisher?: FhirString
  contact: ContactDetailData[]
  description?: Markdown
  useContext: UsageContextData[]
  jurisdiction: CodeableConceptData[]
  immutable?: boolean
  purpose?: Markdown
  copyright?: Markdown
  copyrightLabel?: FhirString
  approvalDate?: FhirDate
  lastReviewDate?: FhirDate
  effectivePeriod?: PeriodData
  topic: CodeableConceptData[]
  author: ContactDetailData[]
  editor: ContactDetailData[]
  reviewer: ContactDetailData[]
  endorser: ContactDetailData[]
  relatedArtifact: RelatedArtifactData[]
  compose?: ValueSetComposeData
}

export type ResolvedValue = { code: Code, display: FhirString, definition: FhirString }
export type ResolvedValueSet = {
  origin: ValueSetData,
  id: string,
  name: string,
  version: string,
  status: string,
  compose: {
    include: {
      concept: ResolvedValue[]
    },
    exclude: {
      concept: ResolvedValue[]
    }
  }
}

export type ValueSetChoices = {
  id: string,
  name: string,
  choice: []
}
