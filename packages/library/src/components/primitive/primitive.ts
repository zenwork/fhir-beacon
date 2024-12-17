import {consume}                                       from '@lit/context'
import {SlInput, SlInputEvent, SlSwitch} from '@shoelace-style/shoelace'
import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}                from 'lit/decorators.js'
import {choose}                                        from 'lit/directives/choose.js'
import {Value}                                         from '../../codesystems'
import {ConfigurableElement}                           from '../../internal/base/configurable/fhir-configurable-element'
import {dataContext, FhirDataContext}                  from '../../internal/contexts'
import {textHostStyles}                                from '../../styles'
import {DisplayMode}                                   from '../../types'
import {isBlank}                                       from '../../utilities'
import {mustRender}                                    from '../mustRender'
import {DateTime}                                      from './primitive.data'
import {PrimitiveInputEvent}                           from './primitiveInputEvent'
import {PrimitiveInvalidEvent}                         from './primitiveInvalidEvent'
import {PrimitiveValidEvent}             from './primitiveValidEvent'
import {componentStyles}                               from './primitve.styles'
import {
  PrimitiveType,
  toBase64,
  toBoolean,
  toCode,
  toDate,
  toDatetime,
  toDecimal,
  toFhirString,
  toId,
  toInstant,
  toInteger,
  toInteger64,
  toLink,
  toMarkdown,
  toPositiveInt,
  toType,
  toUnsignedInt,
  toUri,
  toUrl,
  valueOrError
}                                                      from './type-converters'
import {asDateTime, asReadable}                        from './type-presenters'



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
  declare choices: Value[]

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
  private error: boolean = false

  @state()
  private presentableValue: unknown = ''

  @state()
  private presentableError: string = ''

  @state()
  private presentableTypeError: string = ''


  /**
   *
   * @param changed
   * @protected
   */
  protected willUpdate(changed: PropertyValues) {
    super.willUpdate(changed)

    // override value with valuePath
    if (changed.has('valuePath') && this.contextData) {
      if (!isBlank(this.value) && this.valuePath) {
        console.warn('primitive: valuePath is overriding value attribute. Do not set both')
      }

      try {
        this.value = this.contextData.getAt(this.valuePath)
      } catch {
        console.log(`unable to retrieve value-path: ${this.valuePath}`)
        this.value = `unable to retrieve value-path: ${this.valuePath}`
        this.type = PrimitiveType.forced_error
      }
    }

    const watchedHaveChanged = changed.has('value') || changed.has('type') || changed.has('required')
    if (watchedHaveChanged) {
      if (!isBlank(this.value) && this.type) {
        this.presentableValue = ''
        this.presentableError = ''
        this.presentableTypeError = ''
        choose(this.type, [
          [PrimitiveType.base64, () => this.validOrError(toBase64, this.value)],
          [PrimitiveType.boolean, () => this.validOrError(toBoolean, this.value)],
          [PrimitiveType.code, () => this.validOrError(toCode, this.value)],
          [PrimitiveType.date, () => this.validOrError(toDate, this.value)],
          [PrimitiveType.datetime, () => this.validOrError(toDatetime, this.value)],
          [PrimitiveType.decimal, () => this.validOrError(toDecimal, this.value)],
          [PrimitiveType.fhir_string, () => this.validOrError(toFhirString, this.value)],
          [PrimitiveType.forced_error, () => (this.presentableValue = this.value) && (this.error = true)],
          [PrimitiveType.id, () => this.validOrError(toId, this.value)],
          [PrimitiveType.instant, () => this.validOrError(toInstant, this.value)],
          [PrimitiveType.integer, () => this.validOrError(toInteger, this.value)],
          [PrimitiveType.integer64, () => this.validOrError(toInteger64, this.value)],
          [PrimitiveType.link, () => this.validOrError(toLink, this.value)],
          [PrimitiveType.markdown, () => this.validOrError(toMarkdown, this.value)],
          [PrimitiveType.none, () => (this.presentableValue = this.value) && (this.error = false)],
          [PrimitiveType.positiveInt, () => this.validOrError(toPositiveInt, this.value)],
          [PrimitiveType.string_reference, () => this.validOrError(toType, this.value)],
          [PrimitiveType.unsigned_int, () => this.validOrError(toUnsignedInt, this.value)],
          [PrimitiveType.uri, () => this.validOrError(toUri, this.value)],
          [PrimitiveType.uri_type, () => this.validOrError(toType, this.value)],
          [PrimitiveType.url, () => this.validOrError(toUrl, this.value)]
        ])
      }
    }


    if (isBlank(this.value) && this.required && !this.verbose) {
      this.presentableError = 'Error: this property is required'
      this.error = true
      const event = new PrimitiveInvalidEvent(this.key, this.value, this.type, this.presentableError)
      this.dispatchEvent(event)
    }

    if (changed.has('errormessage')) {
      if (!isBlank(this.errormessage)) {
        this.presentableError = this.errormessage
        this.error = true
        const event = new PrimitiveInvalidEvent(this.key, this.value, this.type, this.presentableError)
        this.dispatchEvent(event)
      }
    }
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
    const elements: any[] = []

    if (this.getLabel()) elements.push(html`
        <fhir-label text=${this.getLabel()} delimiter=${this.delimiter}></fhir-label>`)

    if (!isBlank(this.value))
      elements.push(html`
          <fhir-value text=${this.showProvided
                             ? this.value
                             : this.presentableValue} link=${this.link} .variant=${this.variant}
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

    if (this.choices) {
      return html`
          <fhir-system-choice
                  id=${this.key}
                  .value=${this.value}
                  .valuesets=${this.choices.map(choice => ({ value: choice.code, label: choice.display }))}
                  label=${this.getLabel()}
                  error=${errors.join(' | ')}
                  @fhir-change=${this.handleChange}
                  .overridable=${false}
          >
          </fhir-system-choice>
      `
    }

    return html`
        <sl-input id=${this.key}
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
    console.log(e)
    const oldValue = this.value

    if (e.type === 'sl-input') {
      this.value = (e.target as SlInput).value
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

  /**
   *
   * @param fn
   * @param original
   */
  private validOrError = <O, V>(fn: (original: O) => V, original: O) => {
    const parsedValue = valueOrError(fn, original)

    if (!isBlank(parsedValue.val)) {
      this.presentableValue = this.present(parsedValue.val)
      this.error = false
      const event = new PrimitiveValidEvent(this.key, original, this.type)
      this.dispatchEvent(event)
    }

    if (parsedValue.err) {
      this.presentableTypeError = parsedValue.err
      this.error = true
      const event = new PrimitiveInvalidEvent(this.key, original, this.type, parsedValue.err || this.presentableError)
      this.dispatchEvent(event)
    }
  }

  /**
   *
   * @param val
   * @private
   */
  private present(val: unknown): unknown {
    choose(this.type, [
      [PrimitiveType.datetime, () => (val = asDateTime(val as DateTime))],
      [PrimitiveType.instant, () => (val = asDateTime(val as DateTime))],
      [PrimitiveType.uri_type, () => (val = asReadable(val as string))],
      [PrimitiveType.uri_type, () => (val = String(val))]
    ])
    return val
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
