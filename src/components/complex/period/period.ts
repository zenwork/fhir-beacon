import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {PrimitiveType}        from '../../../components/primitive/type-converters'
import {BaseElementConsumer}  from '../../../internal/base/base-element-consumer'
import {PeriodData}           from './period.data'

@customElement('fhir-period')
export class Period extends BaseElementConsumer<PeriodData> {

  constructor() {super('Period')}

  protected renderDisplay(data: PeriodData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="since" type=${PrimitiveType.datetime} .value=${data.start}></fhir-primitive >
      <fhir-primitive label="until" type=${PrimitiveType.datetime} .value=${data.end}></fhir-primitive >
    `
  }

  protected renderStructure(data: PeriodData): TemplateResult | TemplateResult[] {
    return [
      html`
        <fhir-primitive
            label="start"
            type=${PrimitiveType.datetime}
            .value=${data.start}
        ></fhir-primitive>
        <fhir-primitive
            label="end"
            type=${PrimitiveType.datetime}
            .value=${data.end}
        ></fhir-primitive>`
    ]
  }
}
