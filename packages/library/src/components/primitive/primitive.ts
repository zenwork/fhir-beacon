import {consume}                                       from '@lit/context'
import {SlInput, SlSwitch}                             from '@shoelace-style/shoelace'
import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}                from 'lit/decorators.js'
import {ConfigurableElement}                           from '../../internal/base/configurable/fhir-configurable-element'
import {dataContext, FhirDataContext}                  from '../../internal/contexts'
import {textHostStyles}                                from '../../styles'
import {DisplayMode}                                   from '../../types'
import {isBlank}                                       from '../../utilities'
import {Choice}                                        from '../../valuesets/ValueSet.data'
import {mustRender}                                    from '../mustRender'
import {PrimitiveValidator}                            from './primitive.validator'
import {PrimitiveInputEvent}                           from './primitiveInputEvent'
import {componentStyles}                               from './primitve.styles'
import {PrimitiveType}                                 from './type-converters'
import {asReadable}                                    from './type-formatters'
import {format}                                        from './type-formatters/format'



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

  @consume({ context: dataContext, subscribe: true })
  declare contextData: FhirDataContext

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
  public trialuse: boolean = false

  @property({ type: Boolean })
  public required: boolean = false

  @state()
  public error: boolean = false

  @state()
  public presentableValue: unknown = ''

  @state()
  public presentableError: string = ''

  @state()
  public presentableTypeError: string = ''

  private validator: PrimitiveValidator

  constructor() {
    super()
    this.validator = new PrimitiveValidator(this)
  }

  /**
   *
   * @param changed
   * @protected
   */
  protected willUpdate(changed: PropertyValues) {
    super.willUpdate(changed)
    this.validator
        .validate({
                    valuePathChanged: changed.has('valuePath'),
                    valueChanged: changed.has('value'),
                    typeChanged: changed.has('type'),
                    requiredChanged: changed.has('required'),
                    errormessageChanged: changed.has('errormessage')
                  })
  }


  /**
   *
   * @protected
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
           : this.error
             ? this.renderError()
             : this.renderValid()
  }


  /**
   *
   * @private
   */
  // TODO: should be able to put link on value OR on context
  private renderValid(): TemplateResult {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const elements: any[] = []

    if (this.getLabel()) elements.push(html`
        <fhir-label text=${this.getLabel()} delimiter=${this.delimiter}></fhir-label>`)

    if (!isBlank(this.value))
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

    return (elements.length > 1 || !isBlank(this.value) || this.verbose) ? html`
        <li> ${elements}</li>` : html``
  }

  private getLabel = () => {
    let label = this.key
    if (this.label) label = this.label

    return asReadable(label, 'lower')
  }

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
    if (this.type === PrimitiveType.datetime || this.type === PrimitiveType.instant) {
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
                                <fhir-context .text="${this.context}"></fhir-context>
                            `
                      : nothing}
                    ${this.mode === DisplayMode.structure
                      ? html`
                                <fhir-badge-group ?required=${this.required} ?summary=${this.summary}
                                ></fhir-badge-group>` : nothing}
                    ${this.showerror
                      ? html`
                                <fhir-error
                                        text=${errors.join(
                                                ' | ')}
                                ></fhir-error>`
                      : nothing}
                </li>`
           : html``
  }


}

/**
 * Converts the given value to its primitive type.
 *
 * @param {string | null} value - The value to be converted.
 * @return {PrimitiveType} - The converted value as a primitive type.
 */
function convertToPrimitiveType(value: string | null): PrimitiveType {
  if (!value || !Object.values(PrimitiveType).includes(value as PrimitiveType)) {
    return PrimitiveType.none
  }

  return value as PrimitiveType
}
