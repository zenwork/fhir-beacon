import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../BaseElement'
import {asReadable}           from '../primitive/presenters/asReadable'

import {CodingData} from './strucutures/complex'

//TODO: rename to fhir-coding
@customElement('fhir-coding')
export class Coding extends BaseElement<CodingData> {

  constructor() {
    super('Coding')
  }

  private static comuteDisplay = (data: CodingData) => {
    if (data.display) return data.display
    if (data.code) return data.code
  }

  override renderDisplay(data: CodingData): TemplateResult {
    return html`
      <fhir-primitive
          .label=${asReadable(this.type)}
          .value=${(Coding.comuteDisplay(data))}
          .context=${data.display ? data.code : undefined}
          ?showError=${this.showError}
      ></fhir-primitive>
    `
  }

  protected renderStructure(data: CodingData): TemplateResult {
    return html`
      <fhir-primitive label="id" .value=${data.id} ?showError=${this.showError} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="extension" .value=${data.extension} ?showError=${this.showError} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="version" .value=${data.version} ?showError=${this.showError} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="system" .value=${data.system} type="url" ?showError=${this.showError} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="code" .value=${data.code} type="code" ?showError=${this.showError} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="display" .value=${data.display} ?showError=${this.showError} ?verbose=${this.verbose}></fhir-primitive>
    `

  }


}
