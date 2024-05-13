import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../BaseElement'
import {PrimitiveType}        from '../primitive/converters'
import {PeriodData}     from './strucutures/complex'

@customElement('fhir-period')
export class Period extends BaseElement<PeriodData>{


  protected renderDisplay(data: PeriodData): TemplateResult | TemplateResult[] {
    return [
      html`<fhir-primitive label="start" type=${PrimitiveType.datetime} .value=${data.start}></fhir-primitive>`,
      html`<fhir-primitive label="end" type=${PrimitiveType.datetime} .value=${data.end}></fhir-primitive>`
    ]
  }
}
