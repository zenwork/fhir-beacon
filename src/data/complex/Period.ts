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
        <fhir-wrapper .label=${this.type}>
            ${[
                html`
                    <fhir-primitive label="start" type=${PrimitiveType.datetime} .value=${data.start}></fhir-primitive>`,
                html`
                    <fhir-primitive label="end" type=${PrimitiveType.datetime} .value=${data.end}></fhir-primitive>`,
            ]}
        </fhir-wrapper>`
  }

  protected renderStructure(data: PeriodData): TemplateResult | TemplateResult[] {
    return [
      html`
          <fhir-primitive label="start" type=${PrimitiveType.datetime} .value=${data.start} .verbose=${this.verbose}></fhir-primitive>`,
      html`
          <fhir-primitive label="end" type=${PrimitiveType.datetime} .value=${data.end} .verbose=${this.verbose}></fhir-primitive>`,

    ]
  }
}
