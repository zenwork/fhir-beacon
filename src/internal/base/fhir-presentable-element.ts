import {html, nothing, TemplateResult}          from 'lit'
import {property, state}                        from 'lit/decorators.js'
import {choose}                                 from 'lit/directives/choose.js'
import {PrimitiveType}                          from '../../components/primitive/type-converters'
import {asReadable}                             from '../../components/primitive/type-presenters/asReadable'
import {hasSome}                                from '../../shell'
import {hostStyles}                             from '../../styles'
import {DisplayConfig, DisplayMode}             from '../../types'
import {hasSameAncestor, toBaseElementModeEnum} from '../../utilities'
import {DisplayContextConsumerController}       from '../contexts/context-consumer-controller'
import {FhirDataElement}                        from './fhir-data-element'
import {FhirDataElementData}                    from './fhir-data-element.data'
import {Generators}                             from './fhir-presentable-element.data'
import {componentStyles}                        from './fhir-presentable-element.styles'

export abstract class FhirPresentableElement<T extends FhirDataElementData> extends FhirDataElement<T> {

  static styles = [hostStyles, componentStyles]

  @property({ reflect: true })
  public label: string = ''

  @property({ type: DisplayMode, converter: toBaseElementModeEnum, reflect: true })
  declare mode: DisplayMode

  @property({ type: Boolean, reflect: true })
  declare open: boolean

  @property({ type: Boolean, reflect: true })
  public forceclose: boolean = false

  @property({ type: Boolean, reflect: true })
  declare verbose: boolean

  @property({ type: Boolean, reflect: true })
  declare showerror: boolean

  @property({ type: Boolean, reflect: true })
  declare summary: boolean

  /**
   * A boolean variable used to indicate whether recursion is being guarded against. When displaying in verbose mode certain FHIR datatypes go into a
   * theoretical infinite recursion (ex: Reference -> Identifier -> Reference). In reality, they would never point to each other but if expanding on all
   * possible values this could happen
   *
   * @type {boolean}
   */
  protected recursionGuard: boolean = false

  @state()
  protected templateGenerators: Generators<T> = { structure: {}, display: {} }

  protected constructor(type: string) {
    super(type)
    // TODO: setting default mode should be reviewed as part of https://github.com/zenwork/fhir-beacon/issues/9
    this.mode = DisplayMode.display
    // consume display configuration provided by a context providing element
    new DisplayContextConsumerController(this)
    this.addStructureTemplateGenerator('base-element', (data: T) => this.renderBaseElement(data))
  }

  public getDisplayConfig(): DisplayConfig {
    return { open: this.open, verbose: this.verbose, mode: this.mode, showerror: this.showerror }
  }

  /**
   * add a rendering generator
   * @param name
   * @param generator
   */
  public addStructureTemplateGenerator(name: string, generator: (data: T) => TemplateResult | TemplateResult[]) {
    this.templateGenerators.structure[name] = generator
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

  /**
   * Empty default implementation. Implement this method when the template is identical in all modes
   * @param data
   * @protected
   */
  protected abstract renderAll(data: T): TemplateResult | TemplateResult[]

  /**
   * Rendering method for all elements
   * @protected
   */
  protected render(): TemplateResult | TemplateResult[] {
    if (this.mode) {
      return html`${choose(this.mode, [
          [DisplayMode.combined, () => this.renderCombinedWrapper()],
          [DisplayMode.display, () => this.renderDisplayWrapper()],
          [DisplayMode.display_summary, () => this.renderDisplayWrapper()],
          [DisplayMode.narrative, () => this.renderDisplayWrapper()],
          // [DisplayMode.override, () => this.renderTemplate()],
          [DisplayMode.structure, () => this.renderStructureWrapper()],
          [DisplayMode.structure_summary, () => this.renderStructureWrapper()],
          [DisplayMode.debug, () => this.renderDebug()]
        ],
        () => html`
          <fhir-error text="Unable to render the element ${this.type} ${JSON.stringify(this.getDisplayConfig())}"></fhir-error >`)}`
    }

    return html``

  }

  protected renderDisplayWrapper() {
    if (!this.convertedData) return html``
    if (!this.verbose) {
      return html` ${this.renderDisplay(this.convertedData)} `
    }

    // is verbose
    return html`
      <fhir-wrapper
        .label=${this.getElementLabel()}
        .fhirType=${this.getTypeLabel()}
      >
        ${this.renderDisplay(this.convertedData)}
      </fhir-wrapper >`
  }

  protected renderStructureWrapper() {

    if (this.convertedData || this.verboseRequestedAndAllowed()) {
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
    if (this.verboseRequestedAndNotAllowed()) {
      return html`
        <fhir-not-supported
          variant="stop"
          label=${this.label}
          error="If rendered, '${this.label}' would render recursively for ever due to the fhir model definition."
        ></fhir-not-supported >`
    }
    return html``
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
   * Render formatted JSON data for debugging purposes
   * @protected
   */
  protected renderDebug(): TemplateResult {
    if (this.data || this.verboseRequestedAndAllowed()) {
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

  protected getElementLabel = () => {
    return this.label ? this.label : asReadable(this.type)
  }

  protected getTypeLabel = () => {
    return asReadable(this.type)
  }

  /**
   * Overridable method reserved for internal use. Do not call super in this method
   * @param data
   * @protected
   */
  protected renderBaseElement(data: T): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="id" .value=${data.id} .type=${PrimitiveType.id}></fhir-primitive >
      ${hasSome(data.extension) ? html`
        <fhir-primitive label="extension" context="not implemented" .type=${PrimitiveType.none}></fhir-primitive >` : nothing}
    `
  }

  private renderGroup(data: T, group: 'structure' | 'display'): TemplateResult | TemplateResult[] {
    return [...Object.values(this.templateGenerators[group]).map(gen => gen(data)).flat()]
  }

  private verboseRequestedAndAllowed() {
    return this.verbose && !this.hasIdenticalAncestor(this)
  }

  private verboseRequestedAndNotAllowed() {
    return this.verbose && this.hasIdenticalAncestor(this)
  }

  private hasIdenticalAncestor(child: HTMLElement | null) {
    return hasSameAncestor(child)
  }
}
