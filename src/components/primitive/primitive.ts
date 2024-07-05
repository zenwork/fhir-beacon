import {consume}                                                        from '@lit/context'
import {css, html, LitElement, nothing, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}                                 from 'lit/decorators.js'
import {choose}                                                         from 'lit/directives/choose.js'
import {DisplayMode}                                                    from '../../internal/base/base-element.data'
import {contextData, displayConfigContext}                              from '../../internal/contexts/context'
import {DisplayConfig}                                                  from '../../internal/contexts/context.data'
import {FhirDataContext}                                                from '../../internal/contexts/FhirContextData'
import {isBlank}                                                        from '../../utilities/isBlank'
import {toBaseElementModeEnum}                                          from '../../utilities/toBaseElementModeEnum'
import {DateTime}                                                       from './primitive.data'
import './primitive-label/primitive-label'
import './primitive-value/primitive-value'
import './primitive-error/primitive-error'
import './primitive-context/primitive-context'
import './primitive-wrapper/primitive-wrapper'

import {PrimitiveType, valueOrError} from './type-converters'
import {toBase64}                    from './type-converters/toBase64'
import {toBoolean}                   from './type-converters/toBoolean'
import {toCode}                      from './type-converters/toCode'
import {toDate}                      from './type-converters/toDate'
import {toDatetime}                  from './type-converters/toDatetime'
import {toDecimal}                   from './type-converters/toDecimal'
import {toError}                     from './type-converters/toError'
import {toFhirString}                from './type-converters/toFhirString'
import {toId}                        from './type-converters/toId'
import {toInstant}                   from './type-converters/toInstant'
import {toInteger}                   from './type-converters/toInteger'
import {toInteger64}                 from './type-converters/toInteger64'
import {toLink}                      from './type-converters/toLink'
import {toPositiveInt}               from './type-converters/toPositiveInt'
import {toType}                      from './type-converters/toType'
import {toUnsignedInt}               from './type-converters/toUnsignedInt'
import {toUri}                       from './type-converters/toUri'
import {toUrl}                       from './type-converters/toUrl'
import {asDateTime}                  from './type-presenters/asDateTime'
import {asReadable}                  from './type-presenters/asReadable'

/**
 * Represents a custom element for displaying and parsing primitive values.
 *
 * @customElement
 */
//TODO: rename to fhir-primitive. Maybe needs to be split into a lower level true primitive and a presentation-flexible primitive.
@customElement('fhir-primitive')
export class Primitive extends LitElement {

