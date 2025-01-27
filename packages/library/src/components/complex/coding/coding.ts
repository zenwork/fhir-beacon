import {html, TemplateResult}     from 'lit'
import {customElement}            from 'lit/decorators.js'
import {BaseElement, Validations} from '../../../internal'
import {DisplayConfig}            from '../../../types'
import {CodingData}               from './coding.data'

@customElement('fhir-coding')
export class Coding extends BaseElement<CodingData> {

  constructor() {
    super('Coding')
  }

  private static computeDisplay = (data: CodingData) => {
    if (data.display) return data.display
    if (data.code) return data.code
  }

  public override renderDisplay(config: DisplayConfig, data: CodingData): TemplateResult[] {
    return [
      html`
          <fhir-primitive
                  .label=${this.getLabel()}
                  .value=${Coding.computeDisplay(data)}
                  .context=${data.display ? data.code : undefined}
                  .link=${(data.system && data.code) ? data.system + '/' + data.code : undefined}
                  summary
          ></fhir-primitive >
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: CodingData,
                         validations: Validations): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="extension" .value=${data.extension} summary></fhir-primitive >
          <fhir-primitive label="version" .value=${data.version} summary></fhir-primitive >
          <fhir-primitive label="system" .value=${data.system} type="url" summary></fhir-primitive >
          <fhir-primitive label="code" .value=${data.code} type="code" errormessage=${validations.errFor('code')} summary></fhir-primitive >
          <fhir-primitive label="display" .value=${data.display} summary></fhir-primitive >
      `
    ]
  }


}
