import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {BaseElement}                   from '../../BaseElement'
import {BaseData}                      from '../../resources/structures'
import {asQuantityComparator}          from '../presenters/asQuantityComparator'
import {QuantityData}                  from '../structures'

@customElement('bkn-quantity')
export class Quantity extends BaseElement<QuantityData> {


  protected renderDisplay(data: QuantityData): TemplateResult {
    return html`
        <bkn-primitive label="value" .value=${data.value} type="decimal">
            <span slot="before">${data.comparator ? asQuantityComparator(data.comparator).display.toLowerCase() : nothing}</span>
            <span slot="after">${data.unit}</span>
        </bkn-primitive>
    `
  }

  protected renderStructure(data: QuantityData): TemplateResult {
    return html`
          <div style="border-radius: 0.2rem; border: solid 0.1rem #0c2d6b; padding:0.2rem;background: #fcfcfc;">
              <bkn-primitive label="value" .value=${data.value} type="decimal" ?showError=${this.showError}></bkn-primitive>
              <bkn-primitive label="comparator" .value=${data.comparator} type="code" ?showError=${this.showError}></bkn-primitive>
              <bkn-primitive label="unit" .value=${data.unit} ?showError=${this.showError}></bkn-primitive>
              <bkn-primitive label="system" .value=${data.system} type="uri" ?showError=${this.showError}></bkn-primitive>
              <bkn-primitive label="code" .value=${data.code} type="code" ?showError=${this.showError}></bkn-primitive>
          </div>
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
