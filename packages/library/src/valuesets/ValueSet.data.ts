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
type ResolutionError = { source: string, error: string }
export type ResolvedValueSet = {
  origin: ValueSetData | ResolutionError,
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

export type ValueAsChoice = { value: string, display: string }
export type ValueSetChoices = {
  id: string,
  name: string,
  choices: ValueAsChoice[]
  valid: boolean
}

export interface ValueSetSource {
  resolve(source: string, debug?: boolean): Promise<ResolvedValueSet>
  cacheAll(debug?: boolean): Promise<boolean>
  allIds(): Promise<string[]>
}

export interface ValueSetStore {
  write(valueSet: ValueSetChoices): Promise<void>
}

export interface LoadableStore extends ValueSetSource {
  isLoaded(): Promise<boolean>
  load(): Promise<boolean>
}

export function isLoadableStore(source: ValueSetSource | LoadableStore): source is LoadableStore {
  return (source as LoadableStore).load !== undefined
}

export function isResolutionError(origin: ValueSetData | ResolutionError): origin is ResolutionError {
  return (origin as ResolutionError).error !== undefined
}
