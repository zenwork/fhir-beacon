import {html, nothing, TemplateResult}    from 'lit'
import {customElement}                    from 'lit/decorators.js'
import {BaseElementContextConsumer}              from '../../../internal/base/base-element-context-consumer'
import {BaseElementData}                  from '../../../internal/base/base-element.data'
import {renderError}                      from '../../../shell/layout/renderError'
import {asQuantityComparator}             from '../../primitive/type-presenters/asQuantityComparator'
import {QuantityData, SimpleQuantityData} from './quantity.data'


import {isQuantity, isSimpleQuantity} from './quantity.type-guards'

//TODO: rename to fhir-quanity
@customElement('fhir-quantity')
export class Quantity extends BaseElementContextConsumer<QuantityData | SimpleQuantityData> {

  constructor() {super('Quantity')}

  // TODO: this simple quanity rule is not handled very well. There are a bunch more rules that need handling in quantity :-(

  protected renderDisplay(data: QuantityData | SimpleQuantityData): TemplateResult {

    let displayValue: undefined | string | number = data.value
    let type: string = 'decimal'
    let after = data.unit || data.code

    if (isQuantity(data)) {
      return html`
        <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type}>
          <span slot="before">${data.comparator ? asQuantityComparator(data.comparator).display.toLowerCase() : nothing}&nbsp;</span >
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
        <fhir-primitive label="value" .value=${data.value} type="decimal" summary></fhir-primitive >
        <fhir-primitive label="comparator" .value=${data.comparator} type="code" summary></fhir-primitive >
        <fhir-primitive label="unit" .value=${data.unit} summary></fhir-primitive >
        <fhir-primitive label="system" .value=${data.system} type="uri" summary></fhir-primitive >
        <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive >
      `
    }

    if (isSimpleQuantity(data)) {
      return html`
        <fhir-primitive label="value" .value=${data.value} type="decimal" summary></fhir-primitive >
        <fhir-primitive label="unit" .value=${data.unit} summary></fhir-primitive >
        <fhir-primitive label="system" .value=${data.system} type="uri" summary></fhir-primitive >
        <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive >
      `
    }

    return renderError(this.displayConfig.showerror, this.displayConfig.verbose, 'quantity', 'must be Quantity or Simple Quantity')

  }


  protected convertData(data: BaseElementData & { [p: string]: any }): QuantityData {
    if (data.comparator) {
      // convert html encoded strings such as &gt;
      data.comparator = new DOMParser().parseFromString(data.comparator, 'text/html').body.textContent
    }
    return data
  }
}
