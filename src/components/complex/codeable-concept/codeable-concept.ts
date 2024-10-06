import {html, TemplateResult}           from 'lit'
import {customElement}                  from 'lit/decorators.js'
import {BaseElement, Decorated, errors} from '../../../internal'
import {strap}     from '../../../shell/layout/structure-wrapper/strap'
import {wrapLines} from '../../../shell/layout/wrapper/wrapLines'
import {DisplayConfig}                  from '../../../types'
import {CodeableConceptData}            from './codeable-concept.data'

@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElement<CodeableConceptData> {
  constructor() {
    super('CodeableConcept')
  }

  public renderDisplay(config: DisplayConfig, data: Decorated<CodeableConceptData>): TemplateResult[] {

    return [
      html`
          ${wrapLines(this.key,
                      'coding',
                      data.coding ?? [],
                      this.verbose,
                      (data, label) => html`
                          <fhir-coding key="coding" .label=${label} .data=${data} summary></fhir-coding >`,
                      true,
                      this.summaryonly
          )}

          <fhir-primitive key="text" .value=${data.text} summary></fhir-primitive >`
    ]

  }

  public renderStructure(config: DisplayConfig, data: Decorated<CodeableConceptData>): TemplateResult[] {
    return [
      strap('coding',
            'coding',
            data.coding ?? [],
            this.verbose,
            (code, label) => html`
                <fhir-coding key="coding" label="${label}" .errors=${data[errors]} .data=${code} summary></fhir-coding >`,
            true,
            this.summaryonly
      ),
      html`
          <fhir-primitive key="text" .value=${data.text} summary></fhir-primitive > `
    ]
  }
}
