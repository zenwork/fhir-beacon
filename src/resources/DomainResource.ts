import {html, TemplateResult}         from 'lit'
import {choose}                       from 'lit/directives/choose.js'
import {BaseElement, BaseElementMode} from '../BaseElement'
import {DomainResourceData}           from './structures'
import '../util/Wrapper'
import '../special/Narrative'

export class DomainResource<T extends DomainResourceData> extends BaseElement<T> {


  protected render(): TemplateResult {
    let data = this.convertData(this.data)
    return html`${choose(this.mode,
            [
                [BaseElementMode.narrative, () => this.renderNarrative(data)],
            ],
            () => super.render())}
    `

  }

  protected renderNarrative(data: T): TemplateResult {
    if (data.text) {
      return html`
          <fhir-wrapper .label=${this.label}>
              <fhir-narrative .data=${data.text}></fhir-narrative>
          </fhir-wrapper>`
    }
    return html``

  }
}
