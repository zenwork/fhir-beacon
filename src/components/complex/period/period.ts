import {html, TemplateResult}       from 'lit'
import {customElement}              from 'lit/decorators.js'
import {PrimitiveType}              from '../../../components/primitive/type-converters'
import {BaseElementContextConsumer} from '../../../internal/base/base-element-context-consumer'
import {PeriodData}                 from './period.data'

@customElement('fhir-period')
export class Period extends BaseElementContextConsumer<PeriodData> {

  constructor() {super('Period')}

  protected renderDisplay(data: PeriodData): TemplateResult | TemplateResult[] {
    // TODO: fixed this hacked css
    return html`
      <fhir-primitive-wrapper >
        <fhir-label >period:</fhir-label >
        <fhir-primitive type=${PrimitiveType.datetime} .value=${data.start} summary></fhir-primitive >
        <fhir-label >&nbsp;&#x21E2;</fhir-label >
        <fhir-primitive type=${PrimitiveType.datetime} .value=${data.end} summary></fhir-primitive >
      </fhir-primitive-wrapper >
    `
  }

  protected renderStructure(data: PeriodData): TemplateResult | TemplateResult[] {
    return [
      html`
        <fhir-primitive
            label="start"
            type=${PrimitiveType.datetime}
            .value=${data.start}
            summary
        ></fhir-primitive >
        <fhir-primitive
            label="end"
            type=${PrimitiveType.datetime}
            .value=${data.end}
            summary
        ></fhir-primitive >`
    ]
  }
}
