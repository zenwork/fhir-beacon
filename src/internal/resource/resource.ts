import {html, TemplateResult} from 'lit'
import {PrimitiveType}        from '../../components/primitive/type-converters'
import {BaseElementProvider}  from '../base/base-element-provider'
import {ResourceData}         from './domain-resource.data'

export abstract class Resource<T extends ResourceData> extends BaseElementProvider<T> {

  protected constructor(type: string) {
    super(type)
    this.addStructure('resource', (data: T) => this.renderResourceStructure(data))
  }

  private renderResourceStructure(data: T): TemplateResult | TemplateResult[] {
    return html`
      <fhir-meta label="meta" .data=${data.meta} ?forceclose=${true}></fhir-meta >
      <fhir-primitive label="implicitRules" .value=${data.implicitRules} .type=${PrimitiveType.uri}></fhir-primitive >
      <fhir-primitive label="language" .value=${data.language} .type=${PrimitiveType.code}></fhir-primitive >
    `
  }
}
