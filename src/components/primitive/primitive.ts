import {consume}                                                   from '@lit/context'
import {html, LitElement, nothing, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}                            from 'lit/decorators.js'
import {choose}                                                    from 'lit/directives/choose.js'
import {DisplayConfig, displayConfigContext}                       from '../../internal/contexts/context'
import {DateTime}                                                  from './primitive.data'
import './primitive-label/primitive-label'
import './primitive-value/primitive-value'
import './primitive-error/primitive-error'
import './primitive-context/primitive-context'
import './primitive-wrapper/primitive-wrapper'

import {PrimitiveType, valueOrError} from './type-converters'
import {toCode}                      from './type-converters/toCode'
import {toDatetime}                  from './type-converters/toDatetime'
import {toDecimal}                   from './type-converters/toDecimal'
import {toError}                     from './type-converters/toError'
import {toType}                      from './type-converters/toType'
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

  @consume({context: displayConfigContext, subscribe: true})
  declare displayConfig: DisplayConfig

  @property()
  declare label: string

  @property()
  public delimiter: string = ': '

  @property()
  public value: string = ''

  @property()
  declare link: string

  @property()
  declare context: string

  @property({type: PrimitiveType, converter: convertToPrimitiveType})
  public type: PrimitiveType = PrimitiveType.none

  @property({type: Boolean})
  declare showProvided: boolean

  @property({type: Boolean})
  declare showerror: boolean

  @property()
  declare verbose: boolean

  @state()
  private error: boolean = false

  @state()
  private presentableValue: unknown = ''


  protected willUpdate(_changedProperties: PropertyValues) {
    let watchedHaveChanged = _changedProperties.has('value') || _changedProperties.has('type')
    if (watchedHaveChanged && this.value && this.type) {
      choose(this.type, [
        [PrimitiveType.none, () => (this.presentableValue = this.value) && (this.error = false)],
        [PrimitiveType.code, () => this.validOrError(toCode, this.value)],
        [PrimitiveType.url, () => this.validOrError(toUrl, this.value)],
        [PrimitiveType.uri, () => this.validOrError(toUri, this.value)],
        [PrimitiveType.decimal, () => this.validOrError(toDecimal, this.value)],
        [PrimitiveType.datetime, () => this.validOrError(toDatetime, this.value)],
        [PrimitiveType.uri_type, () => this.validOrError(toType, this.value)],
        [PrimitiveType.string_reference, () => this.validOrError(toType, this.value)],
        [PrimitiveType.forced_error, () => this.validOrError(toError, this.value)]
      ])
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (this.displayConfig) {
      this.verbose = this.displayConfig.verbose
      this.showerror = this.displayConfig.showerror
    }
  }

  protected render(): unknown {
    return this.error ? this.renderError() : this.renderValid()
  }

  //TODO: should not be an <li>. A primitive and a base element should be the same thing so the are handled the same way by the wrapper
  // TODO: should be able to put link on value OR on context
  private renderValid = (): TemplateResult => {
    return this.value || this.value == '' || this.displayConfig?.verbose
           ? html`
          <fhir-primitive-wrapper >
            <fhir-label text=${this.label} delimiter=${this.delimiter}></fhir-label>&nbsp;
            <fhir-value text=${this.showProvided ? this.value : this.presentableValue} link=${this.link}>
              <span slot="before"><slot name="before"></slot></span>
              <span slot="after"><slot name="after"></slot></span>
            </fhir-value>
            <fhir-context
                .text=${this.context ? this.context : ''}${this.context && this.displayConfig?.verbose ? ' - ' : ''}
                ${this.displayConfig?.verbose ? this.type : ''}
            ></fhir-context >
          </fhir-primitive-wrapper >`
           : html``
  }

  private renderError = (): TemplateResult => {
    return this.value || this.displayConfig.verbose
           ? html`
          <fhir-primitive-wrapper >
            <fhir-label .text=${this.label} delimiter=${this.delimiter} variant="error"></fhir-label >&nbsp;
            <fhir-value .text=${this.value} link=${this.link} variant="error"></fhir-value >
                                                                                                      ${this.displayConfig?.showerror
                                                                                                        ? html`
                                                                                                            <fhir-error text=${this.presentableValue}></fhir-error >`
                                                                                                        : nothing}
          </fhir-primitive-wrapper >`
           : html``
  }

  private validOrError = <O, V>(fn: (original: O) => V, original: O) => {
    let parsedValue = valueOrError(fn, original)

    if (parsedValue.val) {
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
      [PrimitiveType.uri_type, () => val = asReadable(val as string)]
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
