import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {property, state}                               from 'lit/decorators.js'
import {choose}                                        from 'lit/directives/choose.js'
import {BaseData}                                      from './BaseData'
import './util/Debug'
import './util/StructureWrapper'
import './data/primitive/Primitve'
import {PrimitiveType}                                 from './data/primitive/converters'
import {FhirElement}                                   from './data/primitive/FhirElement'
import {asReadable}                                    from './data/primitive/presenters/asReadable'
import {hasSameAncestor}                               from './util/hasSameAncestor'

export enum BaseElementMode {
  display = 'display',
  structure = 'structure',
  combined = 'combined',
  narrative = 'narrative'
}


export abstract class BaseElement<T extends BaseData> extends FhirElement {

  @property({type: Object, attribute: 'data'})
  declare data: T
  @property({type: BaseElementMode, converter})
  public mode: BaseElementMode = BaseElementMode.display

  @property({reflect: true})
  public label: string = ''
  @property({type: Boolean})
  declare open: boolean

  @property({type: Boolean, reflect: true})
  public verbose: boolean = false

  @property({type: Boolean})
  declare showError: boolean
  @property({reflect: true})
  protected type: string = ''

  @state()
  private convertedData: T | null = null
  /**
   * A boolean variable used to indicate whether recursion is being guarded against. When displaying in verbose mode certain FHIR datatypes go into a
   * theoretical infinite recursion (ex: Reference -> Identifier -> Reference). In reality they would never point to each other but if expanding on all
   * possible values this could happen
   *
   * @type {boolean}
   */
  private recursionGuard: boolean = false

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

    let structure = () => {

      if (this.data || this.isVerbose()) {
        return html`
          <fhir-structure-wrapper
              .label=${this.getElementLabel()}
              .fhirType=${this.getTypeLabel()}
              .open=${this.open}
          >
            ${(this.convertedData || this.isVerbose()) ? this.renderStructure(this.convertedData ? this.convertedData : {}) : nothing}
          </fhir-structure-wrapper>`
      }

      if (this.recursionGuard) {
        return html`
          <fhir-primitive
              .type=${PrimitiveType.forced_error}
              label=${this.label}
              value="[(${this.type}) not rendered due to recursion guard]"
              .showError=${true}
          ></fhir-primitive>`
      }
      console.log('nothing')
      return html``

    }
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
    return this.verbose && !this.findSameAncestor(this)

  }

  protected getElementLabel = () => {
    if (this.mode == BaseElementMode.display) {
      return ''
    }
    return this.label ? this.label : asReadable(this.type)

  }

  protected getTypeLabel = () => {
    if (this.mode == BaseElementMode.display) {
      return ''
    }
    return asReadable(this.type)

  }


  protected convertData(data: T): T {
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
