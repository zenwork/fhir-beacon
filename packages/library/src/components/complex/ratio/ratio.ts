import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../../internal'
import {hostStyles}           from '../../../styles'
import {DisplayConfig}        from '../../../types'

import {RatioData} from './ratio.data'



@customElement('fhir-ratio')
export class Ratio extends BaseElement<RatioData> {

  static styles = [hostStyles]

  constructor() {
    super('Ratio')
  }

  public renderDisplay(_: DisplayConfig, data: RatioData): TemplateResult[] {

    return [

      html`

          <div style=" display: flex; flex-direction: row; align-items: flex-start">

              <fhir-quantity key="numerator" .data=${data.numerator} summary headless></fhir-quantity>
              <fhir-value text="/"></fhir-value>
              <fhir-quantity key="denominator"
                             .data=${data.denominator}
                             summary
                             headless
              ></fhir-quantity>
          </div>

      `
    ]
  }

  public renderStructure(_: DisplayConfig, data: RatioData): TemplateResult[] {
    return [
      html`
          <div style=" display: flex; flex-direction: column; flex: 1">
              <fhir-quantity key="numerator" label="numerator" .data=${data.numerator} summary></fhir-quantity>
              <fhir-quantity key="denominator" label="denominator" .data=${data.denominator} summary></fhir-quantity>
          </div>
      `
    ]
  }
}
