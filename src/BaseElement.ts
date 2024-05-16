import {html, LitElement, nothing, PropertyValues, TemplateResult} from 'lit'
import {property, state}                                           from 'lit/decorators.js'
import {choose}                                                    from 'lit/directives/choose.js'
import {BaseData}                                                  from './BaseData'
import './util/Debug'
import './util/StructureWrapper'
import './data/primitive/Primitve'
import {PrimitiveType}                                             from './data/primitive/converters'
import {hasSameAncestor}                                           from './util/hasSameAncestor'

export enum BaseElementMode {
  display = 'display',
  structure = 'structure',
  combined = 'combined',
  narrative = 'narrative'
}

export abstract class BaseElement<T extends BaseData> extends LitElement {

  @property({reflect: true})
  public label: string = ''

  @property({type: Boolean, reflect: true})
  public verbose: boolean = false

  @property({type: BaseElementMode, converter})
  public mode: BaseElementMode = BaseElementMode.display

  @property({type: Boolean})
  declare showError: boolean

  @property({type: Object, attribute: 'data'})
  declare data: BaseData & { [key: string]: any }

  @property({reflect: true})
  protected type: string = ''

  @state()
  private convertedData: T | null = null

  private recursionGuard = false

  constructor(type: string) {
    super()
    this.type = type
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    if (_changedProperties.has('verbose') && this.verbose) {
      if (!this.verboseAllowed()) this.recursionGuard = true
    } else {
      this.recursionGuard = false
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has('data')) {
      this.convertedData = this.convertData(this.data)
    }
  }

  protected render(): TemplateResult | TemplateResult[] {

    let display = () => this.convertedData ? this.renderDisplay(this.convertedData ? this.convertedData : {}) : nothing
    let structure = () => (this.data || this.isVerbose()) ? html`
        <fhir-structure-wrapper .label=${this.getElementLabel()}>
            ${(this.convertedData || this.isVerbose()) ? this.renderStructure(this.convertedData ? this.convertedData : {}) : nothing}
        </fhir-structure-wrapper>` : this.recursionGuard ? html`
        <fhir-primitive .type=${PrimitiveType.forced_error} label=${this.label} value="[(${this.type}) not rendered due to recursion guard]"
                        .showError=${true}></fhir-primitive>` : html``
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
  protected renderDisplay(data: T | {}): TemplateResult | TemplateResult[] {
    if (this.data || this.isVerbose()) {
      return html`
          <article part="element">
              <header part="label">${(this.getElementLabel())}</header>
              <section part="value">n/a</section>
          </article>
      `
    }
    return html``
  }

  protected renderStructure(data: T | {}): TemplateResult | TemplateResult[] {
    if (this.data || this.isVerbose()) {
      return html`
          <article part="element">
              <header part="label">${(this.getElementLabel())}</header>
              <section part="value">
                  <bkn-debug .data=${data}></bkn-debug>
              </section>
          </article>
      `
    }

    return html``
  }

  protected verboseAllowed() {
    if (this.verbose && !this.findSameAncestor(this)) return true
    return false
  }

  protected getElementLabel = () => {
    return this.label ? this.label + ' (' + this.type + ')' : this.type
  }


  protected convertData(data: BaseData & { [key: string]: any }): T {
    return data as T
  }

  private isVerbose = () => {
    return this.verbose && !this.recursionGuard
  }

  private findSameAncestor(child: HTMLElement | null) {
    if (hasSameAncestor(child)) {
      this.recursionGuard = true
      return true
    }
    return false
  }


}
function converter(value: string | null): BaseElementMode {
  return value ? <BaseElementMode>value : BaseElementMode.display
}