  static styles = [
    css`
      :host {
        user-select: text;
      }
      sl-badge {
        padding-left: var(--sl-spacing-x-small)
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

  @consume({ context: displayConfigContext, subscribe: true })
  declare displayConfig: DisplayConfig

  @consume({ context: contextData, subscribe: true })
  declare contextData: FhirDataContext

  @property({ reflect: true })
  declare label: string

  @property({ reflect: true })
  public delimiter: string = ': '

  @property({ reflect: true })
  declare value: string

  @property({ attribute: 'value-path', reflect: true })
  declare valuePath: string

  @property({ reflect: true })
  declare link: string

  @property({ reflect: true })
  declare context: string

  @property({ type: PrimitiveType, converter: convertToPrimitiveType, reflect: true })
  public type: PrimitiveType = PrimitiveType.none

  @property({ type: Boolean, reflect: true })
  declare showProvided: boolean

  @property({ type: DisplayMode, converter: toBaseElementModeEnum, reflect: true })
  declare mode: DisplayMode

  @property({ type: Boolean, reflect: true })
  declare showerror: boolean

  @property({ type: String, reflect: true })
  declare variant: string

  @property({ type: Boolean, reflect: true })
  declare verbose: boolean

  @property({ type: Boolean, reflect: true })
  declare summary: boolean

  @state()
  private error: boolean = false
  @state()
  private presentableValue: unknown = ''


  protected willUpdate(_changedProperties: PropertyValues) {
    let watchedHaveChanged = _changedProperties.has('value') || _changedProperties.has('type')
    if (watchedHaveChanged && !isBlank(this.value) && this.type) {
      choose(this.type, [
        [PrimitiveType.base64, () => this.validOrError(toBase64, this.value)],
        [PrimitiveType.boolean, () => this.validOrError(toBoolean, this.value)],
        [PrimitiveType.code, () => this.validOrError(toCode, this.value)],
        [PrimitiveType.date, () => this.validOrError(toDate, this.value)],
        [PrimitiveType.datetime, () => this.validOrError(toDatetime, this.value)],
        [PrimitiveType.decimal, () => this.validOrError(toDecimal, this.value)],
        [PrimitiveType.fhir_string, () => this.validOrError(toFhirString, this.value)],
        [PrimitiveType.forced_error, () => this.validOrError(toError, this.value)],
        [PrimitiveType.id, () => this.validOrError(toId, this.value)],
        [PrimitiveType.instant, () => this.validOrError(toInstant, this.value)],
        [PrimitiveType.integer, () => this.validOrError(toInteger, this.value)],
        [PrimitiveType.integer64, () => this.validOrError(toInteger64, this.value)],
        [PrimitiveType.link, () => this.validOrError(toLink, this.value)],
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

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (this.displayConfig) {
      this.mode = this.displayConfig.mode
      this.verbose = this.displayConfig.verbose
      this.showerror = this.displayConfig.showerror
    }

    // override value with valuePath
    if (_changedProperties.has('valuePath') && this.contextData) {
      if (this.value && this.valuePath) {
        console.warn('primitive: valuePath is overriding value attribute. Do not set both')
      }

      try {
        this.value = this.contextData.getAt(this.valuePath)
      } catch (e) {
        console.log(`unable to retrieve value-path: ${this.valuePath}`)
        this.value = `unable to retrieve value-path: ${this.valuePath}`
        this.type = PrimitiveType.forced_error
      }
    }
  }

  protected render(): unknown {
    if ((this.summary && this.summaryMode()) || (!this.summaryMode())) {
      return this.error ? this.renderError() : this.renderValid()
    }
    return html``
  }

  // TODO: should be able to put link on value OR on context
  private renderValid = (): TemplateResult => {
    const elements: any[] = []

    if (this.label) elements.push(html`
      <fhir-label text=${this.label} delimiter=${this.delimiter}></fhir-label >&nbsp`)

    if (this.value) elements.push(html`
      <fhir-value
        text=${this.showProvided ? this.value : this.presentableValue}
        link=${this.link}
        .variant=${this.variant}
      >
        <span slot="before"><slot name="before"></slot ></span >
        <span slot="after"><slot name="after"></slot ></span >
      </fhir-value >`)

    if (this.context) elements.push(html`
      <fhir-context
        .text=${this.context ?? ''}${this.context && this.verbose ? ' - ' : ''}${this.verbose ? this.type : ''}
      ></fhir-context >`)

    if (this.summary && this.mode == DisplayMode.structure) elements.push(html`
      <sl-badge pill>&sum;</sl-badge >`)

    return elements.length > 1 || this.value || this.verbose
           ? html`
        <fhir-primitive-wrapper >
          ${elements}
        </fhir-primitive-wrapper >`
           : html``
  }

  private renderError = (): TemplateResult => {
    console.log(this.presentableValue)
    return !isBlank(this.value) || this.verbose
           ? html`
          <fhir-primitive-wrapper >
            <fhir-label .text=${this.label} delimiter=${this.delimiter} variant="error"></fhir-label >&nbsp;
            <fhir-value .text=${this.value} link=${this.link} variant="error"></fhir-value >
            ${this.showerror
              ? html`
                  <fhir-error text=${this.presentableValue}></fhir-error >`
              : nothing}
          </fhir-primitive-wrapper >`
           : html``
  }

  private validOrError = <O, V>(fn: (original: O) => V, original: O) => {
    let parsedValue = valueOrError(fn, original)

    if (!isBlank(parsedValue.val)) {
      this.presentableValue = this.present(parsedValue.val)
      this.error = false
    }

    if (parsedValue.err) {
      this.presentableValue = parsedValue.err
      this.error = true
    }
  }

  private present(val: unknown): unknown {

    choose(this.type, [
      [PrimitiveType.datetime, () => val = asDateTime(val as DateTime)],
      [PrimitiveType.instant, () => val = asDateTime(val as DateTime)],
      [PrimitiveType.uri_type, () => val = asReadable(val as string)]
      // [PrimitiveType.base64, () => val = asWrapped(val as string,100)],

    ])
    return val
  }

  private summaryMode() {
    return this.mode === DisplayMode.display_summary || this.mode === DisplayMode.structure_summary
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
