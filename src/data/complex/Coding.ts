import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../BaseElement'

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
          .label=${this.label}
          .value=${(Coding.comuteDisplay(data))}
          .context=${data.display ? data.code : undefined}
          .link=${data.system ? data.system : undefined}
          ?showerror=${this.showerror}
      ></fhir-primitive>
    `
  }

  protected renderStructure(data: CodingData): TemplateResult {
    return html`
      <fhir-primitive label="id" .value=${data.id} ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="extension" .value=${data.extension} ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="version" .value=${data.version} ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="system" .value=${data.system} type="url" ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="code" .value=${data.code} type="code" ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="display" .value=${data.display} ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
    `

  }


}
