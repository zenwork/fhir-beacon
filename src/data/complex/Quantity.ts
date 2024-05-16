import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {BaseData}                      from '../../BaseData'
import {BaseElement}                   from '../../BaseElement'
import {asQuantityComparator}          from '../primitive/presenters/asQuantityComparator'

import {QuantityData} from './strucutures/complex'

//TODO: rename to fhir-quanity
@customElement('fhir-quantity')
export class Quantity extends BaseElement<QuantityData> {

  constructor() {super('Quantity')}

  protected renderDisplay(data: QuantityData): TemplateResult {
    return html`
        <fhir-primitive label="value" .value=${data.value} type="decimal">
            <span slot="before">${data.comparator ? asQuantityComparator(data.comparator).display.toLowerCase() : nothing}</span>
            <span slot="after">${data.unit}</span>
        </fhir-primitive>
    `
  }

  protected renderStructure(data: QuantityData): TemplateResult {
    return html`
        <fhir-primitive label="value" .value=${data.value} type="decimal" ?showError=${this.showError}
                        .verbose=${this.verbose}></fhir-primitive>
        <fhir-primitive label="comparator" .value=${data.comparator} type="code" ?showError=${this.showError}
                        .verbose=${this.verbose}></fhir-primitive>
        <fhir-primitive label="unit" .value=${data.unit} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
        <fhir-primitive label="system" .value=${data.system} type="uri" ?showError=${this.showError}
                        .verbose=${this.verbose}></fhir-primitive>
        <fhir-primitive label="code" .value=${data.code} type="code" ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      `
  }


  protected convertData(data: BaseData & { [p: string]: any }): QuantityData {
    if (data.comparator) {
      // convert html encoded strings such as &gt;
      data.comparator = new DOMParser().parseFromString(data.comparator, 'text/html').body.textContent
    }
    return data
  }
}
