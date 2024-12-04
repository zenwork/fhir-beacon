import {css, html, TemplateResult} from 'lit'
import {customElement}             from 'lit/decorators.js'
import {BaseElement}               from '../../../internal'
import {DisplayConfig}             from '../../../types'

import {RatioData} from './ratio.data'

@customElement('fhir-ratio')
export class Ratio extends BaseElement<RatioData> {

  constructor() {
    super('Ratio')
  }

  static styles = [
    css`
      :host {
        display: flex;
        gap: 0;
      }
    `
  ]

  public renderDisplay(_: DisplayConfig, data: RatioData): TemplateResult[] {

    return [

      html`
          <fhir-quantity key="numerator" .data=${data.numerator} summary headless></fhir-quantity>
          <fhir-value text="/"></fhir-value>
          <fhir-quantity key="denominator"
                         .data=${data.denominator}
                         summary
                         headless
          ></fhir-quantity>
      `
    ]
  }

  public renderStructure(_: DisplayConfig, data: RatioData): TemplateResult[] {
    return [
      html`
          <fhir-quantity key="numerator" label="numerator" .data=${data.numerator} summary></fhir-quantity>
          <fhir-quantity key="denominator" label="denominator" .data=${data.denominator} summary></fhir-quantity>
      `
    ]
  }
}
