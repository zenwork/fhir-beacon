import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {property, state}                               from 'lit/decorators.js'
import {choose}                                        from 'lit/directives/choose.js'
import {map}                                           from 'lit/directives/map.js'
import {hasSameAncestor}                               from '../.././utilities/hasSameAncestor'
import {PrimitiveType}                                 from '../../components/primitive/type-converters'

import {asReadable}                   from '../../components/primitive/type-presenters/asReadable'
import {hasSome}                      from '../../shell/layout/directives'
import {ShoelaceStyledElement}        from '../../shell/shoelace-styled-element'
import {hostStyles}                   from '../../styles/hostStyles'
import {countNodes}                   from '../../utilities/countNodes'
import {toBaseElementModeEnum}        from '../../utilities/toBaseElementModeEnum'
import {BaseElementData, DisplayMode} from './base-element.data'
import '../../utilities/debug/debug'
import '../../shell/layout/wrapper/wrapper'
import '../../shell/layout/structure-wrapper/structure-wrapper'
import '../../components/primitive/primitive'
import {componentStyles}              from './base-element.styles'

type GeneratorGroup<T> = { [key: string]: (data: T) => TemplateResult | TemplateResult[] }
type Generators<T> = { structure: GeneratorGroup<T>, display: GeneratorGroup<T> }

export type ValidationError = { id: string, err: string }
export abstract class BaseElement<T extends BaseElementData> extends ShoelaceStyledElement {

  static styles = [hostStyles, componentStyles]

  // TODO: might be better to use data-fhir and comply with the data-* standard. see: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
  @property({ type: Object, attribute: 'data' })
  declare data: T

  @property({ reflect: true })
  public label: string = ''
  @property({ type: DisplayMode, converter: toBaseElementModeEnum, reflect: true })
  public mode: DisplayMode = DisplayMode.display
  @property({ type: Boolean, reflect: true })
  declare open: boolean
  @property({ type: Boolean, reflect: true })
  public forceclose: boolean = false
  @property({ type: Boolean, reflect: true })
  declare verbose: boolean
  @property({ type: Boolean, reflect: true })
  declare showerror: boolean
  @property({ reflect: true })
  protected type: string = ''

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
   * theoretical infinite recursion (ex: Reference -> Identifier -> Reference). In reality, they would never point to each other but if expanding on all
   * possible values this could happen
   *
   * @type {boolean}
   */
  protected recursionGuard: boolean = false

  @state()
  private templateGenerators: Generators<T> = { structure: {}, display: {} }

  public errors: ValidationErrors = []

  constructor(type: string) {
    super()
    this.type = type
    this.addStructureTempateGenerator('base-element', (data: T) => this.renderBaseElement(data))
  }

  /**
   * Rendering method for all elements
   * @protected
   */
  protected render(): TemplateResult | TemplateResult[] {
    // console.log('render loop', this.type, this.mode)
    return html`${choose(this.mode, [
        [DisplayMode.combined, () => this.renderCombinedWrapper()],
        [DisplayMode.display, () => this.renderDisplayWrapper()],
        [DisplayMode.display_summary, () => this.renderDisplayWrapper()],
        [DisplayMode.narrative, () => this.renderDisplayWrapper()],
        [DisplayMode.override, () => this.renderTemplate()],
        [DisplayMode.structure, () => this.renderStructureWrapper()],
        [DisplayMode.structure_summary, () => this.renderStructureWrapper()],
        [DisplayMode.debug, () => this.renderDebug()]
      ],
      () => html`<h2 >Error: Unable to render the element</h2 >`)}`

  }

  /**
   * add a rendering generator
   * @param name
   * @param generator
   */
  protected addStructureTempateGenerator(name: string, generator: (data: T) => TemplateResult | TemplateResult[]) {
    this.templateGenerators.structure[name] = generator
  }

