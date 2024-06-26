import {html, PropertyValues, TemplateResult} from 'lit'
import {property, state}                      from 'lit/decorators.js'
import {choose}                               from 'lit/directives/choose.js'
import {hasSameAncestor}                      from '../.././utilities/hasSameAncestor'
import {PrimitiveType}                        from '../../components/primitive/type-converters'

import {asReadable}                       from '../../components/primitive/type-presenters/asReadable'
import {ShoelaceStyledElement}            from '../../shell/shoelace-styled-element'
import {BaseElementData, BaseElementMode} from './base-element.data'
import '../../utilities/debug/debug'
import '../../shell/layout/wrapper/wrapper'
import '../../shell/layout/structure-wrapper/structure-wrapper'
import '../../components/primitive/primitive'

export abstract class BaseElement<T extends BaseElementData> extends ShoelaceStyledElement {

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

  @state()
  protected totalDataNodes: number = 0

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
      this.totalDataNodes = countNodes(this.data)
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

      if (!this.convertedData) return html``
      if (!this.isVerbose()) return html`${this.renderDisplay(this.convertedData)}`

      // is verbose
      return html`
            <fhir-wrapper
                .label=${this.getElementLabel()}
                .fhirType=${this.getTypeLabel()}
            >
              ${this.renderDisplay(this.convertedData)}
            </fhir-wrapper>`

    }

    let structure = () => {

      if (this.convertedData || this.isVerbose()) {
        return html`
          <fhir-structure-wrapper
              .label=${this.getElementLabel()}
              .resourceId=${this.data.id ?? ''}
              .fhirType=${this.getTypeLabel()}
          >
            ${this.renderStructure(this.convertedData ?? {} as T)}
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

    let combined = () => this.convertedData ?
                         html`
                           <fhir-shell .mode=${BaseElementMode.display} ?showerror=${this.showerror} ?verbose=${this.verbose} ?open=${this.open}>
                             ${display()}
                           </fhir-shell >
                           <hr style="color: var(--sl-color-primary-100); margin-top: var(--sl-spacing-small);margin-bottom: var(--sl-spacing-large)">
                           <fhir-shell .mode=${BaseElementMode.structure} ?showerror=${this.showerror} ?verbose=${this.verbose} ?open=${this.open}>
                             ${structure()}
                           </fhir-shell >
                         ` :
                         html``


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

function countNodes(jsonData: any) {
  let count = 0
  if (typeof jsonData === 'object' && jsonData !== null) {
    for (let key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        ++count
        count += countNodes(jsonData[key])
      }
    }
  }
  return count
}
