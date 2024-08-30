import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../../internal'
import {strap, wrapLines}     from '../../../shell/layout/wrapCollection'
import {DisplayConfig}        from '../../../types'
import {CodeableConceptData}  from './codeable-concept.data'

@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElement<CodeableConceptData> {
  constructor() {
    super('CodeableConcept')
  }

  //TODO: review how to deal with fall-back situation. Is this a correct interpretation. We probably need some
  // extensive testing TODO: display summary is problematic because it does not represent the spec correctly sometimes
  // if layout is modified
  public renderDisplay(config: DisplayConfig, data: CodeableConceptData): TemplateResult[] {
    return [
      html`
          ${wrapLines(this.key,
                      'coding',
                      data.coding,
                      this.verbose,
                      (data, label) => html`
                          <fhir-coding key="coding" .label=${label} .data=${data} summary></fhir-coding >`,
                      true,
                      this.summaryMode()
          )}

          <fhir-primitive key="text" .value=${data.text} summary></fhir-primitive >`
    ]

  }

  public renderStructure(config: DisplayConfig, data: CodeableConceptData): TemplateResult[] {
    return [
      strap('coding',
            'coding',
            data.coding,
            this.verbose,
            (code, label) => html`
                <fhir-coding key="coding" label="${label}" .data=${code} summary></fhir-coding >`,
            true,
            this.summaryMode()
      ),
      html`
          <fhir-primitive key="text" .value=${data.text} summary></fhir-primitive > `
    ]
  }
}
