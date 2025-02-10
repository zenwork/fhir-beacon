import {html, TemplateResult}                                       from 'lit'
import {customElement}                                              from 'lit/decorators.js'
import {choice, Decorated, DomainResource, oneOf, Validations}      from '../../../internal'
import {wrap}                                                       from '../../../shell'
import {DisplayConfig}                                              from '../../../shell/types'
import {
  AttachmentData,
  CodeableConceptData,
  PeriodData,
  QuantityData,
  RangeData,
  RatioData,
  SampledDataData,
  TimingData
}                                                                   from '../../complex'
import {identifiers}                                                from '../../complex/identifier/identifiers'
import {Canonical, DateTime, Instant, Integer, PrimitiveType, Time} from '../../primitive'
import {ReferenceData}                                              from '../../special'

import {ObservationData} from './observation.data'



@customElement('fhir-observation')
export class Observation extends DomainResource<ObservationData> {

  constructor() {
    super('Observation')
  }

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<ObservationData>,
                       validations: Validations): TemplateResult[] {
    return this.renderAny(config, data, validations)
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<ObservationData>,
                         validations: Validations): TemplateResult[] {
    return this.renderAny(config, data, validations)

  }


  public validate(data: ObservationData, validations: Validations, _fetched: boolean): void {
    validations.inspectCode({ node: 'status', code: data.status, id: 'cs-observation-status' })
    validations.inspectCodeableConcept({
                                         node: 'category',
                                         concept: data.category,
                                         bindingId: 'vs-observation-category'
                                       })
    validations.inspectCodeableConcept({
                                         node: 'dataAbsentReason',
                                         concept: data.dataAbsentReason,
                                         bindingId: 'vs-data-absent-reason'
                                       })

  }

  public renderAny(config: DisplayConfig,
                   data: Decorated<ObservationData>,
                   validations: Validations): TemplateResult[] {

    return [
      html`
          ${identifiers(data.identifier ?? [], config)}

          ${oneOf(this,
                  'instantiate[x]',
                  validations.msgFor('instantiate[x]'),
                  [
                      choice(data.instantiatesCanonical,
                             (d: Canonical) => html`
                                 <fhir-primitive
                                         key="instantiateCanonical"
                                         .value=${d}
                                         .type=${PrimitiveType.canonical}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.instantiatesReference,
                             (d: ReferenceData) => html`
                                 <fhir-reference
                                         key="instantiateReference"
                                         .data=${d}
                                         summary
                                 ></fhir-reference>`
                      )
                  ])
          }
          ${wrap(
                  {
                      key: 'basedOn',
                      collection: data.basedOn ?? [],
                      generator: (d, l) => html`
                          <fhir-reference label=${l} .data=${d}></fhir-reference>`,
                      config
                  }
          )}
          ${wrap(
                  {
                      key: 'triggeredBy',
                      collection: data.triggeredBy ?? [],
                      generator: (d, l) => html`
                          <fhir-observation-triggered-by key=${l} .data=${d}></fhir-observation-triggered-by>`,
                      config
                  }
          )}
          ${wrap(
                  {
                      key: 'partOf',
                      collection: data.partOf ?? [],
                      generator: (d, l) => html`
                          <fhir-reference label=${l} .data=${d}></fhir-reference>`,
                      config
                  }
          )}
          <fhir-primitive key="status"
                          .value=${data.status}
                          .type=${PrimitiveType.code}
                          errormessage=${validations.msgFor('status')}
          ></fhir-primitive>
          ${wrap(
                  {
                      key: 'category',
                      collection: data.category ?? [],
                      generator: (d, l, k, i) => html`
                          <fhir-codeable-concept key=${k}
                                                 label=${l}
                                                 .data=${d}
                                                 .errors=${validations.sliceForFQK({
                                                                                       path: [
                                                                                           {
                                                                                               node: 'category',
                                                                                               index: i
                                                                                           }
                                                                                       ]
                                                                                   })}
                          ></fhir-codeable-concept>`,
                      config
                  }
          )}
          <fhir-codeable-concept key="code" .data=${data.code} required></fhir-codeable-concept>
          <fhir-reference key='subject' .data=${data.subject}></fhir-reference>
          ${wrap(
                  {
                      key: 'focus',
                      collection: data.focus ?? [],
                      generator: (d, l) => html`
                          <fhir-reference label=${l} .data=${d}></fhir-reference>`,
                      config
                  }
          )}
          <fhir-reference key='encounter' .data=${data.encounter}></fhir-reference>
          ${oneOf(this,
                  'effective[x]',
                  validations.msgFor('effective[x]'),
                  [
                      choice(data.effectiveDateTime,
                             (d: DateTime) => html`
                                 <fhir-primitive
                                         key="effectiveDateTime"
                                         .value=${d}
                                         .type=${PrimitiveType.datetime}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.effectivePeriod,
                             (d: PeriodData) => html`
                                 <fhir-period
                                         key="effectivePeriod"
                                         .data=${d}
                                         summary
                                 ></fhir-period>`
                      ),
                      choice(data.effectiveTiming,
                             (d: TimingData) => html`
                                 <fhir-timing key="effectiveTiming" .data=${d}></fhir-timing>`
                      ),
                      choice(data.effectiveInstant,
                             (d: Instant) => html`
                                 <fhir-primitive
                                         key="effectiveInstant"
                                         .value=${d}
                                         .type=${PrimitiveType.instant}
                                         summary
                                 ></fhir-primitive>`
                      )

                  ])
          }
          <fhir-primitive key="issued" .value=${data.issued} .type=${PrimitiveType.instant} summary></fhir-primitive>
          ${wrap({
                     key: 'performer',
                     collection: data.performer ?? [],
                     generator: (d, l) => html`
                         <fhir-reference label=${l} .data=${d}></fhir-reference>`,
                     config
                 }
          )}
          ${oneOf(this,
                  'value[x]',
                  validations.msgFor('value[x]'),
                  [
                      choice(data.valueQuantity,
                             (d: QuantityData) => html`
                                 <fhir-quantity
                                         key="valueQuantity"
                                         .data=${d}
                                         summary
                                 ></fhir-quantity>`
                      ),
                      choice(data.valueCodeableConcept,
                             (d: CodeableConceptData) => html`
                                 <fhir-codeable-concept
                                         key="effectiveDateTime"
                                         .data=${d}
                                         summary
                                 ></fhir-codeable-concept>`
                      ),
                      choice(data.valueString,
                             (d: DateTime) => html`
                                 <fhir-primitive
                                         key="valueString"
                                         .value=${d}
                                         .type=${PrimitiveType.fhir_string}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.valueBoolean,
                             (d: boolean) => html`
                                 <fhir-primitive
                                         key="valueBoolean"
                                         .value=${d}
                                         .type=${PrimitiveType.boolean}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.valueInteger,
                             (d: Integer) => html`
                                 <fhir-primitive
                                         key="valueInteger"
                                         .value=${d}
                                         .type=${PrimitiveType.integer}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.valueRange,
                             (d: RangeData) => html`
                                 <fhir-range
                                         key="valueRange"
                                         .data=${d}
                                         summary
                                 ></fhir-range>`
                      ),
                      choice(data.valueRatio,
                             (d: RatioData) => html`
                                 <fhir-ratio
                                         key="valueRatio"
                                         .data=${d}
                                         summary
                                 ></fhir-ratio>`
                      ),
                      choice(data.valueSampledData,
                             (d: SampledDataData) => html`
                                 <fhir-sampled-data
                                         key="valueSampledData"
                                         .data=${d}
                                         summary
                                 ></fhir-sampled-data>`
                      ),
                      choice(data.valueTime,
                             (d: Time) => html`
                                 <fhir-primitive
                                         key="valueTime"
                                         .value=${d}
                                         .type=${PrimitiveType.time}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.valueDateTime,
                             (d: DateTime) => html`
                                 <fhir-primitive
                                         key="valueDateTime"
                                         .value=${d}
                                         .type=${PrimitiveType.datetime}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.valuePeriod,
                             (d: PeriodData) => html`
                                 <fhir-period
                                         key="valuePeriod"
                                         .data=${d}
                                         summary
                                 ></fhir-period>`
                      ),
                      choice(data.valueAttachment,
                             (d: AttachmentData) => html`
                                 <fhir-attachment
                                         key="valueAttachment"
                                         .data=${d}
                                         summary
                                 ></fhir-attachment>`
                      ),
                      choice(data.valueReference,
                             (d: ReferenceData) => html`
                                 <fhir-reference
                                         key="valueReference"
                                         .data=${d}
                                         summary
                                 ></fhir-reference>`
                      )
                  ]
          )}
          <fhir-codeable-concept
                  key="dataAbsentReason"
                  .data=${data.dataAbsentReason}
                  .errors=${validations.sliceForFQK({ path: [{ node: 'dataAbsentReason' }] })}
          ></fhir-codeable-concept>
          ${wrap({
                     key: 'interpretation',
                     collection: data.interpretation ?? [],
                     generator: (d, l) => html`
                         <fhir-codeable-concept key=${l} .data=${d}></fhir-codeable-concept>`,
                     config
                 }
          )}
          ${wrap({
                     key: 'note',
                     collection: data.note ?? [],
                     generator: (d, l) => html`
                         <fhir-annotation key=${l} .data=${d}></fhir-annotation>`,
                     config
                 }
          )}
          <fhir-codeable-concept key="bodySite" .data=${data.bodySite}></fhir-codeable-concept>
          <fhir-reference key="bodyStructure" .data=${data.bodyStructure}></fhir-reference>
          <fhir-codeable-concept key="method" .data=${data.method}></fhir-codeable-concept>
          <fhir-reference key="specimen" .data=${data.specimen}></fhir-reference>
          <fhir-reference key="device" .data=${data.device}></fhir-reference>
          <fhir-observation-reference-range key="referenceRange"
                                            .data=${data.referenceRange}
          ></fhir-observation-reference-range>
          ${wrap({
                     key: 'hasMember',
                     collection: data.hasMember ?? [],
                     generator: (d, l) => html`
                         <fhir-reference key=${l} .data=${d} summary></fhir-reference>`,
                     config
                 }
          )}
          ${wrap({
                     key: 'derivedFrom',
                     collection: data.derivedFrom ?? [],
                     generator: (d, l) => html`
                         <fhir-reference key=${l} .data=${d} summary></fhir-reference>`,
                     config
                 }
          )}
          ${wrap({
                     key: 'component',
                     collection: data.component ?? [],
                     generator: (d, l) => html`
                         <fhir-observation-component key=${l} .data=${d}></fhir-observation-component>`,
                     config
                 }
          )}


      `
    ]
  }


}
