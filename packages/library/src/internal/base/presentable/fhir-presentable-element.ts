/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, nothing, PropertyValues, TemplateResult}                                from 'lit'
import {property}                                                                     from 'lit/decorators.js'
import {
  mustRender
}                                                                                     from '../../../components/mustRender'
import {
  PrimitiveType
}                                                                                     from '../../../components/primitive/type-converters'
import {
  asReadable
}                                                                                     from '../../../components/primitive/type-presenters/asReadable'
import {
  hasSome
}                                                                                     from '../../../shell/layout/directives'
import {hostStyles}                                                                   from '../../../styles'
import {DisplayConfig, DisplayMode}                                                   from '../../../types'
import {hasSameAncestor, isBlank, toDisplayMode}                                      from '../../../utilities'
import {
  DisplayContextConsumerController
}                                                                                     from '../../contexts/context-consumer-controller'
import {FhirDataElement}                                                              from '../data/fhir-data-element'
import {Decorated, FhirElementData, meta, NoDataObject, Validations, ValidationsImpl} from '../Decorated'
import {Rendering}                                                                    from '../Rendering'
import {Templating}                                                                   from '../Templating'
import {
  EmptyResult,
  Generators,
  NullGenerators
}                                                                                     from './fhir-presentable-element.data'
import {
  componentStyles
}                                                                                     from './fhir-presentable-element.styles'


