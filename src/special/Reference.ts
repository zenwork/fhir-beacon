import {html, TemplateResult}         from 'lit'
import {customElement}                from 'lit/decorators.js'
import {BaseData}                     from '../BaseData'
import {BaseElement, BaseElementMode} from '../BaseElement'
import {PrimitiveType}                from '../data/primitive/converters'
import {otherwise, when}              from '../util/when'
import {ReferenceData}                from './structures'
import '../data/primitive/Primitve'
import '../util/Wrapper'
import '../data/complex/Identifier'

@customElement('fhir-reference')
export class Reference extends BaseElement<ReferenceData> {

  constructor() {super('Reference')}

  //TODO: I think an extra attribute to describe the reference of what is needed here as a lot of examples rely on the key this is
  // assigned to rather than defining the `type` property
  //TODO: need to figure out how to add all special rules and corner cases for references. see: http://hl7.org/fhir/R5/datatypes.html#identifier

  protected renderDisplay(data: ReferenceData): TemplateResult | TemplateResult[] {
    return [
      html`
          <fhir-wrapper .label=${this.type}>
              ${
                      when(data)(
                              [
                                  d => !!d.display && !!d.reference,
                                  () => html`
                                      <fhir-primitive label=${data.type ? data.type : 'display'} .value=${data.display}
                                                      .link=${data.reference}></fhir-primitive>`
                              ],
                              [
                                  d => !!d.reference,
                                  () => html`
                                      <fhir-primitive label="link" .value=${data.reference} .link=${data.reference}></fhir-primitive>`
                              ],
                              [
                                  d => !!d.identifier,
                                  () => html`
                                      <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier>`
                              ],
                              otherwise(html`
                                  <fhir-primitive label="display" .value=${data.display}></fhir-primitive>`)
                      )
              }
          </fhir-wrapper>
      `
    ]
  }


  /**
   * NOTE: Reference can't be set to verbose because will go into infinite loop with Identifier
   * @param data
   * @protected
   */
  protected renderStructure(data: ReferenceData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-primitive label="reference" .value=${data.reference} .verbose=${this.verbose}></fhir-primitive>
        <fhir-primitive type=${PrimitiveType.uri_type} label="type" .value=${data.type} .verbose=${this.verbose}></fhir-primitive>
        <fhir-identifier .data=${data.identifier} .mode=${BaseElementMode.structure} .verbose=${this.verbose}></fhir-identifier>
        <fhir-primitive label="display" .value=${data.display} .verbose=${this.verbose}></fhir-primitive>
    `
  }


  protected convertData(data: BaseData & { [p: string]: any }): ReferenceData {
    //TODO: Rule: SHALL have a contained resource if a local reference is provided
    //TODO: Rule: At least one of reference, identifier and display SHALL be present (unless an extension is provided).
    return super.convertData(data)
  }
}
