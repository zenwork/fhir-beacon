import {css, html, TemplateResult} from 'lit'
import {customElement}             from 'lit/decorators.js'
import {ConsumerBaseElement}       from '../../ConsumerBaseElement'
import {RatioData}                 from '../../resources/structures'

@customElement('fhir-ratio')
export class Ratio extends ConsumerBaseElement<RatioData> {
  static styles = css`
    li {
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
      <li part="base">
        <fhir-label text="${this.label}"></fhir-label>&nbsp;
        <fhir-quantity .data=${data.numerator}></fhir-quantity >
        <fhir-value text="&nbsp;/&nbsp;"></fhir-value>
        <fhir-quantity .data=${data.denominator}></fhir-quantity >
      </li>
    `
  }

  protected renderStructure(data: RatioData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-quantity label="numerator" .data=${data.numerator}></fhir-quantity >
      <fhir-quantity label="denominator" .data=${data.denominator}></fhir-quantity >
    `
  }

}
