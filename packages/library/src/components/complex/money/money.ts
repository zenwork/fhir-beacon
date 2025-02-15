import {html, TemplateResult}   from 'lit'
import {customElement}          from 'lit/decorators.js'
import {BaseElement, Decorated} from '../../../internal'
import {DisplayConfig}          from '../../../shell/types'
import {PrimitiveType}          from '../../primitive'
import {MoneyData}              from './money.data'



@customElement('fhir-money')
export class Money extends BaseElement<MoneyData> {

  constructor() {super('Money')}

  public renderDisplay(_: DisplayConfig, data: Decorated<MoneyData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive-wrapper >
              <fhir-label text="amount"></fhir-label>&nbsp;
              <fhir-primitive .value=${data.value} .type=${PrimitiveType.decimal} summary></fhir-primitive>
              <fhir-primitive .value=${data.currency} .type=${PrimitiveType.code}></fhir-primitive>
          </fhir-primitive-wrapper>
      `
    ]
  }

  public renderStructure(_: DisplayConfig, data: Decorated<MoneyData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="value" .value=${data.value} .type=${PrimitiveType.decimal} summary></fhir-primitive>
          <fhir-primitive key="currency" .value=${data.currency} .type=${PrimitiveType.code} summary></fhir-primitive>
      `
    ]
  }
}
