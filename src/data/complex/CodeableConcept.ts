import {css, html, TemplateResult}    from 'lit'
import {repeat}                       from 'lit-html/directives/repeat.js'
import {customElement}                from 'lit/decorators.js'
import {BaseElement, BaseElementMode} from '../../BaseElement'
import {CodeableConceptData}          from './strucutures/complex'
import './Coding'

@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElement<CodeableConceptData> {

  static styles = css`
      header {
          font-weight: bold;
      }
  `

  constructor() {
    super('Codeable Concept')
  }

  protected renderDisplay(data: CodeableConceptData): TemplateResult {
    return html`
        <fhir-wrapper .label=${this.label}>
          <fhir-primitive label="text" .value=${data.text}></fhir-primitive>
          ${repeat(data.coding, (c) => html`
        <bkn-coding .data=${c} .mode=${BaseElementMode.display}></bkn-coding>
    `)}
        </fhir-wrapper>
    `
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult {
    console.log('codeable concept', 'render structure')
    return html`
        <fhir-primitive label="text" .value=${data.text}></fhir-primitive>
        <header>Codings</header>
        ${repeat(data.coding, (c) => html`
            <bkn-coding .data=${c} .mode=${BaseElementMode.structure}></bkn-coding>
        `)}
    `
  }
}
