import {css, html, TemplateResult} from 'lit'
import {customElement}             from 'lit/decorators.js'
import {BaseElementConsumer}       from '../../../internal/base/base-element-consumer'

import {RatioData} from './ratio.data'

@customElement('fhir-ratio')
export class Ratio extends BaseElementConsumer<RatioData> {
  static styles = css`
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

  constructor() {super('Ratio')}

  protected renderDisplay(data: RatioData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive-wrapper part="base">
        <fhir-label text="${this.label}"></fhir-label>&nbsp;
        <fhir-quantity .data=${data.numerator}></fhir-quantity >
        <fhir-value text="&nbsp;/&nbsp;"></fhir-value>
        <fhir-quantity .data=${data.denominator}></fhir-quantity >
      </fhir-primitive-wrapper >
    `
  }

  protected renderStructure(data: RatioData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-quantity label="numerator" .data=${data.numerator}></fhir-quantity >
      <fhir-quantity label="denominator" .data=${data.denominator}></fhir-quantity >
    `
  }

}
