import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../../internal/base'
import {CodingData}           from './coding.data'

@customElement('fhir-coding')
export class Coding extends BaseElement<CodingData> {

  constructor() {
    super('Coding')
  }

  private static computeDisplay = (data: CodingData) => {
    if (data.display) return data.display
    if (data.code) return data.code
  }

  override renderDisplay(data: CodingData): TemplateResult {
    return html`
      <fhir-primitive
          .label=${this.label}
        .value=${Coding.computeDisplay(data)}
          .context=${data.display ? data.code : undefined}
        .link=${(data.system && data.code) ? data.system + '/' + data.code : undefined}
          summary
      ></fhir-primitive >
    `
  }

  protected renderStructure(data: CodingData): TemplateResult {
    return html`
      <fhir-primitive label="extension" .value=${data.extension} summary></fhir-primitive >
      <fhir-primitive label="version" .value=${data.version} summary></fhir-primitive >
      <fhir-primitive label="system" .value=${data.system} type="url" summary></fhir-primitive >
      <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive >
      <fhir-primitive label="display" .value=${data.display} summary></fhir-primitive >
    `
  }


}
