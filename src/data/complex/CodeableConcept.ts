import {css, html, TemplateResult}    from 'lit'
import {repeat}                       from 'lit-html/directives/repeat.js'
import {customElement}                from 'lit/decorators.js'
import {BaseElement, BaseElementMode} from '../../BaseElement'
import {CodeableConceptData}          from './strucutures/complex'
import './Coding'
import '../../util/Empty'
import '../../util/StructureWrapper'

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
              <fhir-coding .data=${c} .mode=${BaseElementMode.display}></fhir-coding>
    `)}
            <fhir-primitive label="text" .value=${data.text}></fhir-primitive>
        </fhir-wrapper>
    `
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult[] {
    return [
      (data.coding && data.coding.length != 0 || this.verboseAllowed()) ? html`
        <fhir-structure-wrapper label="codings" ?open=${this.open}>${(this.getCodings(data))}</fhir-structure-wrapper> ` : html``,
      html`
        <fhir-primitive label="text" .value=${data.text} .showError=${this.showError} .verbose=${this.verbose}></fhir-primitive> `
    ]
  }

  private getCodings = (data: CodeableConceptData) => {
    if (data && data.coding) {
      return repeat(data.coding,
        (c, index) => html`
          <fhir-coding
              .label=${'[' + (index + 1) + ']'}
              .data=${c}
              .mode=${BaseElementMode.structure}
              .verbose=${this.verbose}
              ?open=${this.open}
          ></fhir-coding>
        `)
    } else {
      return [
        html`
          <fhir-empty-set></fhir-empty-set>`
      ]
    }
  }
}
