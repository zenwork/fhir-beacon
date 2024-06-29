import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {BaseElementContextConsumer}    from '../../../internal/base/base-element-context-consumer'
import {hasSome}                       from '../../../shell/layout/directives'
import {wrap, wraps}                   from '../../../shell/layout/wrapCollection'
import {hasOnly}                       from '../../../utilities/hasOnly'
import {PrimitiveType}                 from '../../primitive/type-converters'
import {AddressData}                   from '../../resources/patient/patient.data'
import '../../../index'

@customElement('fhir-address')
export class Address extends BaseElementContextConsumer<AddressData> {

  constructor() {super('Address')}

  protected renderDisplay(data: AddressData): TemplateResult | TemplateResult[] {
    // TODO: validation binding rules need to be applied to use and to type
    if (hasOnly(data, 'text')) {
      return html`
        <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      `
    }

    return html`
      <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive >
      <fhir-primitive label="type" .value=${data.type} .type=${PrimitiveType.code} summary></fhir-primitive >
      ${hasSome(data.line, this.verbose) ? wrap('street', data.line, this.verbose, (l, i) => html`
        <fhir-primitive .value=${l} .type=${PrimitiveType.fhir_string} summary>
          <span slot="after">,</span >
        </fhir-primitive >
      `) : nothing}
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
      ${hasSome(data.line, this.verbose) ? wraps('lines', data.line, this.verbose, (l, i) => html`
        <fhir-primitive label="line${i}" .value=${l} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      `) : nothing}
      <fhir-primitive label="city" .value=${data.city} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      <fhir-primitive label="district" .value=${data.district} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      <fhir-primitive label="state" .value=${data.state} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      <fhir-primitive label="postalCode" .value=${data.postalCode} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      <fhir-primitive label="country" .value=${data.country} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      <fhir-period label="period" .data=${data.period} summary></fhir-period >

    `
  }

}
