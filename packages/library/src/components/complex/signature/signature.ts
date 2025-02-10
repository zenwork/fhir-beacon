import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../../internal'
import {DisplayConfig}        from '../../../shell/types'

import {SignatureData} from '../../foundation/bundle/bundle.data'
import {PrimitiveType} from '../../primitive/type-converters/type-converters'



@customElement('fhir-signature')
export class Signature extends BaseElement<SignatureData> {

  constructor() {super('Signature')}

  public renderDisplay(config: DisplayConfig, data: SignatureData): TemplateResult[] {
    return [
      html`
        <fhir-coding label="type" .data=${data.type} summary></fhir-coding >
        <fhir-primitive label="when" .value=${data.when} .type=${PrimitiveType.instant} summary></fhir-primitive >
        <fhir-reference label="who" .data=${data.who} summary></fhir-reference >
        <fhir-reference label="onBehalfOf" .data=${data.onBehalfOf} summary></fhir-reference >
        <fhir-primitive label="targetFormat" .value=${data.targetFormat} .type=${PrimitiveType.code}></fhir-primitive >
        <fhir-primitive label="sigFormat" .value=${data.sigFormat} .type=${PrimitiveType.code}></fhir-primitive >
        <fhir-primitive label="data" .value=${data.data} .type=${PrimitiveType.base64} variant="hide-overflow"></fhir-primitive >
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: SignatureData): TemplateResult[] {

    return [
      html`
        <fhir-coding label="type" .data=${data.type} summary></fhir-coding >
        <fhir-primitive label="when" .value=${data.when} .type=${PrimitiveType.instant} summary></fhir-primitive >
        <fhir-reference label="who" .data=${data.who} summary></fhir-reference >
        <fhir-reference label="onBehalfOf" .data=${data.onBehalfOf} summary></fhir-reference >
        <fhir-primitive label="targetFormat" .value=${data.targetFormat} .type=${PrimitiveType.code}></fhir-primitive >
        <fhir-primitive label="sigFormat" .value=${data.sigFormat} .type=${PrimitiveType.code}></fhir-primitive >
        <fhir-primitive label="data" .value=${data.data} .type=${PrimitiveType.base64} variant="fixed-width"></fhir-primitive >
      `
    ]
  }

}
