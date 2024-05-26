import {html, TemplateResult}  from 'lit'
import {customElement}         from 'lit/decorators.js'
import {BaseElementMode}       from '../../BaseElementMode'
import {ConsumerBaseElement}   from '../../ConsumerBaseElement'
import {CodeableReferenceData} from './strucutures/complex'
import './CodeableConcept'
import '../../special/Reference'

@customElement('fhir-codeable-reference')
export class CodeableReference extends ConsumerBaseElement<CodeableReferenceData> {

  constructor() {super('CodeableReference')}

  protected renderDisplay(data: CodeableReferenceData): TemplateResult {
    return this.renderAll(data, BaseElementMode.display)
  }

  protected renderStructure(data: CodeableReferenceData): TemplateResult {
    return this.renderAll(data, BaseElementMode.structure)
  }

  private renderAll(data: CodeableReferenceData, mode: BaseElementMode) {
    return html`
      <fhir-codeable-concept
          label="concept"
          .data=${data.concept}

      ></fhir-codeable-concept>
      <fhir-reference
          label="reference"
          .data=${data.reference}
      ></fhir-reference>
    `
  }
}
