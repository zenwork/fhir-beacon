import {
  AttachmentData,
  Canonical,
  Code,
  CodeableConceptData,
  CodingData,
  ContactDetailData,
  DateTime,
  Decimal,
  FhirDate,
  FhirString,
  IdentifierData,
  Integer,
  Markdown,
  PeriodData,
  ReferenceData,
  UnsignedInt,
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

export type ValueSetConceptData = BackboneElementData & {
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

export type CodeSystemFilterData = BackboneElementData & {
  code: Code
  description?: FhirString
  operator: Code[]
  value: FhirString
}

export type CodeSystemPropertyData = BackboneElementData & {
  code: Code
  uri?: URI
  description?: FhirString
  type: Code
}

export type CodeSystemConceptPropertyData = BackboneElementData & {
  code: Code
  valueCode: Code
  valueCoding: CodingData
  valueString: FhirString
  valueInteger: Integer
  valueBoolean: boolean
  valueDateTime: DateTime
  valueDecimal: Decimal
}

export type CodeSystemConceptData = BackboneElementData & {
  code: Code
  display?: FhirString
  definition?: Markdown
  designation: CodeableConceptData[]
  property: CodeSystemConceptPropertyData[]
  concept: CodeSystemConceptData[]
}

export type CodeSystemData = DomainResourceData & {
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
  caseSensitive?: boolean
  valueSet?: Canonical
  hierarchyMeaning?: Code
  compositional?: boolean
  versionNeeded?: boolean
  content?: Code
  supplements?: Canonical
  count?: UnsignedInt
  filter: CodeSystemFilterData[]
  property: CodeSystemPropertyData[]
  concept: CodeSystemConceptData[]
}

export type ResolvedValue = { code: Code, display: FhirString, definition: FhirString }
type ResolutionError = { source: string, error: string }
export type ResolvedSet = {
  id: string,
  type: 'CodeSystem' | 'ValueSet' | 'unknown' | string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  origin: ValueSetData | ResolutionError | any, // should also include code system
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

export type Choice = { value: string, display: string }
export type Choices = {
  id: string,
  type: 'CodeSystem' | 'ValueSet' | 'unknown' | string,
  name: string,
  choices: Choice[]
  valid: boolean
}

export interface ValueSetSource {
  resolve(source: string, debug?: boolean): Promise<ResolvedSet>
  cacheAll(debug?: boolean): Promise<boolean>
  allIds(): Promise<string[]>
}

export interface ValueSetStore {
  write(valueSet: Choices): Promise<void>
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

export function isValueSet(origin: unknown): origin is ValueSetData {
  return (origin as ValueSetData).resourceType === 'ValueSet'
}

export function isCodeSystem(origin: unknown): origin is CodeSystemData {
  return (origin as CodeSystemData).resourceType === 'CodeSystem'
}
