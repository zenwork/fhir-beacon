import {html, nothing, TemplateResult}          from 'lit'
import {property, state}                        from 'lit/decorators.js'
import {choose}                                 from 'lit/directives/choose.js'
import {mustRender}                             from '../../../components/mustRender'
import {PrimitiveType}                          from '../../../components/primitive/type-converters'
import {asReadable}                             from '../../../components/primitive/type-presenters/asReadable'
import {hasSome}                                from '../../../shell/layout/directives'
import {hostStyles}                             from '../../../styles'
import {DisplayConfig, DisplayMode}             from '../../../types'
import {hasSameAncestor, toBaseElementModeEnum} from '../../../utilities'
import {DisplayContextConsumerController}       from '../../contexts/context-consumer-controller'
import {FhirDataElement}                        from '../data/fhir-data-element'
import {FhirElementData, NoDataSet}             from '../data/fhir-data-element.data'
import {Generators}                             from './fhir-presentable-element.data'
import {componentStyles}                        from './fhir-presentable-element.styles'

export abstract class FhirPresentableElement<T extends FhirElementData> extends FhirDataElement<T> {
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
   * A boolean variable used to indicate whether recursion is being guarded against. When displaying in verbose mode
   * certain FHIR datatypes go into a theoretical infinite recursion (ex: Reference -> Identifier -> Reference). In
   * reality, they would never point to each other but if expanding on all possible values this could happen
   *
   * @type {boolean}
   */
    // protected recursionGuard: boolean = false

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
   * add a rendering generator
   * @param name
   * @param generator
   */
  public addDisplayTemplateGenerator(name: string, generator: (data: T) => TemplateResult | TemplateResult[]) {
    this.templateGenerators.display[name] = generator
  }

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param data
   */
  protected abstract renderDisplay(data: T): TemplateResult | TemplateResult[];

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param data
   */
  protected abstract renderStructure(data: T): TemplateResult | TemplateResult[];

  /**
   * Empty default implementation. Implement this method when the template is identical in all modes
   * @param data
   * @protected
   */
  protected abstract renderAll(data: T): TemplateResult | TemplateResult[];

  /**
   * Rendering method for all elements
   * @protected
   */
  protected render(): TemplateResult | TemplateResult[] {
    if (this.verbose && this.data === NoDataSet) return html`
        <fhir-not-supported .label=${this.label} variant="no-data"></fhir-not-supported >`

    if (this.mode) {
      return html`${choose(this.mode,
                           [
                             [DisplayMode.display, () => this.shouldRenderDisplay()],
                             [DisplayMode.display_summary, () => this.shouldRenderDisplay()],
                             [DisplayMode.narrative, () => this.shouldRenderDisplay()],
                             [DisplayMode.structure, () => this.shouldRenderStructure()],
                             [DisplayMode.structure_summary, () => this.shouldRenderStructure()],
                             [DisplayMode.debug, () => this.renderDebug()]
                           ],
                           () => html`
                               <fhir-error text="Unable to render the element ${this.type} ${JSON.stringify(this.getDisplayConfig())}"></fhir-error >`
      )}`
    }

    return html``
  }

  protected getLabel = () => {
    let label = this.type

    if (this.key && !this.label) {
      label = this.key
    } else if (this.label) {
      label = this.label
    }

    if (this.mode != DisplayMode.display && this.mode != DisplayMode.display_summary) {
      label = asReadable(label, 'lower')
    }

    return label
  }

  /**
   * Overridable method reserved for internal use. Do not call super in this method
   * @param data
   * @protected
   */
  protected renderBaseElement(data: T): TemplateResult | TemplateResult[] {
    return html`
        <fhir-primitive label="id" .value=${data.id} .type=${PrimitiveType.id}></fhir-primitive >
        ${hasSome(data.extension)
          ? html`
                    <fhir-primitive label="extension" context="not implemented" .type=${PrimitiveType.none}></fhir-primitive >`
          : nothing}
    `
  }

  /**
   *
   * @private
   */
  protected summaryMode() {
    return this.mode && (this.mode === DisplayMode.display_summary || this.mode === DisplayMode.structure_summary)
  }

  private shouldRenderDisplay() {
    if (mustRender(this.convertedData, this.mode, this.verbose, this.summaryMode(), this.summary) || this.dataPath) {

      if (!this.convertedData) return html``

      return html` ${this.renderDisplay(this.convertedData)} `
    }
    return html``
  }

  private shouldRenderStructure() {
    if (mustRender(this.convertedData, this.mode, this.verbose, this.summaryMode(), this.summary) || this.dataPath) {

      if (this.convertedData || this.verboseRequestedAndAllowed()) {
        return this.wrapStructure()
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
    }
    return html``
  }

  private wrapStructure() {
    //console.log(this.type, this.key, this.mode, this.verbose, this.summaryMode(), this.summary)
    if (mustRender(this.convertedData, this.mode, this.verbose, this.summaryMode(), this.summary) || this.dataPath) {
      return html`
          <fhir-structure-wrapper
                  .label=${this.getLabel()}
                  .resourceId=${this.convertedData?.id ?? ''}
                  .fhirType=${asReadable(this.type)}
                  ?forceclose=${this.forceclose}
                  ?summary=${this.summary}
          >
              <div class="frontmatter">
                  ${this.convertedData ? this.renderGroup(this.convertedData, 'structure') : nothing}
              </div >

              ${this.renderStructure(this.convertedData ?? ({} as T))}
          </fhir-structure-wrapper >
      `
    }
    return html``
  }


  private renderGroup(data: T, group: 'structure' | 'display'): TemplateResult | TemplateResult[] {
    return [
      ...Object.values(this.templateGenerators[group])
               .map((gen) => gen(data))
               .flat()
    ]
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

  /**
   * Render formatted JSON data for debugging purposes
   * @protected
   */
  private renderDebug(): TemplateResult {
    if (this.data || this.verboseRequestedAndAllowed()) {
      return html`
          <article part="element">
              <header part="label">${this.getLabel()}</header >
              <section part="value">
                  <fhir-debug .data=${this.data}></fhir-debug >
              </section >
          </article >
      `
    }

    return html``
  }
}
