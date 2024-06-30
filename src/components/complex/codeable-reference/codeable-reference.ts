import {html, TemplateResult}       from 'lit'
import {customElement}              from 'lit/decorators.js'
import {BaseElementContextConsumer} from '../../../internal/base/base-element-context-consumer'
import {CodeableReferenceData}      from './codeable-reference.data'
import '../codeable-concept/codeable-concept'
import '../../special/reference/reference'

@customElement('fhir-codeable-reference')
export class CodeableReference extends BaseElementContextConsumer<CodeableReferenceData> {

  constructor() {super('CodeableReference')}

  protected renderDisplay(data: CodeableReferenceData): TemplateResult {
    return html`
      <fhir-codeable-concept label="" .data=${data.concept} summary></fhir-codeable-concept >
      <fhir-reference label="name" .data=${data.reference} summary></fhir-reference >
    `
  }

  protected renderStructure(data: CodeableReferenceData): TemplateResult {
    return html`
      <fhir-codeable-concept label="concept" .data=${data.concept} summary></fhir-codeable-concept >
      <fhir-reference label="reference" .data=${data.reference} summary></fhir-reference >
    `
  }
}
