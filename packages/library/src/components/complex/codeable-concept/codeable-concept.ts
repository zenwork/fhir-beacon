import {html, TemplateResult}                from 'lit'
import {customElement}                       from 'lit/decorators.js'
import {BaseElement, Decorated, Validations} from '../../../internal'
import {isDefined, wrap}                     from '../../../shell'
import {DisplayConfig}                       from '../../../types'
import {CodeableConceptData}                 from './codeable-concept.data'



@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElement<CodeableConceptData> {
  constructor() {
    super('CodeableConcept')
  }


  public validate(_data: CodeableConceptData, _validations: Validations, _fetched: boolean): void {
    super.validate(_data, _validations, _fetched)

    if (_validations.all().length > 0) {
      _validations.add({ fqk: { path: [{ node: '_root' }] }, message: 'validation error' })
    }
  }
  public renderDisplay(config: DisplayConfig,
                       data: Decorated<CodeableConceptData>,
                       validations: Validations): TemplateResult[] {


    return [
      wrap({
             key: 'code',
             collection: data.coding ?? [],
             generator: (d, l, k, i) =>
               html`
                   <fhir-coding key=${k}
                                .label=${l}
                                .data=${d}
                                .errors=${validations.sliceForFQK({ path: [{ node: 'coding', index: i }] })}
                                summary
                                headless
                   ></fhir-coding>`,
             config
           }
      ),
      (isDefined(data.coding) && !this.verbose) ? html`` : html`
          <fhir-primitive key="text" .value=${data.text} summary></fhir-primitive>`
    ]


  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<CodeableConceptData>,
                         validations: Validations): TemplateResult[] {

    return [
      wrap({
             key: 'coding',
             collection: data.coding ?? [],
             generator: (code, l, k, i) => html`
                 <fhir-coding key=${k}
                              label=${l}
                              .errors=${validations.sliceForFQK({ path: [{ node: 'coding', index: i }] })}
                              .data=${code}
                              summary
                 ></fhir-coding>`,
             config
           }
      ),
      (isDefined(data.coding) && !this.verbose) ? html`` : html`
          <fhir-primitive key="text" .value=${data.text} summary></fhir-primitive>`
    ]
  }
}
