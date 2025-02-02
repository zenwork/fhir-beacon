import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'

import {Backbone, choice, Decorated, oneOf, Validations} from '../../../internal'
import {
  wrap
}                                                        from '../../../shell'
import {
  DisplayConfig
}                                                        from '../../../types'
import {
  AttachmentData,
  CodeableConceptData,
  PeriodData,
  QuantityData,
  RangeData,
  RatioData,
  SampledDataData
}                                                        from '../../complex'
import {
  DateTime,
  Integer,
  PrimitiveType,
  Time
}                                                        from '../../primitive'
import {
  ReferenceData
}                                                        from '../../special'
import {
  ObservationComponentData
}                                                        from './observation.data'



@customElement('fhir-observation-component')
export class ObservationReferenceRange extends Backbone<ObservationComponentData> {
  constructor() {
    super('ObservationComponent')
  }
  public renderDisplay(config: DisplayConfig,
                       data: Decorated<ObservationComponentData>,
                       validations: Validations): TemplateResult[] {
    return this.renderAny(config, data, validations)
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<ObservationComponentData>,
                         validations: Validations): TemplateResult[] {
    return this.renderAny(config, data, validations)
  }

  public renderAny(config: DisplayConfig,
                   data: Decorated<ObservationComponentData>,
                   validations: Validations): TemplateResult[] {
    const { integer, datetime, fhir_string, time, boolean } = PrimitiveType
    return [
      html`
          <fhir-codeable-concept key="code" .data=${data.code} required></fhir-codeable-concept>
          ${oneOf(this,
                  'value[x]',
                  validations.messageFor('value[x]'),
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
                                         .type=${fhir_string}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.valueBoolean,
                             (d: boolean) => html`
                                 <fhir-primitive
                                         key="valueBoolean"
                                         .value=${d}
                                         .type=${boolean}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.valueInteger,
                             (d: Integer) => html`
                                 <fhir-primitive
                                         key="valueInteger"
                                         .value=${d}
                                         .type=${integer}
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
                                         .type=${time}
                                         summary
                                 ></fhir-primitive>`
                      ),
                      choice(data.valueDateTime,
                             (d: DateTime) => html`
                                 <fhir-primitive
                                         key="valueDateTime"
                                         .value=${d}
                                         .type=${datetime}
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
          <fhir-codeable-concept key="dataAbsentReason" .data=${data.dataAbsentReason}></fhir-codeable-concept>
          <fhir-codeable-concept key="interpretation" .data=${data.interpretation}></fhir-codeable-concept>
          ${wrap({
                     key: 'interpretation',
                     collection: data.interpretation ?? [],
                     generator: (d, l, k) => html`
                         <fhir-codeable-concept key=${k} label=${l} .data=${d}></fhir-codeable-concept>`,
                     config
                 }
          )
          }
          <fhir-not-supported label="referenceRange" variant="no-impl" description="not sure how to implement this"></fhir-not-supported>

      `
    ]
  }
}
