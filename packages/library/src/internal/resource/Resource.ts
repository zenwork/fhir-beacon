import {html, PropertyValues, TemplateResult} from 'lit'
import {property}                             from 'lit/decorators.js'
import {PrimitiveType}                        from '../../components/primitive/type-converters/type-converters'
import {DisplayConfig, DisplayMode}           from '../../types'
import {Decorated, meta}                      from '../base'
import {BaseElement}                          from '../BaseElement'
import {ContextProviderController}            from '../contexts'
import {ResourceData}                         from './domain-resource.data'



export abstract class Resource<T extends ResourceData> extends BaseElement<T> {

  @property({ type: String, reflect: true, attribute: 'override-template' })
  declare overrideTemplate: string

  protected constructor(type: string) {
    super(type)
    this.summary = true
    new ContextProviderController<T, Resource<T>>(this)
  }

  public override(): boolean {
    if (this.overrideTemplate) {
      this.mode = DisplayMode.override
    }
    return !!this.overrideTemplate && this.mode === DisplayMode.override
  }

  public renderOverride(): TemplateResult[] {
    if (this.shadowRoot) {
      const templateElement = document.getElementById(this.overrideTemplate) as HTMLTemplateElement | null
      if (templateElement && templateElement.content) {
        const content = templateElement.content
        if (content) {
          //TODO: investigate if this should be rendered with a lit html template
          this.shadowRoot.appendChild(content.cloneNode(true))
        }
      }
    }
    this.requestUpdate()
    return [html``]

  }


  protected willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes)
    this.templateGenerators.structure.header.push(this.renderResourceStructure)
  }

  protected render(): TemplateResult | TemplateResult[] {
    if (this.verbose) {
      if (this.extendedData[meta].hide) {
        return this.renderNoData()
      }
    }
    return super.render()
  }

  private renderResourceStructure(config: DisplayConfig, data: Decorated<T>): TemplateResult[] {
    return [
      html`
          <fhir-meta label="meta" .data=${data.meta} .open=${false} summary></fhir-meta>
          <fhir-primitive label="implicitRules" .value=${data.implicitRules} .type=${PrimitiveType.uri} summary></fhir-primitive >
          <fhir-primitive label="language" .value=${data.language} .type=${PrimitiveType.code}></fhir-primitive >
      `
    ]
  }

  private renderNoData(): TemplateResult[] {
    return [
      html`
          <fhir-not-supported variant='no-data'></fhir-not-supported >
      `
    ]

  }

}
