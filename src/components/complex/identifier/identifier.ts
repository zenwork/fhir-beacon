import {html, TemplateResult}       from 'lit'
import {customElement}              from 'lit/decorators.js'
import {BaseElementContextConsumer} from '../../../internal/base/base-element-context-consumer'
import {PrimitiveType}              from '../../primitive/type-converters'
import {IdentifierData}             from './identifier.data'

import '../codeable-concept/codeable-concept'
import '../period/period'
import '../../../shell/layout/wrapper/wrapper'

@customElement('fhir-identifier')
export class Identifier extends BaseElementContextConsumer<IdentifierData> {

  //TODO: this still needs some work. There are a lot of corner cases
  constructor() {super('Identifier')}

  protected renderDisplay(data: IdentifierData): TemplateResult {
    return html`
      <fhir-primitive label="id" .value=${data.value} .context=${data.system} summary></fhir-primitive >
      <fhir-codeable-concept label="type" .data=${data.type} summary></fhir-codeable-concept >
      <fhir-period .data=${data.period} summary></fhir-period >
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
      <fhir-primitive label="use" type=${PrimitiveType.code} .value=${data.use} summary></fhir-primitive >
      <fhir-codeable-concept label="type" .data=${data.type} summary></fhir-codeable-concept >
      <fhir-primitive label="system" type=${PrimitiveType.uri} .value=${data.system} summary></fhir-primitive >
      <fhir-primitive label="value" .value=${data.value} summary></fhir-primitive >
      <fhir-period label="period" .data=${data.period} summary></fhir-period >
      <fhir-reference label="assigner" .data=${data.assigner} summary></fhir-reference > `
  }
}
