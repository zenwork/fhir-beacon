import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {property, state}                               from 'lit/decorators.js'
import {choose}                                        from 'lit/directives/choose.js'
import {map}                                           from 'lit/directives/map.js'
import {hasSameAncestor}                               from '../.././utilities/hasSameAncestor'
import {PrimitiveType}                                 from '../../components/primitive/type-converters'

import {asReadable}                       from '../../components/primitive/type-presenters/asReadable'
import {hasSome}                          from '../../shell/layout/directives'
import {ShoelaceStyledElement}            from '../../shell/shoelace-styled-element'
import {hostStyles}                       from '../../styles/hostStyles'
import {countNodes}                       from '../../utilities/countNodes'
import {toBaseElementModeEnum}            from '../../utilities/toBaseElementModeEnum'
import {BaseElementData, BaseElementMode} from './base-element.data'
import '../../utilities/debug/debug'
import '../../shell/layout/wrapper/wrapper'
import '../../shell/layout/structure-wrapper/structure-wrapper'
import '../../components/primitive/primitive'
import {componentStyles}                  from './base-element.styles'

export abstract class BaseElement<T extends BaseElementData> extends ShoelaceStyledElement {

  static styles = [hostStyles, componentStyles]

  // TODO: might be better to use data-fhir and comply with the data-* standard. see: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
  @property({type: Object, attribute: 'data'})
  declare data: T

  @property({reflect: true})
  public label: string = ''

  @property({reflect: true})
  protected type: string = ''

  @property({ type: BaseElementMode, converter: toBaseElementModeEnum, reflect: true })
  public mode: BaseElementMode = BaseElementMode.display

  @property({type: Boolean, reflect: true})
  declare open: boolean

  @property({type: Boolean, reflect: true})
  public forceclose: boolean = false

  @property({type: Boolean, reflect: true})
  declare verbose: boolean

  @property({type: Boolean, reflect: true})
  declare showerror: boolean

  @property({ type: Boolean, reflect: true })
  declare summary: boolean

  @property({ type: String, reflect: true, attribute: 'override-template' })
  declare overrideTemplate: string

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

  @state()
  private structureGenerators: { [key: string]: (data: T) => TemplateResult | TemplateResult[] } = {}

  @state()
  private displayGenerators: { [key: string]: (data: T) => TemplateResult | TemplateResult[] } = {}

  constructor(type: string) {
    super()
    this.type = type
    this.addStructure('base-element', (data: T) => this.renderBaseElement(data))

  }

  /**
   * add a rendering generator
   * @param name
   * @param generator
   */
  addStructure(name: string, generator: (data: T) => TemplateResult | TemplateResult[]) {
    this.structureGenerators[name] = generator
  }

  /**
   * Rendering method for all elements
   * @protected
   */
  protected render(): TemplateResult | TemplateResult[] {
    if (!this.overrideTemplate && ((this.summary && this.summaryMode()) || (!this.summaryMode()))) {
      const display = () => {

        if (!this.convertedData) return html``
        if (!this.isVerbose()) return html`${this.renderDisplay(this.convertedData)}`

        // is verbose
        return html`
          <fhir-wrapper
              .label=${this.getElementLabel()}
              .fhirType=${this.getTypeLabel()}
          >
            ${this.renderDisplay(this.convertedData)}
          </fhir-wrapper >`
      }

      const summary = () => {
        return html`
          <fhir-not-supported description="not implemented yet"></fhir-not-supported >`
      }

      const structure = () => {
        if (this.convertedData || this.isVerbose()) {
          return html`
            <fhir-structure-wrapper
                .label=${this.getElementLabel()}
                .resourceId=${this.convertedData?.id ?? ''}
                .fhirType=${this.getTypeLabel()}
                ?forceclose=${this.forceclose}
                ?summary=${this.summary}
            >
              <div class="frontmatter">
                ${map(Object.values(this.structureGenerators), generator => generator(this.convertedData ?? {} as T))}
              </div >

              ${this.renderStructure(this.convertedData ?? {} as T)}
            </fhir-structure-wrapper >
          `
        }

        // stop rendering in verbose mode due to theoretically infinite models. ex: Identifier -> Reference -> Identifier -> and so on!
        if (this.recursionGuard) {
          return html`
            <fhir-primitive
                .type=${PrimitiveType.forced_error}
                label=${this.label}
                value="[(${this.type}) not rendered due to recursion guard]"
                ?showerror=${this.showerror}
            ></fhir-primitive >`
        }

        return html``

      }

      const combined = () => this.convertedData ?
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

      const debug = () => this.renderDebug(this.data)

      return html`${choose(this.mode, [
          [BaseElementMode.combined, combined],
          [BaseElementMode.display, display],
          [BaseElementMode.display_summary, display],
          [BaseElementMode.narrative, display],
          [BaseElementMode.structure, structure],
          [BaseElementMode.structure_summary, structure],
          [BaseElementMode.debug, debug]
        ],
        () => html`<h2 >Error: Unable to render the element</h2 >`)}`
    } else {
      return html``
    }
  }

  /**
   * handle data updates
   * @param _changedProperties
   * @protected
   */
  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)

    if (_changedProperties.has('overrideTemplate')) {
      let elem= document.getElementById(this.overrideTemplate) as HTMLTemplateElement | null
      if (elem && elem.content) {
        const template = elem.content
        if (this.shadowRoot && template) {
          this.shadowRoot.appendChild(template.cloneNode(true))
        }
      }
    } else if (_changedProperties.has('data')) {
      this.totalDataNodes = countNodes(this.data)
      this.convertedData = this.convertData(this.data)
    }

    if (_changedProperties.has('verbose') && this.verbose) {
      if (!this.verboseAllowed()) this.recursionGuard = true
    } else {
      this.recursionGuard = false
    }
  }

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should contribute generators instead.
   * @param data
   */
  protected abstract renderDisplay(data: T): TemplateResult | TemplateResult[]

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should contribute generators instead.
   * @param data
   */
  protected abstract renderStructure(data: T): TemplateResult | TemplateResult[]

  /**
   * Render formatted JSON data for debugging purposes
   * @param data
   * @protected
   */
  protected renderDebug(data: T): TemplateResult {
    if (this.data || this.isVerbose()) {
      return html`
          <article part="element">
              <header part="label">${(this.getElementLabel())}</header>
              <section part="value">
                <fhir-debug .data=${data}></fhir-debug >
              </section>
          </article>
      `
    }

    return html``
  }

  /**
   * Overridable method reserved for internal use. Do not call super in this method
   * @param data
   * @protected
   */
  private renderBaseElement(data: T): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="id" .value=${data.id} .type=${PrimitiveType.id}></fhir-primitive >
      ${hasSome(data.extension) ? html`
        <fhir-primitive label="extension" context="not implemented" .type=${PrimitiveType.none}></fhir-primitive >` : nothing}
    `
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


  private summaryMode() {
    return this.mode === BaseElementMode.display_summary || this.mode === BaseElementMode.structure_summary
  }
}
