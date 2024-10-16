import {html, TemplateResult} from 'lit'
import {customElement} from 'lit/decorators.js'
import {BaseElement}   from '../../../internal'
import {EmptyResult}   from '../../../internal/base'
import {DisplayConfig} from '../../../types'

import {RatioData} from './ratio.data'

@customElement('fhir-ratio')
export class Ratio extends BaseElement<RatioData> {

  constructor() {
    super('Ratio')
  }

  public renderDisplay(_: DisplayConfig, data: RatioData): TemplateResult[] {

    if (this.summaryonly && !this.summary) {
      return EmptyResult
    }

    let denominator: TemplateResult
    if (data.denominator?.value == 1 && (data.denominator.unit || data.denominator.code)) {
      denominator = html`
          <fhir-value text="${data.denominator.unit || data.denominator.code}"></fhir-value >`
    } else {
      denominator = html`
          <fhir-quantity .data=${data.denominator} headless summary></fhir-quantity>`
    }

    return [
      html`
          <fhir-primitive-wrapper part="base">
              <fhir-label text="${this.getLabel()}"></fhir-label>&nbsp;
              <fhir-quantity .data=${data.numerator} headless summary></fhir-quantity>
              <fhir-value text="&nbsp;/&nbsp;"></fhir-value >
              ${denominator}
          </fhir-primitive-wrapper >
      `
    ]
  }

  public renderStructure(_: DisplayConfig, data: RatioData): TemplateResult[] {
    return [
      html`
          <fhir-quantity label="numerator" .data=${data.numerator} summary></fhir-quantity >
          <fhir-quantity label="denominator" .data=${data.denominator} summary></fhir-quantity >
      `
    ]
  }
}
