import {consume}                                                        from '@lit/context'
import {css, html, LitElement, nothing, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}                                 from 'lit/decorators.js'
import {choose}                                             from 'lit/directives/choose.js'
import {dataContext, displayConfigContext, FhirDataContext} from '../../internal/contexts'
import {textHostStyles}                                     from '../../styles'
import {DisplayConfig, DisplayMode}                         from '../../types'
import {isBlank, toDisplayMode}                             from '../../utilities'
import {mustRender}                                         from '../mustRender'
import {DateTime}                                                       from './primitive.data'
import {
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
  toUrl
}                                                                       from './type-converters'

import {PrimitiveType, valueOrError} from './type-converters/type-converters'
import {asDateTime, asReadable}      from './type-presenters'

/**
 * Represents a custom element for displaying and parsing primitive values.
 *
 * @customElement
 */
//TODO: rename to fhir-primitive. Maybe needs to be split into a lower level true primitive and a presentation-flexible
// primitive.
@customElement('fhir-primitive')
export class Primitive extends LitElement {
  static styles = [
    textHostStyles,
    css`
      :host {
        user-select: text;
      }

      li {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        align-items: baseline;
        padding: 0;
        margin: 0;
      }

      sl-badge {
        padding-left: var(--sl-spacing-x-small);
      }

      sl-badge::part(base) {
        color: var(--sl-color-gray-400);
        background-color: var(--sl-color-gray-100);
        border-color: var(--sl-color-gray-300);
        font-weight: var(--sl-font-weight-normal);
        font-style: italic;
      }
    `
  ]

  @consume({ context: displayConfigContext })
  declare displayConfig: DisplayConfig

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

  @property()
  declare link: string

  @property()
  declare context: string

  @property({ type: PrimitiveType, converter: convertToPrimitiveType })
  public type: PrimitiveType = PrimitiveType.none

  @property({ type: Boolean })
  public showProvided: boolean = false

  @property({ type: DisplayMode, converter: toDisplayMode, reflect: true })
  declare mode: DisplayMode

  @property({ type: Boolean })
  public showerror: boolean = false

  // override error message only shown if type validation fails
  @property({ type: String, reflect: true })
  declare errormessage: string

  @property({ type: String })
  declare variant: string

  @property({ type: Boolean })
  public verbose: boolean = false

  @property({ type: Boolean })
  public summary: boolean = false

  @property({ type: Boolean })
  public summaryonly: boolean = false

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
    if (this.displayConfig) {
      this.mode = this.displayConfig.mode
      this.verbose = this.displayConfig.verbose
      this.showerror = this.displayConfig.showerror
      this.summaryonly = this.displayConfig.summaryonly
    }
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
    }

    if (changed.has('errormessage')) {
      if (!isBlank(this.errormessage)) {
        this.presentableError = this.errormessage
        this.error = true
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
        && this.mode !== DisplayMode.override) {
      return html``
    }

    return this.error ? this.renderError() : this.renderValid()

  }


  /**
   *
   * @private
   */
  // TODO: should be able to put link on value OR on context
  private renderValid(): TemplateResult {
    const elements: any[] = []

    if (this.getLabel()) elements.push(html`
        <fhir-label text=${this.getLabel()} delimiter=${this.delimiter}></fhir-label>&nbsp`)

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

  private renderError = (): TemplateResult => {
    const errors = []
    if (this.presentableTypeError) errors.push(this.presentableTypeError)
    if (this.presentableError) errors.push(this.presentableError)

    return !isBlank(this.value) || this.verbose || this.required
           ? html` ${this.showerror}
                <li>
                    <fhir-label
                            text=${this.getLabel()}
                            delimiter=${this.delimiter}
                            variant="error"
                    ></fhir-label>&nbsp;
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
    }

    if (parsedValue.err) {
      this.presentableTypeError = parsedValue.err
      this.error = true
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
