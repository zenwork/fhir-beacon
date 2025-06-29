import {consume}                                       from '@lit/context'
import {SlInput, SlSwitch}                             from '@shoelace-style/shoelace'
import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}                from 'lit/decorators.js'
import {FhirExtensionData}                             from '../../internal'

import {ConfigurableElement}                    from '../../internal/base/configurable/fhir-configurable-element'
import {dataContext, FhirDataContext}           from '../../internal/contexts'
import {OpenType}                               from '../../OpenType'
import {DisplayMode}                            from '../../shell/displayMode'
import {textHostStyles}                         from '../../styles'
import {isBlank}                                from '../../utilities'
import {Choice}                                 from '../../valuesets/ValueSet.data'
import {mustRender}                             from '../mustRender'
import {PrimitiveValidator, PrimitiveValueHost} from './primitive.validator'
import {PrimitiveInputEvent}                    from './primitiveInputEvent'
import {componentStyles}                        from './primitve.styles'
import {convertToPrimitiveType, PrimitiveType}  from './type-converters'
import {asReadable}                             from './type-formatters'
import {format}                                 from './type-formatters/format'




/**
 * Represents a custom element for displaying and parsing primitive values.
 *
 * @customElement
 */
//TODO: rename to fhir-primitive. Maybe needs to be split into a lower level true primitive and a presentation-flexible
// primitive.
@customElement('fhir-primitive')
export class Primitive extends ConfigurableElement {

  static styles = [textHostStyles, componentStyles]

  @property({ type: Object })
  public extension: FhirExtensionData<OpenType> | null = null

  @property()
  declare key: string

  @property({ reflect: true })
  declare label: string

  @property()
  public delimiter: string = ': '

  @property({ reflect: true })
  declare value: string

  @property({ attribute: 'value-path' })
  declare valuePath: string

  @property({ type: Array })
  declare choices: Choice[]

  @property()
  declare link: string

  @property()
  declare context: string

  @property({ type: PrimitiveType, converter: convertToPrimitiveType })
  public type: PrimitiveType = PrimitiveType.none

  @property({ type: Boolean })
  public showProvided: boolean = false

  @property({ type: String, reflect: true })
  declare errormessage: string

  @property({ type: String })
  declare variant: string

  @property({ type: Boolean })
  public summary: boolean = false

  @property({ type: Boolean })
  public translate: boolean = false

  @property({ type: Boolean })
  public  trialuse: boolean = false

  @property({ type: Boolean })
  public required: boolean = false
  @consume({ context: dataContext, subscribe: true })
  protected declare contextData: FhirDataContext
  @state()
  private error: boolean = false

  @state()
  private presentableValue: unknown = ''

  @state()
  private presentableError: string = ''

  @state()
  private presentableTypeError: string = ''

  @state()
  private hasExtension: boolean = false

  private validator: PrimitiveValidator

  constructor() {
    super()
    this.validator = new PrimitiveValidator(this as unknown as PrimitiveValueHost)
  }

  /**
   * Invoked before the component updates its properties.
   * It validates the updates based on the properties that have changed.
   *
   * @param {PropertyValues} changed - Map of changed properties with their previous values.
   * @return {void} No return value.
   */
  protected willUpdate(changed: PropertyValues) {
    super.willUpdate(changed)
    this.validator
        .validate({
                    valuePathChanged: changed.has('valuePath'),
                    valueChanged: changed.has('value'),
                    typeChanged: changed.has('type'),
                    requiredChanged: changed.has('required'),
                    errormessageChanged: changed.has('errormessage'),
                    choicesChanged: changed.has('choices')
                  })
  }

  /**
   * Renders the appropriate template or content based on the current component's state and properties.
   *
   * @return {unknown} The rendered output, which could be an HTML template or other content, or an empty
   *                   result if rendering conditions are not met.
   */
  protected render(): unknown {
    if (!mustRender(this.value, this.mode, this.verbose, this.summaryonly, this.summary, this.required)
        && !this.valuePath
        && this.mode !== DisplayMode.override
        && !this.input) {
      return html``
    }

    return this.input
           ? this.renderInput()
           : this.hasExtension
             ? this.error
               ? this.renderErrorWithExtension()
               : this.renderValidWithExtension()
             : this.error
               ? this.renderError()
               : this.renderValid()
  }


  /**
   * Renders when p[rovided value is valid. Displays FHIR data, incorporating labels, values, contexts,
   * and additional structured elements based on the provided parameters.
   *
   * @returns {TemplateResult} A lit-html template result containing the rendered elements.
   */
  private renderValid(): TemplateResult {

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const elements: any[] = []

    if (this.getLabel()) elements.push(html`
        <fhir-label text=${this.getLabel()} delimiter=${this.delimiter}></fhir-label>`)

    if (!isBlank(this.value))
      // console.log(this.value, this.presentableValue, this.showProvided, this.type, this.mode, this.verbose,
      // this.summaryonly, this.summary, this.required)
      elements.push(html`
          <fhir-value text=${this.showProvided
                             ? this.value
                             : this.mode !== DisplayMode.display
                               ? this.presentableValue
                               : format(this.presentableValue, this.type)}
                      link=${this.link}
                      .variant=${this.variant}
          >
              <span slot="before"><slot name="before"></slot></span>
              <span slot="after"><slot name="after"></slot></span>
          </fhir-value>`)

    if (this.context && this.verbose)
      elements.push(html`
          <fhir-context .text="${this.context ?? ''}${this.context && this.verbose ? ' - ' : ''}${this.verbose
                                                                                                  ? this.type
                                                                                                  : ''}"
          ></fhir-context>`)

    if (this.mode === DisplayMode.structure) elements.push(html`
        <fhir-badge-group ?required=${this.required} ?summary=${this.summary}></fhir-badge-group>`)

    return (elements.length > 1 || !isBlank(this.value) || this.verbose) ? html`<li> ${elements}</li>` : html``
  }

