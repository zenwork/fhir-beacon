import {html, TemplateResult}  from 'lit'
import {customElement}         from 'lit/decorators.js'
import {BaseElement}           from '../../../internal/base'
import {CodeableReferenceData} from './codeable-reference.data'

@customElement('fhir-codeable-reference')
export class CodeableReference extends BaseElement<CodeableReferenceData> {
  constructor() {
    super('CodeableReference')
  }

  protected renderDisplay(data: CodeableReferenceData): TemplateResult {
    return html`
        <fhir-codeable-concept key="${this.key}/concept" .data=${data.concept} summary></fhir-codeable-concept >
        <fhir-reference key="reference" .data=${data.reference} summary></fhir-reference >
    `
  }

  protected renderStructure(data: CodeableReferenceData): TemplateResult {
    return html`
        <fhir-codeable-concept key="concept" .data=${data.concept} summary></fhir-codeable-concept >
        <fhir-reference key="reference" .data=${data.reference} summary></fhir-reference >
    `
  }
}
