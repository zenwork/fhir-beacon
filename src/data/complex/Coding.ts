import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../BaseElement'

import {CodingData} from './strucutures/complex'

//TODO: rename to fhir-coding
@customElement('bkn-coding')
export class Coding extends BaseElement<CodingData> {

  override renderDisplay(data: CodingData): TemplateResult {
    return html`
        <fhir-primitive label="display" .value=${data.display ? data.display : 'n/a'} ?showError=${this.showError}></fhir-primitive>`
  }

  protected renderStructure(data: CodingData): TemplateResult[] {
    return [
      data.id ? html`
          <fhir-primitive label="id" .value=${data.id} ?showError=${this.showError}></fhir-primitive>` : html``,
      data.extension ? html`
          <fhir-primitive label="extension" .value=${data.extension} ?showError=${this.showError}></fhir-primitive>` : html``,
      data.version ? html`
          <fhir-primitive label="version" .value=${data.version} ?showError=${this.showError}></fhir-primitive>` : html``,
      data.system ? html`
          <fhir-primitive label="system" type="url" .value=${data.system} ?showError=${this.showError}></fhir-primitive>` : html``,
      data.code ? html`
          <fhir-primitive label="code" type="code" .value=${data.code} ?showError=${this.showError}></fhir-primitive>` : html``,
      data.display ? html`
          <fhir-primitive label="display" .value=${data.display} ?showError=${this.showError}></fhir-primitive> ` : html``
    ]

  }


}
