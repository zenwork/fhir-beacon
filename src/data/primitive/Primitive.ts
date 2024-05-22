import {html, LitElement, nothing, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}                            from 'lit/decorators.js'
import {choose}                                                    from 'lit/directives/choose.js'

import {PrimitiveType, valueOrError} from './converters'
import {toCode}                      from './converters/ToCode'
import {toDatetime}                  from './converters/ToDatetime'
import {toDecimal}                   from './converters/ToDecimal'
import {toError}                     from './converters/ToError'
import {toType}                      from './converters/ToType'
import {toUri}                       from './converters/ToUri'
import {toUrl}                       from './converters/ToUrl'
import {asDateTime}                  from './presenters/asDateTime'
import {asReadable}                  from './presenters/asReadable'
import {DateTime}                    from './structures'
import './PrimitiveLabel'
import './PrimitiveValue'
import './PrimitiveError'
import './PrimitiveContext'
import './PrimitiveWrapper'

/**
 * Represents a custom element for displaying and parsing primitive values.
 *
 * @customElement
 */
//TODO: rename to fhir-primitive. Maybe needs to be split into a lower level true primitive and a presentation-flexible primitive.
@customElement('fhir-primitive')
export class Primitive extends LitElement {


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

  @property({type: Boolean, attribute: 'showerror'})
  declare showerror: boolean

  @property({type: Boolean})
  declare showOriginal: boolean

  @property()
  declare verbose: boolean

  @state()
  private error: boolean = false

  @state()
  private presentableValue: unknown = ''

  protected render(): unknown {
    return this.error ? this.renderError() : this.renderValid()
  }

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

  //TODO: should not be an <li>. A primitive and a base element should be the same thing so the are handled the same way by the wrapper
  // TODO: should be able to put link on value OR on context
  private renderValid = (): TemplateResult => {
    return this.value || this.verbose
           ? html`
          <fhir-primitive-wrapper >
            <fhir-label text=${this.label} delimiter=${this.delimiter}></fhir-label>&nbsp;
            <fhir-value text=${this.presentableValue} link=${this.link}>
              <span slot="before"><slot name="before"></slot></span>
              <span slot="after"><slot name="after"></slot></span>
            </fhir-value>
            <fhir-context .text=${this.context ? this.context : ''}${this.context && this.verbose ? ' - ' : ''} ${this.verbose ? this.type : ''}></fhir-context>
          </fhir-primitive-wrapper >`
           : html``
  }

  private renderError = (): TemplateResult => {
    return this.value || this.verbose
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
