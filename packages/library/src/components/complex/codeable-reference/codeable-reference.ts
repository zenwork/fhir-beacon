import {html, TemplateResult}            from 'lit'
import {customElement}                   from 'lit/decorators.js'
import {BaseElement, oneOf, Validations} from '../../../internal'
import {DisplayConfig}                   from '../../../types'
import {CodeableReferenceData}           from './codeable-reference.data'



@customElement('fhir-codeable-reference')
export class CodeableReference extends BaseElement<CodeableReferenceData> {
  constructor() {
    super('CodeableReference')
  }


  public validate(data: CodeableReferenceData, validations: Validations) {
    if (data.concept && data.reference) {
      validations.addErr({
                           key: this.type + '::' + this.key,
                           err: 'can only have one of concept or reference'
                         })
    }
  }

  public renderDisplay(_: DisplayConfig, data: CodeableReferenceData, validations: Validations): TemplateResult[] {
    return oneOf(this,
                 '',
                 validations.errFor(this.type + '::' + this.key),
                 [
                      {
                        data: data.concept,
                        html: (d, n) => html`
                            <fhir-codeable-concept key="concept"
                                                   label=${n}
                                                   .data=${d}
                                                   summary
                            ></fhir-codeable-concept>
                        `
                      },
                      {
                        data: data.reference,
                        html: (d, n) => html`
                            <fhir-reference key="reference"
                                            label=${n}
                                            .data=${d}
                                            summary
                            ></fhir-reference>
                        `
                      }
                    ])
  }

  public renderStructure(_: DisplayConfig, data: CodeableReferenceData): TemplateResult[] {
    return [
      html`
          <fhir-codeable-concept key="concept" .data=${data.concept} summary></fhir-codeable-concept>
          <fhir-reference key="reference" .data=${data.reference} summary></fhir-reference>
      `
    ]
  }
}
