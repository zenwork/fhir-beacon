import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../../internal/base'
import {strap, wrap}          from '../../../shell'
import {PrimitiveType}        from '../../primitive/type-converters/type-converters'
import {HumanNameData}        from '../../resources/patient/patient.data'

@customElement('fhir-human-name')
export class HumanName extends BaseElement<HumanNameData> {
  constructor() {
    super('HumanName')
  }

  protected renderDisplay(data: HumanNameData): TemplateResult | TemplateResult[] {
    if (data.given && data.family) {
      return html`
          ${this.verbose
            ? wrap(
                          '',
                          'given name',
                          data.given,
                          this.verbose,
                          (g,
                           i) => html`
                              <fhir-primitive label=${i} .value=${g} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >`
                  )
            : html`
                      <fhir-primitive label="given name" .value=${data.given.join(' ')} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >`}

          <fhir-primitive label="family name" .value=${data.family} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      `
    }

    if (data.text) {
      return html`
          <fhir-primitive label="full name" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive > `
    }

    return html``
  }

  protected renderStructure(data: HumanNameData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive >
        <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="family" .value=${data.family} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        ${strap(
                this.key,
                'given',
                data.given,
                this.verbose,
                (g,
                 i) => html`
                    <fhir-primitive label=${i} .value=${g} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >`
        )}
    `
  }
}
