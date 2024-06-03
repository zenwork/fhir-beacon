import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElementConsumer}  from '../../../internal/base/base-element-consumer'
import {wrap, wraps}          from '../../../shell/layout/wrapCollection'
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

    if (data.coding) {
      return html`
        ${wrap('identifiers', data.coding, this.displayConfig.verbose,
            (i, x) => html`
              <fhir-coding .label=${this.label || 'name'}${x} .data=${i}></fhir-coding >`)}
      `
    }

    if (data.text) {
      return html`
        <fhir-primitive .label=${this.label ?? 'name'} .value=${data.text}></fhir-primitive >`
    }

    return html`
      <fhir-not-supported ></fhir-not-supported >`
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult[] {
    return [
      wraps('codings', data.coding, this.displayConfig.verbose,
        (i, x) => html`
          <fhir-coding label="coding${x}}" .data=${i}></fhir-coding >`),
      html`
        <fhir-primitive label="text" .value=${data.text}></fhir-primitive > `
    ]
  }


}
