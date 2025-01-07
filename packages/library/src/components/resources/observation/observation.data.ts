import {FhirElementData}                  from '../../../internal'
import {BackboneElementData}              from '../../../internal/resource/backbone.data'
import {DomainResourceData}               from '../../../internal/resource/domain-resource.data'
import {AttachmentData}                   from '../../complex'
import {AnnotationData}                   from '../../complex/annotation/annotation.data'
import {CodeableConceptData}              from '../../complex/codeable-concept/codeable-concept.data'
import {IdentifierData}                   from '../../complex/identifier/identifier.data'
import {PeriodData}                       from '../../complex/period/period.data'
import {QuantityData, SimpleQuantityData} from '../../complex/quantity/quantity.data'
import {RangeData}                        from '../../complex/range/range.data'
import {RatioData}                        from '../../complex/ratio/ratio.data'

import {
  Canonical,
  Code,
  DateTime,
  Decimal,
  FhirString,
  Instant,
  Integer,
  Markdown,
  PositiveInt,
  Time,
  UnsignedInt
} from '../../primitive/primitive.data'

import {ReferenceData} from '../../special/reference/reference.data'



export type BoundDuration = QuantityData //TODO: should be constrained to a duration: https://www.hl7.org/fhir/dataexport types.html#Duration
export type BoundRange = RangeData
export type BoundPeriod = PeriodData

export type TimingData = FhirElementData & {
  event?: DateTime
  bound?: BoundDuration | BoundRange | BoundPeriod
  count?: PositiveInt
  countMax?: PositiveInt
  duration?: Decimal
  durationMax?: Decimal
  durationUnit?: Code
  frequency?: PositiveInt
  frequencyMax?: PositiveInt
  period?: Decimal
  periodMax?: Decimal
  periodUnitr?: Code
  dayOfWeek?: Code[]
  timeOfDay?: Time[]
  when?: Code[]
  offset?: UnsignedInt

}

export type SampledDataData = FhirElementData & {
  origin: SimpleQuantityData
  interval?: Decimal
  intervalUnit?: Code
  factor?: Decimal
  lowerLimit?: Decimal
  upperLimit?: Decimal
  dimensions: PositiveInt
  codeMap?: Canonical
  offset?: FhirString
  data?: FhirString
}

export type ReferenceRangeBackboneElementData = BackboneElementData & {
  low?: SimpleQuantityData
  high?: SimpleQuantityData
  normalValue?: CodeableConceptData
  type?: CodeableConceptData
  appliesTo?: CodeableConceptData[]
  age?: RangeData
  text?: Markdown
}

export type TriggeredByBackboneElementData = BackboneElementData & {
  observation: ReferenceData
  type: Code
  reason: FhirString
}

export type ComponentBackboneElementData = BackboneElementData & {
  code: CodeableConceptData
  value?: QuantityData | CodeableConceptData | FhirString | boolean | Integer | Range | RatioData | SampledDataData | Time | DateTime | PeriodData | AttachmentData | ReferenceData
  dataAbsentReason?: CodeableConceptData
  interpretation?: CodeableConceptData[]
  referenceRange?: ReferenceRangeBackboneElementData[]
}

export type ObservationData = DomainResourceData & {
  identifier?: IdentifierData[],
  instantiatesCanonical?: Canonical,
  instantiatesReference?: ReferenceData,
  basedOn?: ReferenceData[]
  triggeredBy?: TriggeredByBackboneElementData[]
  partOf?: ReferenceData[]
  status: Code
  category?: CodeableConceptData[]
  code: CodeableConceptData
  subject?: ReferenceData
  focus?: ReferenceData[]
  encounter?: ReferenceData
  effectiveDateTime?: DateTime
  effectivePeriod?: PeriodData
  effectiveTiming?: TimingData
  effectiveInstant?: Instant
  issued?: Instant
  performer?: ReferenceData[]
  valueQuantity?: QuantityData
  valueCodeableConcept?: CodeableConceptData
  valueString?: FhirString
  valueBoolean?: boolean
  valueInteger?: Integer
  valueRange?: RangeData
  valueRatio?: RatioData
  valueSampledData?: SampledDataData
  valueTime?:  Time
  valueDateTime?:  DateTime
  valuePeriod?:  PeriodData
  valueAttachment?:  AttachmentData
  valueReference?:  ReferenceData
  dataAbsentReason?: CodeableConceptData
  interpretation?: CodeableConceptData[]
  note?: AnnotationData
  bodySite?: CodeableConceptData
  bodyStructure?: ReferenceData
  method?: CodeableConceptData
  specimen?: ReferenceData
  device?: ReferenceData
  referenceRange?: ReferenceRangeBackboneElementData[]
  hasMember?: ReferenceData[]
  derivedFrom?: ReferenceData[]
  component?: ComponentBackboneElementData[]

}
