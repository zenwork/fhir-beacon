import {
  AddressData,
  AnnotationData,
  AttachmentData,
  CodeableConceptData,
  CodeableReferenceData,
  CodingData,
  ContactDetailData,
  ContactPointData,
  HumanNameData,
  IdentifierData,
  MetaData,
  MoneyData,
  PeriodData,
  QuantityData,
  RangeData,
  RatioData,
  ReferenceData,
  SampledDataData,
  SignatureData,
  TimingData,
  UsageContextData
} from './components'
import {
  Base64Binary,
  Code,
  DateTime,
  Decimal,
  FhirDate,
  FhirString,
  Id,
  Instant,
  Integer,
  Markdown,
  PositiveInt,
  Time,
  UnsignedInt,
  Url
} from './components/primitive/primitive.data'
import {
  Oid,
  Uri,
  Uuid
} from './PrimitiveTypes'



export enum OpenTypeNameEnum {
  //primitives
  Base64Binary = 'Base64Binary',
  Boolean = 'Boolean',
  Canonical = 'Canonical',
  Code = 'Code',
  Date = 'Date',
  DateTime = 'DateTime',
  Decimal = 'Decimal',
  Id = 'Id',
  Instant = 'Instant',
  Integer = 'Integer',
  Integer64 = 'Integer64',
  Markdown = 'Markdown',
  Oid = 'Oid',
  PositiveInt = 'PositiveInt',
  String = 'String',
  Time = 'Time',
  UnsignedInt = 'UnsignedInt',
  Uri = 'Uri',
  Url = 'Url',
  Uuid = 'Uuid',
  // datatypes
  Address = 'Address',
  Age = 'Age',
  Annotation = 'Annotation',
  Attachment = 'Attachment',
  CodeableConcept = 'CodeableConcept',
  CodeableReference = 'CodeableReference',
  Coding = 'Coding',
  ContactPoint = 'ContactPoint',
  Count = 'Count',
  Distance = 'Distance',
  Duration = 'Duration',
  HumanName = 'HumanName',
  Identifier = 'Identifier',
  Money = 'Money',
  Period = 'Period',
  Quantity = 'Quantity',
  Range = 'Range',
  Ratio = 'Ratio',
  RatioRange = 'RatioRange',
  Reference = 'Reference',
  SampledData = 'SampledData',
  Signature = 'Signature',
  Timing = 'Timing',
  // metadata
  ContactDetail = 'ContactDetail',
  DataRequirement = 'DataRequirement',
  Expression = 'Expression',
  ParameterDefinition = 'ParameterDefinition',
  RelatedArtifact = 'RelatedArtifact',
  TriggerDefinition = 'TriggerDefinition',
  UsageContext = 'UsageContext',
  Availability = 'Availability',
  ExtendedContactDetail = 'ExtendedContactDetail',
  // special
  Dosage = 'Dosage',
  Meta = 'Meta'
}

export type OpenTypeName = keyof typeof OpenTypeNameEnum

export type OpenType =
// primitives
  Base64Binary
  | boolean
  | Code
  | FhirDate
  | DateTime
  | Decimal
  | Id
  | Instant
  | Integer
  | Markdown
  | Oid
  | PositiveInt
  | FhirString
  | Time
  | UnsignedInt
  | Uri
  | Url
  | Uuid
  // datatypes
  | AddressData
  // | AgeData
  | AnnotationData
  | AttachmentData
  | CodeableConceptData
  | CodeableReferenceData
  | CodingData
  | ContactPointData
  // | CountData
  // | DistanceData
  // | DurationData
  | HumanNameData
  | IdentifierData
  | MoneyData
  | PeriodData
  | QuantityData
  | RangeData
  | RatioData
  // | RatioRangeData
  | ReferenceData
  | SampledDataData
  | SignatureData
  | TimingData
  // metadata
  | ContactDetailData
  // | DataRequirementData
  // | ExpressionData
  // | ParameterDefinitionData
  // | RelatedArtifactData
  // | TriggerDefinitionData
  | UsageContextData
  // | AvailabilityData
  // | ExtendedContactDetailData
  // special
  // | DosageData
  | MetaData
  | never
