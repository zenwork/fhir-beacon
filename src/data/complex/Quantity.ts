import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {BaseData}                      from '../../BaseData'
import {BaseElement}                   from '../../BaseElement'
import {renderError}                   from '../../util/Errors'
import {asQuantityComparator}          from '../primitive/presenters/asQuantityComparator'

import {QuantityData, SimpleQuantityData} from './strucutures/complex'
import {isQuantity, isSimpleQuantity}     from './strucutures/type-guards'

//TODO: rename to fhir-quanity
@customElement('fhir-quantity')
export class Quantity extends BaseElement<QuantityData | SimpleQuantityData> {

  constructor() {super('Quantity')}

  // TODO: this simple quanity rule is not handled very well. There are a bunch more rules that need handling in quantity :-(

  protected renderDisplay(data: QuantityData | SimpleQuantityData): TemplateResult {

    if (isQuantity(data)) {
      return html`
        <fhir-primitive .label=${this.label} .value=${data.value} type="decimal">
          <span slot="before">${data.comparator ? asQuantityComparator(data.comparator).display.toLowerCase() : nothing}&nbsp;</span>
          <span slot="after">&nbsp;${data.unit}</span>
        </fhir-primitive>
      `
    }

    if (isSimpleQuantity(data)) {
      return html`
        <fhir-primitive .label=${this.label} .value=${data.value} type="decimal">
          <span slot="after">&nbsp;${data.unit}</span>
        </fhir-primitive>
      `
    }

    return renderError(this.showerror, this.verbose, 'quantity', 'must be Quantity or Simple Quantity')
  }

  protected renderStructure(data: QuantityData | SimpleQuantityData): TemplateResult {

    if (isQuantity(data)) {
      return html`
        <fhir-primitive
            label="value"
            .value=${data.value}
            type="decimal"
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
        <fhir-primitive
            label="comparator"
            .value=${data.comparator}
            type="code"
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
        <fhir-primitive
            label="unit"
            .value=${data.unit}
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
        <fhir-primitive
            label="system"
            .value=${data.system}
            type="uri"
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
        <fhir-primitive
            label="code"
            .value=${data.code}
            type="code"
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
      `
    }

    if (isSimpleQuantity(data)) {
      return html`
        <fhir-primitive
            label="value"
            .value=${data.value}
            type="decimal"
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
        <fhir-primitive
            label="unit"
            .value=${data.unit}
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
        <fhir-primitive
            label="system"
            .value=${data.system}
            type="uri"
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
        <fhir-primitive
            label="code"
            .value=${data.code}
            type="code"
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>
      `
    }

    return renderError(this.showerror, this.verbose, 'quantity', 'must be Quantity or Simple Quantity')

  }


  protected convertData(data: BaseData & { [p: string]: any }): QuantityData {
    if (data.comparator) {
      // convert html encoded strings such as &gt;
      data.comparator = new DOMParser().parseFromString(data.comparator, 'text/html').body.textContent
    }
    return data
  }
}
