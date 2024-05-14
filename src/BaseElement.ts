import {html, LitElement, nothing, PropertyValues, TemplateResult} from 'lit'
import {property, state}                                           from 'lit/decorators.js'
import {choose}                                                    from 'lit/directives/choose.js'
import {BaseData}                                                  from './BaseData'
import './util/Debug'
import './util/StructureWrapper'

export enum BaseElementMode {
  display = 'display',
  structure = 'structure',
  combined = 'combined',
  narrative = 'narrative'
}

export abstract class BaseElement<T extends BaseData> extends LitElement {

  @property({reflect: true})
  protected label: string = ''

  @property({type: BaseElementMode, converter})
  public mode: BaseElementMode = BaseElementMode.display

  @property({type: Boolean})
  declare showError: boolean

  @property({type: Object, attribute: 'data'})
  declare data: BaseData & { [key: string]: any }

  @state()
  private convertedData: T | null = null

  constructor(label: string) {
    super()
    this.label = label
  }


  protected willUpdate(_changedProperties: PropertyValues) {
    if (_changedProperties.has('data')) {
      this.convertedData = this.convertData(this.data)
    }
  }

  protected render(): TemplateResult | TemplateResult[] {

    let display = () => this.convertedData ? this.renderDisplay(this.convertedData) : nothing
    let structure = () => html`
        <fhir-structure-wrapper .label=${this.label}>
            ${this.convertedData ? this.renderStructure(this.convertedData) : nothing}
        </fhir-structure-wrapper>`
    let combined = () => this.convertedData ? html`${[display(), structure()]}` : nothing

    return html`${choose(this.mode, [
        [BaseElementMode.display, display],
        [BaseElementMode.structure, structure],
        [BaseElementMode.combined, combined],
      ],
      () => html`<h1>Error</h1>`)}`
  }

  /**
   * Empty implementation that should be overriden to render the displayable values in the data.
   *
   * @protected
   * @returns {TemplateResult} The rendered template result.
   */
  protected renderDisplay(data: T): TemplateResult | TemplateResult[] {
    if (this.data) {
      return html`
          <article part="element">
              <header part="label">${this.label}</header>
              <section part="value">n/a</section>
          </article>
      `
    }
    return html``
  }

  protected renderStructure(data: T): TemplateResult | TemplateResult[] {
    if (this.data) {
      console.log('base element:', 'render structure', this.label, this.data)
      return html`
          <article part="element">
              <header part="label">${this.label}</header>
              <section part="value">
                  <bkn-debug .data=${data}></bkn-debug>
              </section>
          </article>
      `
    }

    return html``
  }


  protected convertData(data: BaseData & { [key: string]: any }): T {
    return data as T
  }

}

function converter(value: string | null): BaseElementMode {
  return value ? <BaseElementMode>value : BaseElementMode.display
}
