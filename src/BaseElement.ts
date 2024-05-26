import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {property, state}                               from 'lit/decorators.js'
import {choose}                                        from 'lit/directives/choose.js'
import {BaseData}                                      from './BaseData'
import './util/Debug'
import './util/StructureWrapper'
import './data/primitive/Primitive'
import {BaseElementMode}                               from './BaseElementMode'
import {PrimitiveType}                                 from './data/primitive/converters'

import {asReadable}      from './data/primitive/presenters/asReadable'
import {FhirElement}     from './FhirElement'
import {hasSameAncestor} from './util/hasSameAncestor'

export abstract class BaseElement<T extends BaseData> extends FhirElement {

  // TODO: might be better to use data-fhir and comply with the data-* standard. see: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
  @property({type: Object, attribute: 'data'})
  declare data: T

  @property({reflect: true})
  public label: string = ''

  @property({reflect: true})
  protected type: string = ''

  @property({type: BaseElementMode, converter})
  public mode: BaseElementMode = BaseElementMode.display

  @property({type: Boolean, reflect: true})
  declare open: boolean

  @property({type: Boolean, reflect: true})
  declare verbose: boolean

  @property({type: Boolean, reflect: true})
  declare showerror: boolean

  @state()
  private convertedData: T | null = null

  /**
   * A boolean variable used to indicate whether recursion is being guarded against. When displaying in verbose mode certain FHIR datatypes go into a
   * theoretical infinite recursion (ex: Reference -> Identifier -> Reference). In reality they would never point to each other but if expanding on all
   * possible values this could happen
   *
   * @type {boolean}
   */
  protected recursionGuard: boolean = false

  constructor(type: string) {
    super()
    this.type = type

  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)

    if (_changedProperties.has('data')) {
      this.convertedData = this.convertData(this.data)
    }

    if (_changedProperties.has('verbose') && this.verbose) {
      if (!this.verboseAllowed()) this.recursionGuard = true
    } else {
      this.recursionGuard = false
    }
  }

  protected render(): TemplateResult | TemplateResult[] {
    let display = () => {
      if (this.convertedData) {
        if (this.isVerbose()) {
          return html`
            <fhir-wrapper
                .label=${this.getElementLabel()}
                .fhirType=${this.getTypeLabel()}
                ?open=${this.open}
            >
              ${this.renderDisplay(this.convertedData)}
            </fhir-wrapper>`
        } else {
          return html`${this.renderDisplay(this.convertedData)}`
        }
      } else {
        return html``
      }
    }

    let structure = () => {

      if (this.convertedData || this.isVerbose()) {
        return html`
          <fhir-structure-wrapper
              .label=${this.getElementLabel()}
              .fhirType=${this.getTypeLabel()}
          >
            ${(this.convertedData || this.isVerbose()) ? this.renderStructure(this.convertedData ? this.convertedData : {} as T) : nothing}
          </fhir-structure-wrapper >
        `
      }

      if (this.recursionGuard) {
        return html`
          <fhir-primitive
              .type=${PrimitiveType.forced_error}
              label=${this.label}
              value="[(${this.type}) not rendered due to recursion guard]"
              ?showerror=${this.showerror}
          ></fhir-primitive>`
      }

      return html``

    }

    let combined = () => this.convertedData ? html`${[display(), structure()]}` : html``


    return html`${choose(this.mode, [
        [BaseElementMode.display, display],
        [BaseElementMode.structure, structure],
        [BaseElementMode.structure_trace, structure],
        [BaseElementMode.combined, combined],
        [BaseElementMode.narrative, display]
      ],
      () => html`<h2>Error: Unable to render the element</h2>`)}`

  }

  /**
   * Empty implementation that should be overriden to render the displayable values in the data.
   *
   * @protected
   * @returns {TemplateResult} The rendered template result.
   */
  protected renderDisplay(data: T): TemplateResult | TemplateResult[] {
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

  protected renderStructure(data: T): TemplateResult | TemplateResult[] {
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
    return this.label ? this.label : asReadable(this.type)

  }

  protected getTypeLabel = () => {
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

export function converter(value: string | null): BaseElementMode {
  return value ? <BaseElementMode>value : BaseElementMode.display
}
