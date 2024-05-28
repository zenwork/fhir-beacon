import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {BaseData}                      from '../../BaseData'
import {ConsumerBaseElement}           from '../../ConsumerBaseElement'
import {renderError}                   from '../../util/Errors'
import {asQuantityComparator}          from '../primitive/presenters/asQuantityComparator'

import {QuantityData, SimpleQuantityData} from './strucutures/complex'
import {isQuantity, isSimpleQuantity}     from './strucutures/type-guards'

//TODO: rename to fhir-quanity
@customElement('fhir-quantity')
export class Quantity extends ConsumerBaseElement<QuantityData | SimpleQuantityData> {

  constructor() {super('Quantity')}

  // TODO: this simple quanity rule is not handled very well. There are a bunch more rules that need handling in quantity :-(

  protected renderDisplay(data: QuantityData | SimpleQuantityData): TemplateResult {

    // TODO: not sure this is a good idea
    let displayValue: undefined | string | number = data.value
    let type: string = 'decimal'
    let after = data.unit || data.code
    if (data.value == 1 && (data.unit || data.code)) {
      displayValue = data.unit || data.code
      type = 'none'
      after = ''
    }


    if (isQuantity(data)) {
      return html`
        <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type}>
          <span slot="before">${data.comparator ? asQuantityComparator(data.comparator).display.toLowerCase() : nothing}&nb</span >
          <span slot="after">&nbsp;${after}</span >
        </fhir-primitive>
      `
    }

    if (isSimpleQuantity(data)) {
      return html`
        <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type}>
          <span slot="after">&nbsp;${after} </span >
        </fhir-primitive>
      `
    }

    return renderError(this.displayConfig.showerror, this.displayConfig.verbose, 'quantity', 'must be Quantity or Simple Quantity')
  }

  protected renderStructure(data: QuantityData | SimpleQuantityData): TemplateResult {

    if (isQuantity(data)) {
      return html`
        <fhir-primitive label="value" .value=${data.value} type="decimal"></fhir-primitive >
        <fhir-primitive label="comparator" .value=${data.comparator} type="code"></fhir-primitive >
        <fhir-primitive label="unit" .value=${data.unit}></fhir-primitive >
        <fhir-primitive label="system" .value=${data.system} type="uri"></fhir-primitive >
        <fhir-primitive label="code" .value=${data.code} type="code"></fhir-primitive >
      `
    }

    if (isSimpleQuantity(data)) {
      return html`
        <fhir-primitive label="value" .value=${data.value} type="decimal"></fhir-primitive >
        <fhir-primitive label="unit" .value=${data.unit}></fhir-primitive >
        <fhir-primitive label="system" .value=${data.system} type="uri"></fhir-primitive >
        <fhir-primitive label="code" .value=${data.code} type="code"></fhir-primitive >
      `
    }

    return renderError(this.displayConfig.showerror, this.displayConfig.verbose, 'quantity', 'must be Quantity or Simple Quantity')

  }


  protected convertData(data: BaseData & { [p: string]: any }): QuantityData {
    if (data.comparator) {
      // convert html encoded strings such as &gt;
      data.comparator = new DOMParser().parseFromString(data.comparator, 'text/html').body.textContent
    }
    return data
  }
}
