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
        <fhir-wrapper .label=${this.type}>
            ${repeat(data.coding, (c) => html`
        <bkn-coding .data=${c} .mode=${BaseElementMode.display}></bkn-coding>
    `)}
            <fhir-primitive label="text" .value=${data.text}></fhir-primitive>
        </fhir-wrapper>
    `
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult {
    return html`
        <fhir-structure-wrapper label="coding">
          ${repeat(data.coding, (c, index) => html`
        <bkn-coding .label=${'[' + (index + 1) + ']'} .data=${c} .mode=${BaseElementMode.structure}></bkn-coding>
    `)}
        </fhir-structure-wrapper>
        <fhir-primitive label="text" .value=${data.text}></fhir-primitive>
    `
  }
}