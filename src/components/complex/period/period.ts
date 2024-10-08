import {html, TemplateResult}   from 'lit'
import {customElement}          from 'lit/decorators.js'
import {BaseElement, Decorated} from '../../../internal'
import {DisplayConfig}          from '../../../types'
import {PrimitiveType}          from '../../primitive/type-converters/type-converters'
import {PeriodData}             from './period.data'

@customElement('fhir-period')
export class Period extends BaseElement<PeriodData> {

  constructor() {super('Period')}

  public renderDisplay(config: DisplayConfig, data: Decorated<PeriodData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive-wrapper >
              <fhir-label >period:</fhir-label >
              <fhir-primitive type=${PrimitiveType.datetime} .value=${data.start} summary></fhir-primitive >
              <fhir-label >&nbsp;&#x21E2;</fhir-label >
              <fhir-primitive type=${PrimitiveType.datetime} .value=${data.end} summary></fhir-primitive >
          </fhir-primitive-wrapper >
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<PeriodData>): TemplateResult[] {
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
