import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../../internal'
import {wrap, wraps}          from '../../../shell/layout/wrapCollection'
import {CodeableConceptData}  from './codeable-concept.data'


@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElement<CodeableConceptData> {

  constructor() {
    super('Codeable Concept')
  }

  //TODO: review how to deal with fall-back situation. Is this a correct interpretation. We probably need some extensive testing
  //TODO: display summary is problematic because it does not represent the spec correctly sometimes if layout is modified
  protected renderDisplay(data: CodeableConceptData): TemplateResult {
    console.log(this.label, data)
    if (data.coding) {
      return html`
        ${wrap(this.context, this.label, data.coding, this.getDisplayConfig().verbose,
          (data, label) => html`
            <fhir-coding .label=${label} .data=${data} summary></fhir-coding >`)}
      `
    }

    if (data.text) {
      return html`
        <fhir-primitive .label=${'name'} .value=${data.text} summary></fhir-primitive >`
    }

    return html`
      <fhir-not-supported ></fhir-not-supported >`
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult[] {
    return [
      wraps('codings', data.coding, this.getDisplayConfig().verbose,
        (i, x) => html`
          <fhir-coding label="coding${x}" .data=${i} summary></fhir-coding >`),
      html`
        <fhir-primitive label="text" .value=${data.text} summary></fhir-primitive > `
    ]
  }
}
