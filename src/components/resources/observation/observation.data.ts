import {FhirElementData} from '../../../internal'
import {BackboneElementData}              from '../../../internal/resource/backbone.data'
import {DomainResourceData}               from '../../../internal/resource/domain-resource.data'
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

import {ReferenceData}  from '../../special/reference/reference.data'
import {AttachmentData} from '../patient/patient.data'


type BoundDuration = QuantityData //TODO: should be constrained to a duration: https://www.hl7.org/fhir/datatypes.html#Duration
type BoundRange = RangeData
type BoundPeriod = PeriodData

type TimingData = FhirElementData & {
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

type EffectiveDateTime = DateTime
type EffectivePeriod = PeriodData
type EffectiveTiming = TimingData
type EffectiveInstant = Instant

type SampledData = FhirElementData & {
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

type  ValueQuantityData = QuantityData
type  ValueCodeableConceptData = CodeableConceptData
type  ValueFhirString = FhirString
type  ValueBoolean = boolean
type  ValueInteger = Integer
type  ValueRange = Range
type  ValueRatioData = RatioData
type  ValueSampledData = SampledData
type  ValueTime = Time
type  ValueDateTime = DateTime
type  ValuePeriodData = PeriodData
type  ValueAttachmentData = AttachmentData
type  ValueReferenceData = ReferenceData

type ReferenceRangeBackboneElementData = BackboneElementData & {
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

type ComponentBackboneElementData = BackboneElementData & {
  code: CodeableConceptData
  value?: ValueQuantityData | ValueCodeableConceptData | ValueFhirString | ValueBoolean | ValueInteger | ValueRange | ValueRatioData | ValueSampledData | ValueTime | ValueDateTime | ValuePeriodData | ValueAttachmentData | ValueReferenceData
  dataAbsentReason?: CodeableConceptData
  interpretation?: CodeableConceptData[]
  referenceRange?: ReferenceRangeBackboneElementData[]
}

export type ObservationData = DomainResourceData & {
  identifier?: IdentifierData[],
  instantiates_x?: { instantiatesCanonical: Canonical, instantiatesReference: ReferenceData }
  basedOn?: ReferenceData[]
  triggeredBy?: TriggeredByBackboneElementData[]
  partOf?: ReferenceData[]
  status: Code
  category?: CodeableConceptData[]
  code: CodeableConceptData
  subject?: ReferenceData
  focus?: ReferenceData[]
  encounter?: ReferenceData
  effective: EffectiveDateTime | EffectivePeriod | EffectiveTiming | EffectiveInstant
  issued?: Instant
  performer?: ReferenceData[]
  value?: ValueQuantityData | ValueCodeableConceptData | ValueFhirString | ValueBoolean | ValueInteger | ValueRange | ValueRatioData | ValueSampledData | ValueTime | ValueDateTime | ValuePeriodData | ValueAttachmentData | ValueReferenceData
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
