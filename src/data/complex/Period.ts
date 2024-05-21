import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../BaseElement'
import {PrimitiveType}        from '../primitive/converters'
import {PeriodData}           from './strucutures/complex'

@customElement('fhir-period')
export class Period extends BaseElement<PeriodData> {

  constructor() {super('Period')}

  protected renderDisplay(data: PeriodData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="since" type=${PrimitiveType.datetime} .value=${data.start} ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="until" type=${PrimitiveType.datetime} .value=${data.end} ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
    `
  }

  protected renderStructure(data: PeriodData): TemplateResult | TemplateResult[] {
    return [
      html`
        <fhir-primitive
            label="start"
            type=${PrimitiveType.datetime}
            .value=${data.start}
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}}
        ></fhir-primitive>
        <fhir-primitive
            label="end"
            type=${PrimitiveType.datetime}
            .value=${data.end}
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
        ></fhir-primitive>`
    ]
  }
}
