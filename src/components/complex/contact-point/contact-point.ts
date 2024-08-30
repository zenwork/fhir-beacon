import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../../internal'
import {Decorated}            from '../../../internal/base'
import {DisplayConfig}        from '../../../types'
import {PrimitiveType}        from '../../primitive/type-converters/type-converters'
import {ContactPointData}     from '../../resources/patient/patient.data'

@customElement('fhir-contact-point')
export class ContactPoint extends BaseElement<ContactPointData> {

  constructor() {super('ContactPoint')}

  public renderDisplay(config: DisplayConfig, data: Decorated<ContactPointData>): TemplateResult[] {
    let label = data.use ?? 'value'
    label = label + (data.system ? ' (' + data.system + ')' : '')
    return [
      html`
          <fhir-primitive .label="${label}" .value=${data.value} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="rank" .value=${data.rank} .type=${PrimitiveType.positiveInt} summary></fhir-primitive >
          <fhir-period label="period" .data=${data.period} summary></fhir-period >
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<ContactPointData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="system" .value=${data.system} .type=${PrimitiveType.code} summary></fhir-primitive >
          <fhir-primitive label="value" .value=${data.value} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive >
          <fhir-primitive label="rank" .value=${data.rank} .type=${PrimitiveType.positiveInt} summary></fhir-primitive >
          <fhir-period .label="period" .data=${data.period} summary></fhir-period >
      `
    ]
  }

}
