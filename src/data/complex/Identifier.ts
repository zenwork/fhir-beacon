import {html, TemplateResult} from 'lit'
import {customElement}                from 'lit/decorators.js'
import {BaseElement, BaseElementMode} from '../../BaseElement'
import {PrimitiveType}                from '../primitive/converters'
import {IdentifierData} from './strucutures/complex'
import './CodeableConcept'
import './Period'

@customElement('fhir-identifier')
export class Identifier extends BaseElement<IdentifierData>{


  protected renderDisplay(data: IdentifierData): TemplateResult {
    return html`
        <fhir-codeable-concept .data=${data.type} .mode=${BaseElementMode.display}></fhir-codeable-concept>
        <fhir-primitive label="value" .value=${data.value}></fhir-primitive>
        <fhir-period .data=${data.period} .mode=${BaseElementMode.display}></fhir-period>
    `
  }

  protected renderStructure(data: IdentifierData): TemplateResult {
    return html`
        <fhir-primitive label="use" .value=${data.use} type=${PrimitiveType.code}></fhir-primitive>
        <fhir-codeable-concept .data=${data.type} .mode=${BaseElementMode.structure}></fhir-codeable-concept>
        <fhir-primitive label="system" .value=${data.system} type=${PrimitiveType.uri}></fhir-primitive>
        <fhir-primitive label="value" .value=${data.value} ></fhir-primitive>
        <fhir-period .data=${data.period} .mode=${BaseElementMode.structure}></fhir-period>
        <!-- assigner -->
    `
  }
}