  protected renderStructureWrapper() {
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
            ${this.convertedData ? this.renderGroup(this.convertedData, 'structure') : nothing}
          </div >

          ${this.renderStructure(this.convertedData ?? {} as T)}
        </fhir-structure-wrapper >
      `
    }

    // stop rendering in verbose mode due to theoretically infinite models.
    // ex: Identifier -> Reference -> Identifier -> and so on!
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

  protected renderDisplayWrapper() {
    if (!this.convertedData) return html``
    if (!this.isVerbose()) return html`
      ${this.renderDisplay(this.convertedData)}
    `

    // is verbose
    return html`
      <fhir-wrapper
        .label=${this.getElementLabel()}
        .fhirType=${this.getTypeLabel()}
      >
        ${this.renderDisplay(this.convertedData)}
      </fhir-wrapper >`
  }

  protected renderOverrideWrapper() {
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

  protected renderCombinedWrapper() {
    return this.convertedData ?
           html`
             <fhir-shell
               .mode=${DisplayMode.display}
               ?showerror=${this.showerror}
               ?verbose=${this.verbose}
               ?open=${this.open}
             >
               ${this.renderDisplayWrapper()}
             </fhir-shell >
             <hr style="color: var(--sl-color-primary-100); margin-top: var(--sl-spacing-small);margin-bottom: var(--sl-spacing-large)">
             <fhir-shell
               .mode=${DisplayMode.structure}
               ?showerror=${this.showerror}
               ?verbose=${this.verbose}
               ?open=${this.open}
             >
               ${this.renderStructureWrapper()}
             </fhir-shell >
           ` :
           html``
  }

  /**
   * handle data updates
   * @param _changedProperties
   * @protected
   */
  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)

    if (_changedProperties.has('overrideTemplate')) {
      this.mode = DisplayMode.override
    } else if (_changedProperties.has('data')) {
      this.totalDataNodes = countNodes(this.data)
      const validationErrors = this.validate(this.data)
      this.errors.push(...validationErrors)
      this.convertedData = this.convertData(this.data)
    }

    if (_changedProperties.has('verbose') && this.verbose) {
      if (!this.verboseAllowed()) this.recursionGuard = true
    } else {
      this.recursionGuard = false
    }
  }

  /**
   * Render formatted JSON data for debugging purposes
   * @protected
   */
  protected renderDebug(): TemplateResult {
    if (this.data || this.isVerbose()) {
      return html`
        <article part="element">
          <header part="label">${(this.getElementLabel())}</header >
          <section part="value">
            <fhir-debug .data=${this.data}></fhir-debug >
          </section >
        </article >
      `
    }

    return html``
  }

  private renderValidationErrors(): TemplateResult {

    if (this.showerror && this.errors.length > 0) {
      return html`
        <fhir-wrapper label="Validation Issues" variant="validation-error">
          ${map(this.errors, e => html`<p >${e.id} - ${e.err}</p >`)}
        </fhir-wrapper >
      `

    }
    return html``
  }

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should contribute templateGenerators instead.
   * @param data
   */
  protected abstract renderDisplay(data: T): TemplateResult | TemplateResult[]

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should contribute templateGenerators instead.
   * @param data
   */
  protected abstract renderStructure(data: T): TemplateResult | TemplateResult[]

  private renderTemplate(): TemplateResult {
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
    return html``
  }

  private renderGroup(data: T, group: 'structure' | 'display'): TemplateResult | TemplateResult[] {
    return [...Object.values(this.templateGenerators[group]).map(gen => gen(data)).flat()]
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


  // TODO: should be renamed to something like `prepare`.
  // TODO: providing T and returning T does not make sense. Something needs to be better designed to support converting of data to other types.
  // TODO: something is needed to store complex errors that depend on multiple prop validation. Maybe should be in a separate method.
  protected convertData(data: T): T {
    return data as T
  }

  /**
   * validate data to find complex errors not covered by primitive types. Errors can be accessed through `this.errors`. it is recommended to call
   * `super.validate(T)` as well.
   * @param data data to validate
   * @return errors found
   * @protected
   */
  protected validate(data: T): ValidationErrors {
    // override to do custom validation
    return []
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
    return this.mode === DisplayMode.display_summary || this.mode === DisplayMode.structure_summary
  }
}

export type ValidationErrors = ValidationError[]
