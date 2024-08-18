import {html, nothing, TemplateResult}  from 'lit'
import {customElement}                  from 'lit/decorators.js'
import {BaseElement}                    from '../../../internal'
import {hasSome, strapLines, wrapLines} from '../../../shell'
import {hasOnly}                        from '../../../utilities'
import {PrimitiveType}                  from '../../primitive'
import {AddressData}                    from '../../resources'

@customElement('fhir-address')
export class Address extends BaseElement<AddressData> {
  constructor() {
    super('Address')
  }

  protected renderDisplay(data: AddressData): TemplateResult | TemplateResult[] {
    // TODO: validation binding rules need to be applied to use and to type
    if (hasOnly(data, 'text')) {
      return html`
          <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive > `
    }

    return html`
        <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive >
        <fhir-primitive label="type" .value=${data.type} .type=${PrimitiveType.code} summary></fhir-primitive >
        ${hasSome(data.line, this.verbose)
          ? wrapLines('',
                      'street',
                      data.line,
                      this.verbose,
                      (l) => html`
                          <fhir-primitive .value=${l} .type=${PrimitiveType.fhir_string} summary>
                              <span slot="after">,</span >
                          </fhir-primitive >
                      `
                )
          : nothing}
        <fhir-primitive label="city" .value=${data.city} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="district" .value=${data.district} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="state" .value=${data.state} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="postalCode" .value=${data.postalCode} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="country" .value=${data.country} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-period label="period" .data=${data.period} summary></fhir-period >
    `
  }

  protected renderStructure(data: AddressData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive >
        <fhir-primitive label="type" .value=${data.type} .type=${PrimitiveType.code} summary></fhir-primitive >
        <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        ${hasSome(data.line, this.verbose)
          ? strapLines('',
                       'line',
                       data.line,
                       this.verbose,
                       (l, i) => html`
                           <fhir-primitive label="${i}" .value=${l} .type=${PrimitiveType.fhir_string} summary></fhir-primitive > `
                )
          : nothing}
        <fhir-primitive label="city" .value=${data.city} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="district" .value=${data.district} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="state" .value=${data.state} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="postalCode" .value=${data.postalCode} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-primitive label="country" .value=${data.country} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
        <fhir-period label="period" .data=${data.period} summary></fhir-period >
    `
  }
}
