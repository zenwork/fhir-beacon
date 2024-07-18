import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {map}                           from 'lit/directives/map.js'
import {BaseElementContextConsumer}    from '../../../internal/base/base-element-context-consumer'
import {hasMany, hasOnlyOne}           from '../../../shell/layout/directives'
import {PrimitiveType}                 from '../../primitive/type-converters/type-converters'
import {HumanNameData}                 from '../../resources/patient/patient.data'

@customElement('fhir-human-name')
export class HumanName extends BaseElementContextConsumer<HumanNameData> {

  protected renderDisplay(data: HumanNameData): TemplateResult | TemplateResult[] {

    if (data.given && data.family) {
      return html`
        <fhir-primitive label="given name" .value=${data.given.join(' ')} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="family name" .value=${data.family} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      `
    }

    if (data.text) {
      return html`
        <fhir-primitive label="full name" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      `
    }

    return html``

  }

  protected renderStructure(data: HumanNameData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive >
      <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      <fhir-primitive label="family" .value=${data.family} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      ${hasMany(data.given, this.displayConfig.verbose)
        ? html`
            <fhir-structure-wrapper label='given'>
              ${map(data.given,
                  (g, i) => html`
                    <fhir-primitive label="given[${i}]" .value=${g} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >`)}
            </fhir-structure-wrapper >
          `
        : hasOnlyOne(data.given)
          ? html`
                <fhir-primitive label="given" .value=${data.given[0]} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
              `
          : nothing}
    `
  }

}
