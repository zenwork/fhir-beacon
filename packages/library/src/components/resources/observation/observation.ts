import {html, TemplateResult}                                                from 'lit'
import {customElement}                                                       from 'lit/decorators.js'
import {choice, Decorated, DomainResource, oneOf, Validations}               from '../../../internal'
import {wrap}                                                                from '../../../shell'
import {DisplayConfig}                                                                       from '../../../types'
import {AttachmentData, CodeableConceptData, PeriodData, QuantityData, RangeData, RatioData} from '../../complex'
import {identifiers}                                                                         from '../../complex/identifier/identifiers'
import {Canonical, DateTime, Instant, Integer, PrimitiveType, Time}          from '../../primitive'
import {ReferenceData}                                                       from '../../special'

import {ObservationData, SampledDataData, TimingData} from './observation.data'



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

  public renderAny(config: DisplayConfig,
                   data: Decorated<ObservationData>,
                   validations: Validations): TemplateResult[] {
    return [
      html`
          ${identifiers(data.identifier ?? [], config)}

          ${oneOf(this,
                  'instantiate[x]',
                  validations.errFor('instantiate[x]'),
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

          <fhir-not-supported label="triggeredBy" variant='no-impl'></fhir-not-supported>
          ${wrap(
                  {
                      key: 'partOf',
                      collection: data.partOf ?? [],
                      generator: (d, l) => html`
                          <fhir-reference label=${l} .data=${d}></fhir-reference>`,
                      config
                  }
          )}
          <fhir-primitive key="status" .value=${data.status} .type=${PrimitiveType.code}></fhir-primitive>
          ${wrap(
                  {
                      key: 'category',
                      collection: data.category ?? [],
                      generator: (d, l) => html`
                          <fhir-codeable-concept label=${l} .data=${d}></fhir-codeable-concept>`,
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
                  validations.errFor('effective[x]'),
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
                             // eslint-disable-next-line @typescript-eslint/no-unused-vars
                             (d: TimingData) => html`
                                 <fhir-not-supported label="effectiveTiming" variant='no-impl'></fhir-not-supported>`
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
                  validations.errFor('value[x]'),
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
                                 <fhir-not-supported
                                         variant="no-impl"
                                         label="valueRange"
                                         .value=${d}
                                         .type=${PrimitiveType.datetime}
                                         summary
                                 ></fhir-not-supported>`
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
                                 <fhir-not-supported
                                         variant="no-impl"
                                         label="valueSampledData"
                                         .data=${d}
                                         summary
                                 ></fhir-not-supported>`
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

      `
    ]
  }


}