export abstract class FhirPresentableElement<D extends FhirElementData> extends FhirDataElement<D>
  implements Rendering<D>, Templating<D> {

  static styles = [hostStyles, componentStyles]

  @property()
  public label: string = ''

  @property({ type: DisplayMode, converter: toDisplayMode })
  declare mode: DisplayMode

  @property({ type: Boolean })
  public open: boolean = false

  @property({ type: Boolean })
  public forceclose: boolean = false

  @property({ type: Boolean })
  public verbose: boolean = false

  @property({ type: Boolean })
  public showerror: boolean = false

  @property({ type: Boolean })
  public summary: boolean = false

  @property({ type: Boolean })
  public required: boolean = false

  @property({ type: Boolean })
  public summaryonly: boolean = false

  @property({ type: Boolean })
  public headless: boolean = false

  protected templateGenerators: Generators<D> = NullGenerators()

  protected constructor(type: string) {
    super(type)

    // TODO: setting default mode should be reviewed as part of https://github.com/zenwork/fhir-beacon/issues/9
    this.mode = DisplayMode.display

    // consume display configuration provided by a context providing element
    new DisplayContextConsumerController(this)
  }

  public getDisplayConfig(): DisplayConfig {
    return {
      open: this.open,
      verbose: this.verbose,
      mode: this.mode,
      showerror: this.showerror,
      summaryonly: this.summaryonly
    }
  }

  public mustRender(): boolean {
    return mustRender(this.extendedData, this.mode, this.verbose, this.summaryonly, this.summary) || !!this.dataPath
  }

  public abstract willRender(displayConfig: DisplayConfig,
                             extendedData: Decorated<D> | null,
                             changes: PropertyValues): void

  public override() {
    return false
  }

  public renderOverride(displayConfig: DisplayConfig,
                        data: D,
                        validations: Validations): TemplateResult[] {
    return EmptyResult
  }


  public abstract renderDisplay(config: DisplayConfig,
                                data: Decorated<D>,
                                validations: Validations): TemplateResult[]

  public abstract renderNarrative(displayConfig: DisplayConfig,
                                  data: Decorated<D>,
                                  validations: Validations): TemplateResult[]


  public abstract renderStructure(config: DisplayConfig,
                                  data: Decorated<D>,
                                  validations: Validations): TemplateResult[]

  public abstract hasRendered(displayConfig: DisplayConfig,
                              extendedData: Decorated<D> | null,
                              haveChanged: PropertyValues): void

  protected getLabel() {
    let label = this.type

    if (this.key && !this.label) {
      label = this.key
    } else if (this.label) {
      label = this.label
    }

    if (this.mode != DisplayMode.display) {
      label = asReadable(label, 'lower')
    }

    return label
  }

  protected willUpdate(changes: PropertyValues) {
    super.willUpdate(changes)

    if (this.verbose) {
      this.extendedData[meta].hide = false
    }

    if (this.mustRender()) {
      this.willRender(this.getDisplayConfig(), this.extendedData, changes)
      this.templateGenerators = NullGenerators()
      this.templateGenerators.structure.header.push(this.renderBaseElement)
      if (this.override()) {
        this.templateGenerators.override.body.push(this.renderOverride)
      } else {
        if (this.mode) {
          switch (this.mode) {
            case DisplayMode.debug:
              this.templateGenerators.debug.body.push(this.renderDebug)
              break
            case DisplayMode.display:
              this.templateGenerators.display.body.push(this.renderDisplay)
              break
            case DisplayMode.narrative:
              this.templateGenerators.display.body.push(this.renderNarrative)
              break
            case DisplayMode.override:
              // do nothing
              break
            case DisplayMode.structure:
              // stop rendering in verbose mode due to theoretically infinite models.
              // ex: Identifier -> Reference -> Identifier -> and so on!
              if (this.verboseRequestedAndNotAllowed()) {
                this.templateGenerators.structure.body.push(() => [
                  html`
                      <fhir-not-supported
                              variant="stop"
                              label=${this.label}
                              error="If rendered, '${this.label}' would render recursively for ever due to the fhir model definition."
                      ></fhir-not-supported>`
                ])
              } else {
                this.templateGenerators.structure.body.push(this.renderStructure)
              }
              break
            default:
              this.templateGenerators.error.body.push(() => [
                html`
                    <fhir-error text="Unable to render the element ${this.type} ${JSON.stringify(this.getDisplayConfig())}"></fhir-error>`
              ])
          }
        }
      }
    }
  }

  protected render(): TemplateResult | TemplateResult[] {
    const templates: TemplateResult[] = [html``]

    if (!this.extendedData[meta].hide && this.data === NoDataObject) {
      // SHOW THAT WE HAVE NO DATA
      return html`
          <fhir-not-supported variant="no-data"></fhir-not-supported>`
    }

    if (this.extendedData[meta].hide && !this.verbose) return templates

    switch (this.mode) {
      case DisplayMode.debug:
        templates.push(...this
          .templateGenerators
          .debug.body
          .map(g => g.call(this,
                           this.getDisplayConfig(),
                           this.extendedData,
                           new ValidationsImpl(this.extendedData))
          ).flat())
        break
      case DisplayMode.display:
        if (this.headless || isBlank(this.data)) {

          templates.push(...this
            .templateGenerators
            .display.header
            .map(g => g.call(this, this.getDisplayConfig(),
                             this.extendedData,
                             new ValidationsImpl(this.extendedData))).flat())
          templates.push(...this
            .templateGenerators
            .display.body
            .map(g => g.call(this, this.getDisplayConfig(),
                             this.extendedData,
                             new ValidationsImpl(this.extendedData))).flat())
        } else {
          templates.push(html`
              <fhir-wrapper
                      .label=${this.getLabel()}
                      ?summary=${this.summary}
                      ?summaryonly=${this.getDisplayConfig().summaryonly}
              >

                  ${this.templateGenerators
                        .display.header
                        .map(g => g.call(this, this.getDisplayConfig(),
                                         this.extendedData,
                                         new ValidationsImpl(this.extendedData))).flat()}

                  ${this.templateGenerators.display
                        .body.map(g => g.call(this,
                                              this.getDisplayConfig(),
                                              this.extendedData,
                                              new ValidationsImpl(this.extendedData))).flat()}
              </fhir-wrapper>
          `)
        }
        break
      case DisplayMode.narrative:
        templates.push(...this
          .templateGenerators
          .display.header
          .map(g => g.call(this, this.getDisplayConfig(),
                           this.extendedData,
                           new ValidationsImpl(this.extendedData))).flat())
        templates.push(...this
          .templateGenerators
          .display.body
          .map(g => g.call(this, this.getDisplayConfig(),
                           this.extendedData,
                           new ValidationsImpl(this.extendedData))).flat())
        break
      case DisplayMode.override:
        templates.push(...this
          .templateGenerators
          .override.body
          .map(g => g.call(this, this.getDisplayConfig(),
                           this.extendedData,
                           new ValidationsImpl(this.extendedData))).flat())
        break
      case DisplayMode.structure:
        if (mustRender(this.data, this.mode, this.verbose, this.summaryonly, this.summary)) {

          if (this.headless) {
            templates.push(html`
                <div class="frontmatter">
                    ${this.templateGenerators.structure
                          .header.map(g => g.call(this, this.getDisplayConfig(),
                                                  this.extendedData,
                                                  new ValidationsImpl(this.extendedData))).flat()}
                </div>

                ${this.templateGenerators.structure
                      .body.map(g => g.call(this,
                                            this.getDisplayConfig(),
                                            this.extendedData,
                                            new ValidationsImpl(this.extendedData))).flat()}
            `)
          } else {
            templates.push(html`
                <fhir-wrapper variant="details"
                                label=${this.getLabel()}
                                badge-resource=${asReadable(this.type)}
                                ?open=${this.open}
                                ?badge-summary=${this.summary}
                                ?badge-required=${this.required}
                                ?summary=${this.summary}
                                ?summaryonly=${this.getDisplayConfig().summaryonly}
                >
                    <div class="frontmatter">
                        ${this.templateGenerators.structure
                              .header.map(g => g.call(this, this.getDisplayConfig(),
                                                      this.extendedData,
                                                      new ValidationsImpl(this.extendedData))).flat()}
                    </div>

                    ${this.templateGenerators.structure
                          .body.map(g => g.call(this,
                                                this.getDisplayConfig(),
                                                this.extendedData,
                                                new ValidationsImpl(this.extendedData))).flat()}
                </fhir-wrapper>
            `)
          }
        }
        break

    }


    return templates
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (this.mustRender()) {
      this.hasRendered(this.getDisplayConfig(), this.extendedData, _changedProperties)
    }
  }

  private stopRender() {
    return this.extendedData[meta].hide && !this.verbose
  }

  private renderBaseElement(_: DisplayConfig, data: Decorated<D>): TemplateResult[] {
    if (data) {
      return [
        html`
            <fhir-primitive label="id" .value=${data.id} .type=${PrimitiveType.id}></fhir-primitive>
            ${hasSome(data.extension)
              ? html`
                        <fhir-primitive label="extension"
                                        context="not implemented"
                                        .type=${PrimitiveType.none}
                        ></fhir-primitive>`
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
  private renderDebug(_: DisplayConfig, data: Decorated<D>): TemplateResult[] {

    if (data || this.verboseRequestedAndAllowed()) {
      return [
        html`
            <article part="element">
                <header part="label">${this.getLabel()}</header>
                <section part="value">
                    <fhir-debug .data=${data}></fhir-debug>
                </section>
            </article>
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
