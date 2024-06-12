import {css, html, TemplateResult} from 'lit'
import {customElement}             from 'lit/decorators.js'
import {BaseElementContextConsumer}       from '../../../internal/base/base-element-context-consumer'

import {RatioData} from './ratio.data'

@customElement('fhir-ratio')
export class Ratio extends BaseElementContextConsumer<RatioData> {

  static styles = [
    css`
    fhir-primitive-wrapper {
      display: flex;
      list-style-type: none;
      padding-top: var(--sl-spacing-x-small);
      padding-bottom: var(--sl-spacing-x-small);
    }

    fhir-quantity::part(base) {
      padding: 0
    }
    `
  ]

  constructor() {super('Ratio')}

  protected renderDisplay(data: RatioData): TemplateResult | TemplateResult[] {

    let denominator: TemplateResult
    if (data.denominator?.value == 1 && (data.denominator.unit || data.denominator.code)) {
      denominator = html`
        <fhir-value text="${data.denominator.unit || data.denominator.code}"></fhir-va>`
    } else {
      denominator = html`
        <fhir-quantity .data=${data.denominator} summary></fhir-quantity >`
    }

    return html`
      <fhir-primitive-wrapper part="base">
        <fhir-label text="${this.label}"></fhir-label >&nbsp;
        <fhir-quantity .data=${data.numerator}></fhir-quantity >
        <fhir-value text="&nbsp;/&nbsp;"></fhir-value >
        ${denominator}
      </fhir-primitive-wrapper >
    `
  }

  protected renderStructure(data: RatioData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-quantity label="numerator" .data=${data.numerator} summary></fhir-quantity >
      <fhir-quantity label="denominator" .data=${data.denominator} summary></fhir-quantity >
    `
  }

}
