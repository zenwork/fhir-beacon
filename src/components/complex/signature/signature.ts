import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElementConsumer}  from '../../../internal/base/base-element-consumer'

import {SignatureData} from '../../foundation/bundle/bundle.data'
import {PrimitiveType} from '../../primitive/type-converters'

@customElement('fhir-signature')
export class Signature extends BaseElementConsumer<SignatureData> {

  constructor() {super('Signature')}

  protected renderDisplay(data: SignatureData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-coding label="type" .data=${data.type}></fhir-coding>
        <fhir-primitive label="when" .value=${data.when} .type=${PrimitiveType.instant}></fhir-primitive>
        <fhir-reference label="who" .data=${data.who}></fhir-reference>
        <fhir-reference label="onBehalfOf" .data=${data.onBehalfOf}></fhir-reference>
        <fhir-primitive label="targetFormat" .value=${data.targetFormat} .type=${PrimitiveType.code}></fhir-primitive>
        <fhir-primitive label="sigFormat" .value=${data.sigFormat} .type=${PrimitiveType.code}></fhir-primitive>
        <fhir-primitive label="data" .value=${data.data} .type=${PrimitiveType.base64} variant="hide-overflow"></fhir-primitive>
    `
  }

  protected renderStructure(data: SignatureData): TemplateResult | TemplateResult[] {

    return html`
      <fhir-coding label="type" .data=${data.type}></fhir-coding >
      <fhir-primitive label="when" .value=${data.when} .type=${PrimitiveType.instant}></fhir-primitive >
      <fhir-reference label="who" .data=${data.who}></fhir-reference >
      <fhir-reference label="onBehalfOf" .data=${data.onBehalfOf}></fhir-reference >
      <fhir-primitive label="targetFormat" .value=${data.targetFormat} .type=${PrimitiveType.code}></fhir-primitive >
      <fhir-primitive label="sigFormat" .value=${data.sigFormat} .type=${PrimitiveType.code}></fhir-primitive >
      <fhir-primitive label="data" .value=${data.data} .type=${PrimitiveType.base64} variant="fixed-width"></fhir-primitive >
    `
  }

}
