import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../BaseElement'
import {PrimitiveType}        from '../primitive/converters'
import {IdentifierData}       from './strucutures/complex'
import './CodeableConcept'
import './Period'
import '../../util/Wrapper'

@customElement('fhir-identifier')
export class Identifier extends BaseElement<IdentifierData> {

  //TODO: this still needs some work. There are a lot of corner cases
  constructor() {super('Identifier')}

  protected renderDisplay(data: IdentifierData): TemplateResult {
    return html`
      <fhir-codeable-concept .data=${data.type}></fhir-codeable-concept >
      <fhir-primitive label="identifier" .value=${data.value} .context=${data.system}></fhir-primitive>
      <fhir-period .data=${data.period}></fhir-period >
    `
  }

  /**
   * NOTE: Identifier can't be set to verbose because will go into infinite loop with Reference
   * TODO: do something about infinite recursion of types so vrbose mode works
   * @param data
   * @protected
   */
  protected renderStructure(data: IdentifierData): TemplateResult {
    return html`
      <fhir-primitive label="use" type=${PrimitiveType.code} .value=${data.use}></fhir-primitive >
      <fhir-codeable-concept label="type" .data=${data.type}></fhir-codeable-concept >
      <fhir-primitive label="system" type=${PrimitiveType.uri} .value=${data.system}></fhir-primitive >
      <fhir-primitive label="value" .value=${data.value}></fhir-primitive >
      <fhir-period label="period" .data=${data.period}></fhir-period >
      <fhir-reference label="assigner" .data=${data.assigner}></fhir-reference > `
  }
}
