import {BackboneElementData}                         from '../../../internal/resource/backbone.data'
import {DomainResourceData}                          from '../../../internal/resource/domain-resource.data'
import {AttachmentData, SampledDataData, TimingData} from '../../complex'
import {AnnotationData}                              from '../../complex/annotation/annotation.data'
import {CodeableConceptData}                         from '../../complex/codeable-concept/codeable-concept.data'
import {IdentifierData}                              from '../../complex/identifier/identifier.data'
import {PeriodData}                                  from '../../complex/period/period.data'
import {QuantityData, SimpleQuantityData}            from '../../complex/quantity/quantity.data'
import {RangeData}                                   from '../../complex/range/range.data'
import {RatioData}                                   from '../../complex/ratio/ratio.data'

import {Canonical, Code, DateTime, FhirString, Instant, Integer, Markdown, Time} from '../../primitive/primitive.data'

import {ReferenceData} from '../../special/reference/reference.data'



export type ObservationReferenceRangeData = BackboneElementData & {
  low?: SimpleQuantityData
  high?: SimpleQuantityData
  normalValue?: CodeableConceptData
  type?: CodeableConceptData
  appliesTo?: CodeableConceptData[]
  age?: RangeData
  text?: Markdown
}

export type ObservationTriggeredByData = BackboneElementData & {
  observation: ReferenceData
  type: Code
  reason: FhirString
}

export type ObservationComponentData = BackboneElementData & {
  code: CodeableConceptData
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
  referenceRange?: ObservationReferenceRangeData[]
}

export type ObservationData = DomainResourceData & {
  identifier?: IdentifierData[],
  instantiatesCanonical?: Canonical,
  instantiatesReference?: ReferenceData,
  basedOn?: ReferenceData[]
  triggeredBy?: ObservationTriggeredByData[]
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
  note?: AnnotationData[]
  bodySite?: CodeableConceptData
  bodyStructure?: ReferenceData
  method?: CodeableConceptData
  specimen?: ReferenceData
  device?: ReferenceData
  referenceRange?: ObservationReferenceRangeData[]
  hasMember?: ReferenceData[]
  derivedFrom?: ReferenceData[]
  component?: ObservationComponentData[]

}
