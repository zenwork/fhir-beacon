import {html, TemplateResult}   from 'lit'
import {customElement}          from 'lit/decorators.js'
import {BaseElement}            from '../../../internal'
import {Decorated, EmptyResult} from '../../../internal/base'
import {strap, wrap}            from '../../../shell'
import {DisplayConfig}          from '../../../types'
import {PrimitiveType}          from '../../primitive/type-converters/type-converters'
import {HumanNameData}          from '../../resources/patient/patient.data'



@customElement('fhir-human-name')
export class HumanName extends BaseElement<HumanNameData> {
  constructor() {
    super('HumanName')
  }

  public renderDisplay(config: DisplayConfig, data: Decorated<HumanNameData>): TemplateResult[] {
    if (data.given || data.family) {
      return [
        html`
            <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive>
            ${config.verbose
              ? wrap(
                            {
                                key: '',
                                pluralBase: 'given name',
                                collection: data.given,
                                generator: (g,
                                            i) => html`
                                <fhir-primitive label=${i}
                                                .value=${g}
                                                .type=${PrimitiveType.fhir_string}
                                                summary
                                ></fhir-primitive>`,
                                config
                            }
                    )
              : html`
                        <fhir-primitive label="given name"
                                        .value=${data.given.join(' ')}
                                        .type=${PrimitiveType.fhir_string}
                                        summary
                        ></fhir-primitive>`}

            <fhir-primitive label="family name"
                            .value=${data.family}
                            .type=${PrimitiveType.fhir_string}
                            summary
            ></fhir-primitive>
        `
      ]
    }

    if (data.text) {
      return [
        html`
            <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive>
            <fhir-primitive label="full name"
                            .value=${data.text}
                            .type=${PrimitiveType.fhir_string}
                            summary
            ></fhir-primitive> `
      ]
    }

    return EmptyResult
  }

  public renderStructure(config: DisplayConfig, data: Decorated<HumanNameData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive>
          <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive>
          <fhir-primitive label="family"
                          .value=${data.family}
                          .type=${PrimitiveType.fhir_string}
                          summary
          ></fhir-primitive>
          ${strap(
                  {
                      key: 'given',
                      pluralBase: 'given',
                      collection: data.given,
                      generator: (g, i) => html`
                          <fhir-primitive label=${i}
                                          .value=${g}
                                          .type=${PrimitiveType.fhir_string}
                                          summary
                          ></fhir-primitive>`,
                      summary: this.summary,
                      config: config
                  }
          )}
      `
    ]
  }
}
