import {html, TemplateResult}       from 'lit'
import {customElement}              from 'lit/decorators.js'
import {BaseElementContextConsumer} from '../../../internal/base/base-element-context-consumer'
import {wrap, wraps}                from '../../../shell/layout/wrapCollection'
import {CodeableConceptData}        from './codeable-concept.data'

@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElementContextConsumer<CodeableConceptData> {

  constructor() {
    super('Codeable Concept')
  }

  //TODO: review how to deal with fall-back situation. Is this a correct interpretation. We probably need some extensive testing
  //TODO: display summary is problematic because it does not represent the spec correctly sometimes if layout is modified
  protected renderDisplay(data: CodeableConceptData): TemplateResult {
    if (data.coding) {
      return html`
        ${wrap('identifiers', data.coding, this.displayConfig.verbose,
            (i, x) => html`
              <fhir-coding .label=${this.label || 'name'}${x} .data=${i} summary></fhir-coding >`)}
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
      wraps('codings', data.coding, this.displayConfig.verbose,
        (i, x) => html`
          <fhir-coding label="coding${x}" .data=${i} summary></fhir-coding >`),
      html`
        <fhir-primitive label="text" .value=${data.text} summary></fhir-primitive > `
    ]
  }
}
