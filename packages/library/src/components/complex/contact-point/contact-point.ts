import {html, TemplateResult}     from 'lit'
import {customElement}            from 'lit/decorators.js'
import {BaseElement, Validations} from '../../../internal'
import {Decorated}                from '../../../internal/base'
import {DisplayConfig}            from '../../../shell/types'
import {PrimitiveType}            from '../../primitive/type-converters/type-converters'
import {ContactPointData}         from './contact-point.data'



@customElement('fhir-contact-point')
export class ContactPoint extends BaseElement<ContactPointData> {

  constructor() {super('ContactPoint')}

  public renderDisplay(config: DisplayConfig, data: Decorated<ContactPointData>, validations: Validations): TemplateResult[] {
    let label = data.use ?? 'value'
    label = label + (data.system ? ' (' + data.system + ')' : '')
    return [
      html`
          <fhir-primitive .label="${label}"
                          .value=${data.value}
                          .type=${PrimitiveType.fhir_string}
                          .errormessage=${validations.msgFor('system')}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="rank" .value=${data.rank} .type=${PrimitiveType.positiveInt} summary></fhir-primitive>
          <fhir-period label="period" .data=${data.period} summary></fhir-period>
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<ContactPointData>, validations: Validations): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="system"
                          .value=${data.system}
                          .errormessage=${validations.msgFor('system')}
                          .type=${PrimitiveType.code}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="value" .value=${data.value} .type=${PrimitiveType.fhir_string} summary></fhir-primitive>
          <fhir-primitive label="use" .value=${data.use} .type=${PrimitiveType.code} summary></fhir-primitive>
          <fhir-primitive label="rank" .value=${data.rank} .type=${PrimitiveType.positiveInt} summary></fhir-primitive>
          <fhir-period .label="period" .data=${data.period} summary></fhir-period>
      `
    ]
  }

}
