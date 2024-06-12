import {html, TemplateResult} from 'lit'
import {PrimitiveType}        from '../../components/primitive/type-converters'
import {BaseElementContextProvider}  from '../base/base-element-context-provider'
import {ResourceData}         from './domain-resource.data'

export abstract class Resource<T extends ResourceData> extends BaseElementContextProvider<T> {

  protected constructor(type: string) {
    super(type)
    this.addStructure('resource', (data: T) => this.renderResourceStructure(data))
  }

  private renderResourceStructure(data: T): TemplateResult | TemplateResult[] {
    return html`
      <fhir-meta label="meta" .data=${data.meta} ?forceclose=${true} summary></fhir-meta >
      <fhir-primitive label="implicitRules" .value=${data.implicitRules} .type=${PrimitiveType.uri} summary></fhir-primitive >
      <fhir-primitive label="language" .value=${data.language} .type=${PrimitiveType.code}></fhir-primitive >
    `
  }
}