  /**
   * Renders an input element based on the type and configuration of the current object.
   *
   * Validation errors related to the input are displayed, if present.
   *
   * @returns {TemplateResult} A rendered Lit-html template representing the input element.
   */
  private renderInput(): TemplateResult {
    const errors = []
    if (this.presentableTypeError) errors.push(this.presentableTypeError)
    if (this.presentableError) errors.push(this.presentableError)

    if (this.type === PrimitiveType.boolean) {
      return html`
          <sl-switch
                  id=${this.key}
                  value=${this.value}
                  @sl-change=${this.handleChange}
          >${this.getLabel()}
          </sl-switch>

      `
    }

    //TODO: this only works for date only fields. Does not work for time component.
    if (this.type
        === PrimitiveType.date
        || this.type
        === PrimitiveType.datetime
        || this.type
        === PrimitiveType.instant) {
      return html`
          <sl-input name=${this.key}
                    .valueAsDate=${new Date(this.value)}
                    clearable
                    @sl-input=${this.handleChange}
                    size="small"
                    type="date"
          >
              <fhir-label slot="label" text=${this.getLabel()}></fhir-label>
              <fhir-error slot="help-text" text=${errors.join(' | ')}></fhir-error>

          </sl-input>

      `
    }

    if (this.choices) {
      return html`
          <fhir-system-choice
                  id=${this.key}
                  .value=${this.value}
                  .valuesets=${this.choices.map(choice => ({ value: choice.value, label: choice.display }))}
                  label=${this.getLabel()}
                  error=${errors.join(' | ')}
                  @fhir-change=${this.handleChange}
                  .overridable=${false}
          >
          </fhir-system-choice>
      `
    }

    return html`
        <sl-input name=${this.key}
                  value=${this.value}
                  clearable
                  @sl-input=${this.handleChange}
                  size="small"
        >
            <fhir-label slot="label" text=${this.getLabel()}></fhir-label>
            <fhir-error slot="help-text" text=${errors.join(' | ')}></fhir-error>

        </sl-input>
    `
  }

  /**
   * Generates a rendered error representation based on the current state and properties of the object.
   *
   * @returns {TemplateResult} A lit-html template representing the error state or an empty template if no rendering is
   *   required.
   */
  private renderError = (): TemplateResult => {
    const errors = []
    if (this.presentableTypeError) errors.push(this.presentableTypeError)
    if (this.presentableError) errors.push(this.presentableError)

    return !isBlank(this.value) || this.verbose || this.required
           ? html`
                <li>
                    <fhir-label
                            text=${this.getLabel()}
                            delimiter=${this.delimiter}
                            variant="error"
                    ></fhir-label>
                    <fhir-value
                            text=${this.value}
                            link=${this.link}
                            variant="error"
                    ></fhir-value>
                    ${this.context
                      ? html`
                            <fhir-context .text="${this.context}"></fhir-context>`
                      : nothing
                    }
                    ${this.mode === DisplayMode.structure
                      ? html`
                            <fhir-badge-group ?required=${this.required} ?summary=${this.summary}></fhir-badge-group>`
                      : nothing
                    }
                    ${this.showerror
                      ? html`
                            <fhir-error text=${errors.join(' | ')}></fhir-error>`
                      : nothing
                    }
                </li>`
           : html``
  }

  /**
   * Handles change events and updates the internal state of the component based on the event type
   * and target element's properties. The method processes events originating from various input
   * types and updates the `value`, `presentableValue`, `error`, and `errormessage` fields.
   * It also dispatches a custom event when the `value` changes.
   *
   * @param {Event} e - The event object triggered by user interaction or programmatic changes.
   *                     The method processes this event to determine how to update the component state.
   */
  private handleChange = (e: Event) => {

    const oldValue = this.value

    if (e.type === 'sl-input') {
      if (e.target instanceof SlInput && e.target.type === 'date') {
        this.value = (e.target as SlInput).valueAsDate?.toISOString() ?? ''
      } else {
        this.value = (e.target as SlInput).value
      }
    }

    if (e.type === 'sl-change' && (e.target as SlSwitch).tagName === 'SL-SWITCH') {
      this.value = (String(!this.value))
    }

    if (e.type === 'fhir-change') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.value = e.detail.value
    }

    if (oldValue === this.value) return

    this.presentableValue = ''
    this.error = false
    this.errormessage = ''
    this.dispatchEvent(new PrimitiveInputEvent(this.key, oldValue, this.value, this.type))

  }


  /**
   * Retrieves the label associated with the current context.
   * If the "label" property is defined, it will be used. Otherwise, the "key" property
   * is used as the label's default value.
   *
   * The resulting label is formatted into a readable string in lowercase form.
   *
   * @function
   * @returns {string} A readable string representation of the label in lowercase format.
   */
  private getLabel = (): string => {
    let label = ''
    if (this.label) label = this.label
    else label = asReadable(this.key, 'lower')
    return label
  }


  private renderErrorWithExtension(): TemplateResult {
    return html`error with ext`
  }


  private renderValidWithExtension(): TemplateResult {
    return html`
    <fhir-wrapper label=${this.getLabel()}>
    ${this.renderValid()}
    <fhir-extension .data=${this.extension} headless></fhir-extension>
    </fhir-wrapper>
    `
  }
}
