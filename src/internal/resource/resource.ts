import {html, TemplateResult}                   from 'lit'
import {PrimitiveType}                          from '../../components/primitive/type-converters/type-converters'
import {BaseElement, ContextProviderController} from '../base'
import {ResourceData}                           from './domain-resource.data'

export abstract class Resource<T extends ResourceData> extends BaseElement<T> {

  private context: ContextProviderController<T>

  protected constructor(type: string) {
    super(type)
    this.context = new ContextProviderController(this)
    this.addStructureTemplateGenerator('resource', (data: T) => this.renderResourceStructure(data))
  }

  private renderResourceStructure(data: T): TemplateResult | TemplateResult[] {
    return html`
      <fhir-meta label="meta" .data=${data.meta} ?forceclose=${true} summary></fhir-meta >
      <fhir-primitive label="implicitRules" .value=${data.implicitRules} .type=${PrimitiveType.uri} summary></fhir-primitive >
      <fhir-primitive label="language" .value=${data.language} .type=${PrimitiveType.code}></fhir-primitive >
    `
  }
}
