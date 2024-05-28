import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {ConsumerBaseElement}  from '../../../internal/base/ConsumerBaseElement'
import {CodingData}           from './coding.data'

//TODO: rename to fhir-coding
@customElement('fhir-coding')
export class Coding extends ConsumerBaseElement<CodingData> {

  constructor() {
    super('Coding')
  }

  private static commuteDisplay = (data: CodingData) => {
    if (data.display) return data.display
    if (data.code) return data.code
  }

  override renderDisplay(data: CodingData): TemplateResult {
    return html`
      <fhir-primitive
          .label=${this.label}
          .value=${(Coding.commuteDisplay(data))}
          .context=${data.display ? data.code : undefined}
          .link=${data.system ? data.system : undefined}
      ></fhir-primitive >
    `
  }

  protected renderStructure(data: CodingData): TemplateResult {
    return html`
      <fhir-primitive label="id" .value=${data.id}></fhir-primitive >
      <fhir-primitive label="extension" .value=${data.extension}></fhir-primitive >
      <fhir-primitive label="version" .value=${data.version}></fhir-primitive >
      <fhir-primitive label="system" .value=${data.system} type="url"></fhir-primitive >
      <fhir-primitive label="code" .value=${data.code} type="code"></fhir-primitive >
      <fhir-primitive label="display" .value=${data.display}></fhir-primitive >
    `

  }


}
