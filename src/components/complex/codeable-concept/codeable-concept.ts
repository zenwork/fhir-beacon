import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../../internal'
import {strap, wrap}          from '../../../shell/layout/wrapCollection'
import {CodeableConceptData}  from './codeable-concept.data'

@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElement<CodeableConceptData> {
  constructor() {
    super('CodeableConcept')
  }

  //TODO: review how to deal with fall-back situation. Is this a correct interpretation. We probably need some
  // extensive testing TODO: display summary is problematic because it does not represent the spec correctly sometimes
  // if layout is modified
  protected renderDisplay(data: CodeableConceptData): TemplateResult {
    if (data.coding) {
      return html`
          ${wrap(this.key,
                 'coding',
                 data.coding,
                 this.verbose,
                 (data, label) => html`
                     <fhir-coding .label=${label} .data=${data} summary></fhir-coding >`
          )}
      `
    }

    if (data.text) {
      return html`
          <fhir-primitive .label=${this.key} .value=${data.text} summary></fhir-primitive >`
    }

    return html``
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult[] {
    return [
      strap(this.key,
            'coding',
            data.coding,
            this.verbose,
            (code, index) => html`
                <fhir-coding label="coding ${index}" .data=${code} summary></fhir-coding >`
      ),
      html`
          <fhir-primitive key="text" .value=${data.text} summary></fhir-primitive > `
    ]
  }
}
