import {html, TemplateResult} from 'lit'
import {repeat}               from 'lit-html/directives/repeat.js'
import {customElement}        from 'lit/decorators.js'
import {BaseElementConsumer}  from '../../../internal/base/base-element-consumer'
import {CodeableConceptData}  from './codeable-concept.data'
import '../coding/coding'
import '../../../shell/layout/empty-set'
import '../../../shell/layout/structure-wrapper/structure-wrapper'

@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElementConsumer<CodeableConceptData> {

  constructor() {
    super('Codeable Concept')
  }

  //TODO: review how to deal with fall-back situation. Is this a correct interpretation. We probably need some extensive testing
  protected renderDisplay(data: CodeableConceptData): TemplateResult {
    return data.coding ?
           html`
             ${repeat(data.coding, (c, idx) => html`
               <fhir-coding .label=${this.label || 'name'}${data.coding.length > 1 ? '[' + idx + ']' : ''} .data=${c}></fhir-coding >
            `)}
           ` :
           html`
             <fhir-primitive .label=${this.label ?? 'name'} .value=${data.text}></fhir-primitive >`
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult[] {
    return [
      (data.coding && data.coding.length != 0 || this.verboseAllowed()) ? html`
        <fhir-structure-wrapper label="codings" .hide="${data.coding?.length <= 1}">${(this.getCodings(data))}</fhir-structure-wrapper > ` : html``,
      html`
        <fhir-primitive label="text" .value=${data.text}></fhir-primitive > `
    ]
  }

  private getCodings = (data: CodeableConceptData) => {
    if (data && data.coding) {
      return repeat(data.coding,
        (c, index) => html`
          <fhir-coding .label=${'coding [' + (index + 1) + ']'} .data=${c}></fhir-coding >
        `)
    }
    return [
      html`
        <fhir-empty-list ></fhir-empty-list >`
    ]
  }
}
