import {html, TemplateResult}         from 'lit'
import {repeat}                       from 'lit-html/directives/repeat.js'
import {customElement}                from 'lit/decorators.js'
import {BaseElement, BaseElementMode} from '../../BaseElement'
import {CodeableConceptData}          from './strucutures/complex'
import './Coding'
import '../../util/Empty'
import '../../util/StructureWrapper'

@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElement<CodeableConceptData> {

  constructor() {
    super('Codeable Concept')

  }

  protected renderDisplay(data: CodeableConceptData): TemplateResult {
    return html`
            ${repeat(data.coding, (c) => html`
              <fhir-coding
                  .label=${this.label + ' coding'} .data=${c} .mode=${BaseElementMode.display}
                  ?showerror=${this.showerror}
                  ?verbose=${this.verbose}
                  ?open=${this.open}
              ></fhir-coding>
            `)}
            <fhir-primitive .label=${this.label + ' coding'} .value=${data.text} ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive>
    `
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult[] {
    return [
      (data.coding && data.coding.length != 0 || this.verboseAllowed()) ? html`
        <fhir-structure-wrapper label="coding [list]" ?open=${this.open}>${(this.getCodings(data))}</fhir-structure-wrapper> ` : html``,
      html`
        <fhir-primitive label="text" .value=${data.text} ?showerror=${this.showerror} ?verbose=${this.verbose}></fhir-primitive> `
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
              ?showerror=${this.showerror}
              ?verbose=${this.verbose}
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
