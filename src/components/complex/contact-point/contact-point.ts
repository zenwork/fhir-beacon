import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElementContextConsumer}  from '../../../internal/base/base-element-context-consumer'
import {PrimitiveType}        from '../../primitive/type-converters'
import {ContactPointData}     from '../../resources/patient/patient.data'
import '../period/period'

@customElement('fhir-contact-point')
export class ContactPoint extends BaseElementContextConsumer<ContactPointData> {

  constructor() {super('ContactPoint')}

  protected renderDisplay(data: ContactPointData): TemplateResult | TemplateResult[] {
    let label = data.use ?? 'value'
    label = label + (data.system ? ' (' + data.system + ')' : '')
    return html`
      <fhir-primitive .label="${label}" .value=${data.value} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      <fhir-primitive label="rank" .value=${data.rank} .type=${PrimitiveType.positiveInt} summary></fhir-primitive >
      <fhir-period label="period" .data=${data.period} summary></fhir-period >
    `
  }

  protected renderStructure(data: ContactPointData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="system" .value=${data.system} .type=${PrimitiveType.code} summary></fhir-primitive >
      <fhir-primitive label="value" .value=${data.value} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
      <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive >
      <fhir-primitive label="rank" .value=${data.rank} .type=${PrimitiveType.positiveInt} summary></fhir-primitive >
      <fhir-period .label="period" .data=${data.period} summary></fhir-period >
    `
  }

}
