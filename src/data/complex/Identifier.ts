import {html, TemplateResult}         from 'lit'
import {customElement}                from 'lit/decorators.js'
import {BaseElement, BaseElementMode} from '../../BaseElement'
import {PrimitiveType}                from '../primitive/converters'
import {IdentifierData}               from './strucutures/complex'
import './CodeableConcept'
import './Period'
import '../../util/Wrapper'

@customElement('fhir-identifier')
export class Identifier extends BaseElement<IdentifierData> {

  //TODO: this still needs some work. There are a lot of corner cases
  constructor() {super('Identifier')}

  protected renderDisplay(data: IdentifierData): TemplateResult {
    return html`
        <fhir-wrapper .label=${this.label}>
          <fhir-codeable-concept .data=${data.type} .mode=${BaseElementMode.display}></fhir-codeable-concept>
          <fhir-primitive label="value" .value=${data.value}></fhir-primitive>
          <fhir-period .data=${data.period} .mode=${BaseElementMode.display}></fhir-period>
        </fhir-wrapper>
    `
  }

  protected renderStructure(data: IdentifierData): TemplateResult {
    console.log('identifier', 'render structure')
    return html`
        <fhir-primitive type=${PrimitiveType.code} label="use" .value=${data.use}></fhir-primitive>
        <fhir-codeable-concept .data=${data.type || {}} .mode=${BaseElementMode.structure}></fhir-codeable-concept>
        <fhir-primitive type=${PrimitiveType.uri} label="system" .value=${data.system}></fhir-primitive>
        <fhir-primitive label="value" .value=${data.value}></fhir-primitive>
        <fhir-period .data=${data.period} .mode=${BaseElementMode.structure}></fhir-period>
        <fhir-reference .data=${data.assigner} .mode=${BaseElementMode.structure}></fhir-reference>
    `
  }
}
