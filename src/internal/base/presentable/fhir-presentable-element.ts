/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, nothing, PropertyValues, TemplateResult}                      from 'lit'
import {property, state}                                                    from 'lit/decorators.js'
import {mustRender}                                                         from '../../../components/mustRender'
import {
  PrimitiveType
}                                                                           from '../../../components/primitive/type-converters'
import {
  asReadable
}                                                                           from '../../../components/primitive/type-presenters/asReadable'
import {hasSome}                                                            from '../../../shell/layout/directives'
import {hostStyles}                                                         from '../../../styles'
import {DisplayConfig, DisplayMode}                                         from '../../../types'
import {hasSameAncestor, toBaseElementModeEnum}                             from '../../../utilities'
import {
  DisplayContextConsumerController
}                                                                           from '../../contexts/context-consumer-controller'
import {Decorated, FhirDataElement, FhirElementData, ValidationErrors}      from '../data'
import {EmptyResult, Generators, GenKey, NullGenerators, TemplateGenerator} from './fhir-presentable-element.data'
import {componentStyles}                                                    from './fhir-presentable-element.styles'
import {PresentableElement}                                                 from './presentable-element'


export abstract class FhirPresentableElement<T extends FhirElementData> extends FhirDataElement<T>
  implements PresentableElement<T> {
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

  @state()
  protected templateGenerators: Generators<T> = NullGenerators()

  protected constructor(type: string) {
    super(type)

    // TODO: setting default mode should be reviewed as part of https://github.com/zenwork/fhir-beacon/issues/9
    this.mode = DisplayMode.display

    // consume display configuration provided by a context providing element
    new DisplayContextConsumerController(this)
    this.templateGenerators.structure.header.push(this.renderBaseElement)
  }

  public getDisplayConfig(): DisplayConfig {
    return { open: this.open, verbose: this.verbose, mode: this.mode, showerror: this.showerror }
  }

  /**
   * add a rendering generator
   * @param name
   * @param generator
   */
  public addStructureTemplateGenerator(name: GenKey, generator: TemplateGenerator<T>) {
    this.templateGenerators.structure[name].push(generator)
  }

  public canRender(): boolean {
    return mustRender(this.extendedData, this.mode, this.verbose, this.summaryMode(), this.summary) || !!this.dataPath
  }

  public abstract willRender(displayConfig: DisplayConfig,
                             extendedData: Decorated<T> | null,
                             changes: PropertyValues): void

  public override() {
    return false
  }

  public renderOverride(displayConfig: DisplayConfig,
                        data: T,
                        errors: ValidationErrors): TemplateResult[] {
    return EmptyResult
  }

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param config
   * @param data
   * @param errors
   */
  public abstract renderDisplay(config: DisplayConfig,
                                data: Decorated<T>,
                                errors: ValidationErrors): TemplateResult[]

  public abstract renderNarrative(displayConfig: DisplayConfig,
                                  data: Decorated<T>,
                                  errors: ValidationErrors): TemplateResult[]

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param config
   * @param data
   * @param errors
   */
  public abstract renderStructure(config: DisplayConfig,
                                  data: Decorated<T>,
                                  errors: ValidationErrors): TemplateResult[]

  public abstract hasRendered(displayConfig: DisplayConfig,
                              extendedData: Decorated<T> | null,
                              haveChanged: PropertyValues): void

  /**
   *
   * @private
   */
  protected summaryMode() {
    return this.mode && (this.mode === DisplayMode.display_summary || this.mode === DisplayMode.structure_summary)
  }

  protected getLabel() {
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

  protected willUpdate(changes: PropertyValues) {
    super.willUpdate(changes)

    if (this.canRender()) {
      this.willRender(this.getDisplayConfig(), this.extendedData, changes)

      if (this.override()) {
        this.templateGenerators.override.body.push(this.renderOverride)
      } else {

        if (this.mode) {
          switch (this.mode) {
            case DisplayMode.debug:
              this.templateGenerators.debug.body.push(this.renderDebug)
              break
            case DisplayMode.display:
            case DisplayMode.display_summary:
              this.templateGenerators.display.body.push(this.renderDisplay)
              break
            case DisplayMode.narrative:
              this.templateGenerators.display.body.push(this.renderNarrative)
              break
            case DisplayMode.override:
              // do nothing
              break
            case DisplayMode.structure:
            case DisplayMode.structure_summary:
              // stop rendering in verbose mode due to theoretically infinite models.
              // ex: Identifier -> Reference -> Identifier -> and so on!
              if (this.verboseRequestedAndNotAllowed()) {
                this.templateGenerators.structure.body.push(() => [
                  html`
                      <fhir-not-supported
                              variant="stop"
                              label=${this.label}
                              error="If rendered, '${this.label}' would render recursively for ever due to the fhir model definition."
                      ></fhir-not-supported >`
                ])
              } else {
                this.templateGenerators.structure.body.push(this.renderStructure)
              }
              break
            default:
              this.templateGenerators.error.body.push(() => [
                html`
                    <fhir-error text="Unable to render the element ${this.type} ${JSON.stringify(this.getDisplayConfig())}"></fhir-error >`
              ])
          }
        }
      }
    }

  }

  /**
   * Rendering method for all elements
   * @protected
   */
  protected render(): TemplateResult | TemplateResult[] {
    const templates: TemplateResult[] = [html``]

    switch (this.mode) {
      case DisplayMode.debug:
        templates.push(...this
          .templateGenerators
          .debug.body
          .map(g => g.call(this,
                           this.getDisplayConfig(),
                           this.extendedData,
                           this.errors)
          ).flat())
        break
      case DisplayMode.display:
      case DisplayMode.display_summary:
        templates.push(...this
          .templateGenerators
          .display.header
          .map(g => g.call(this, this.getDisplayConfig(),
                           this.extendedData,
                           this.errors)).flat())
        templates.push(...this
          .templateGenerators
          .display.body
          .map(g => g.call(this, this.getDisplayConfig(),
                           this.extendedData,
                           this.errors)).flat())
        break
      case DisplayMode.narrative:
        templates.push(...this
          .templateGenerators
          .display.body
          .map(g => g.call(this, this.getDisplayConfig(),
                           this.extendedData,
                           this.errors)).flat())
        break
      case DisplayMode.override:
        templates.push(...this
          .templateGenerators
          .override.body
          .map(g => g.call(this, this.getDisplayConfig(),
                           this.extendedData,
                           this.errors)).flat())
        break
      case DisplayMode.structure:
      case DisplayMode.structure_summary:
        if (mustRender(this.data, this.mode, this.verbose, this.summaryMode(), this.summary)) {
          templates.push(html`
              <fhir-structure-wrapper
                      .label=${this.getLabel()}
                      .resourceId=${this.extendedData?.id ?? ''}
                      .fhirType=${asReadable(this.type)}
                      ?forceclose=${this.forceclose}
                      ?summary=${this.summary}
              >
                  <div class="frontmatter">
                      ${this.templateGenerators.structure
                            .header.map(g => g.call(this, this.getDisplayConfig(),
                                                    this.extendedData,
                                                    this.errors)).flat()}
                  </div >

                  ${this.templateGenerators.structure
                        .body.map(g => g.call(this,
                                              this.getDisplayConfig(),
                                              this.extendedData,
                                              this.errors)).flat()}
              </fhir-structure-wrapper >
          `)
        }
        break

    }
    return templates
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (this.canRender()) {
      this.hasRendered(this.getDisplayConfig(), this.extendedData, _changedProperties)
    }
  }

  /**
   * Overridable method reserved for internal use. Do not call super in this method
   * @param _
   * @param data
   * @protected
   */
  private renderBaseElement(_: DisplayConfig, data: Decorated<T>): TemplateResult[] {
    if (data) {

      return [
        html`
            <fhir-primitive label="id" .value=${data.id} .type=${PrimitiveType.id}></fhir-primitive >
            ${hasSome(data.extension)
              ? html`
                        <fhir-primitive label="extension" context="not implemented" .type=${PrimitiveType.none}></fhir-primitive >`
              : nothing}
        `
    ]
    }

    return EmptyResult
  }

  /**
   * Render formatted JSON data for debugging purposes
   * @protected
   */
  private renderDebug(_: DisplayConfig, data: Decorated<T>): TemplateResult[] {

    if (data || this.verboseRequestedAndAllowed()) {
      return [
        html`
            <article part="element">
                <header part="label">${this.getLabel()}</header >
                <section part="value">
                    <fhir-debug .data=${data}></fhir-debug >
                </section >
            </article >
        `
      ]
    }

    return EmptyResult
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
