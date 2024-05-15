import {css, html, LitElement, nothing, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}                                 from 'lit/decorators.js'
import {choose}                                                         from 'lit/directives/choose.js'
import {when}                                                           from 'lit/directives/when.js'

import {PrimitiveType, valueOrError} from './converters'
import {toCode}                      from './converters/ToCode'
import {toDatetime}                  from './converters/ToDatetime'
import {toDecimal}                   from './converters/ToDecimal'
import {toType}                      from './converters/ToType'
import {toUri}                       from './converters/ToUri'
import {toUrl}                       from './converters/ToUrl'
import {asDateTime}                  from './presenters/asDateTime'
import {asReadable}                  from './presenters/asReadable'
import {DateTime}                    from './structures'

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
  public value: string = ''

  @property({type: PrimitiveType, converter: convertToPrimitiveType})
  public type: PrimitiveType = PrimitiveType.none

  @property({type: Boolean})
  public showError: boolean = false

  static styles = css`

      .base {
          height: 1.5rem;
          padding: 0;
          display: flex;
          align-items: center;
          font-size: 1rem;
          margin: 0 0 0.3rem;
      }

      .label {
          font-size: 1.05rem;
          font-weight: bold;
          color: darkslategray;
      }

      .error {
          font-style: italic;
      }

      .value {
          font-size: 1rem;
          padding: 0.2rem;
          margin: 0 0.5rem;
      }

      .message {
          padding: 0.2rem;
          margin: 0 0.5rem;
          color: #f35656;
          border-radius: 0.2rem;
          background-color: #f3d3d8;
          font-size: 0.8rem;
      }`

  @property({type: Boolean})
  public showOriginal: boolean = false

  @property()
  declare link: string
  @property()
  public verbose: boolean = false
  @state()
  private error: boolean = false
  @state()
  private presentableValue: unknown = ''

  protected render(): unknown {
    console.log('renderrrr')
    return when(this.error, this.renderError(), this.renderValid())
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    console.log('will update')
    let watchedHaveChanged = _changedProperties.has('value') || _changedProperties.has('type') || _changedProperties.has('original')
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
      ])
    }
  }

  private renderValid = (): () => TemplateResult => {
    if (this.value || this.verbose) {
      return () => when(this.link,
        () => html`
            <div class="base">
                ${this.label ? html`
                    <div class="label">${this.label}:</div>` : nothing}
                <div class="value">
                    <slot name="before"></slot>&nbsp;<a href=${this.link}>${this.showOriginal ? this.value : this.presentableValue}</a>&nbsp;<slot
                        name="after"></slot>
                </div>
            </div>`,
        () => html`
            <div class="base">
                ${this.label ? html`
                    <div class="label">${this.label}:</div>` : nothing}
                <div class="value">
                    <slot name="before"></slot>&nbsp;${this.showOriginal ? this.value : this.presentableValue}&nbsp;<slot
                        name="after"></slot>
                </div>
            </div>`
      )
    }

    return () => html``
  }

  private renderError = (): () => TemplateResult => {
    return () => html`
        <div class="base">
            ${this.label ? html`
                <div class="label">${this.label}:</div>` : nothing}
            <div class="error value">
                <slot name="before"></slot>&nbsp;${this.value}&nbsp;<slot name="after"></slot>
            </div>
            ${when(this.showError,
                    () => html`
                        <div class="error message">(${this.presentableValue})</div>`,
                    () => nothing)}
        </div>`
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
      [PrimitiveType.uri_type, () => val = asReadable(val as string)],
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
