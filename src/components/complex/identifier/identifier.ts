import {html, TemplateResult}   from 'lit'
import {customElement}          from 'lit/decorators.js'
import {BaseElement, Decorated} from '../../../internal/base'
import {DisplayConfig}          from '../../../types'
import {PrimitiveType}          from '../../primitive/type-converters/type-converters'
import {IdentifierData}         from './identifier.data'

@customElement('fhir-identifier')
export class Identifier extends BaseElement<IdentifierData> {

  //TODO: this still needs some work. There are a lot of corner cases
  constructor() {super('Identifier')}

  public renderDisplay(config: DisplayConfig, data: Decorated<IdentifierData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="id" .value=${data.value} .context=${data.system} summary></fhir-primitive >
          <fhir-codeable-concept label="type" .data=${data.type} summary></fhir-codeable-concept >
          <fhir-period .data=${data.period} summary></fhir-period >
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<IdentifierData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="use" type=${PrimitiveType.code} .value=${data.use} summary></fhir-primitive >
          <fhir-codeable-concept label="type" .data=${data.type} summary></fhir-codeable-concept >
          <fhir-primitive label="system" type=${PrimitiveType.uri} .value=${data.system} summary></fhir-primitive >
          <fhir-primitive label="value" .value=${data.value} summary></fhir-primitive >
          <fhir-period label="period" .data=${data.period} summary></fhir-period >
          <fhir-reference label="assigner" .data=${data.assigner} summary></fhir-reference > `
    ]
  }
}
