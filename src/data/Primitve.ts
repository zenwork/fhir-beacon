import {css, html, LitElement, nothing, PropertyValues} from 'lit'
import {customElement, property, state}                 from 'lit/decorators.js'
import {choose}                                         from 'lit/directives/choose.js'
import {when}                                           from 'lit/directives/when.js'

import {PrimitiveType, valueOrError} from './converters'
import {toCode}                      from './converters/ToCode'
import {toDecimal}                   from './converters/ToDecimal'
import {toUri}                       from './converters/ToUri'
import {toUrl}                       from './converters/ToUrl'

/**
 * Represents a custom element for displaying and parsing primitive values.
 *
 * @customElement
 */
@customElement('bkn-primitive')
export class Primitive extends LitElement {

  @property()
  declare label: string

  @property()
  public value: string = ''

  @property({type: PrimitiveType, converter: convertToPrimitiveType})
  public type: PrimitiveType = PrimitiveType.none

  @property({type: Boolean})
  public showError: boolean = false

  @state()
  private error: boolean = false

  @state()
  private parsedValue: unknown = ''

  static styles = css`

      .base {
          height: 1.5rem;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
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


  protected render(): unknown {
    return when(this.error,
      () => html`
          <div class="base">
              ${this.label ? html`<div>${this.label}:</div>` : nothing}
              <div class="error value"><slot name="before"></slot>&nbsp;${this.value}&nbsp;<slot name="after"></slot></div>
              ${when(this.showError,
        () => html`<div class="error message">(${this.parsedValue})</div>`,
        () => nothing)}
          </div>`,
      () => html`
          <div class="base">
              ${this.label ? html`<div>${this.label}:</div>` : nothing}
              <div class="value"><slot name="before"></slot>&nbsp;${this.parsedValue}&nbsp;<slot name="after"></slot></div> 
          </div>`
    )
  }

  protected updated(_changedProperties: PropertyValues) {
    if ((_changedProperties.has('value') || _changedProperties.has('type')) && this.value && this.type) {
      choose(this.type, [
        [PrimitiveType.none, () => (this.parsedValue = this.value) && (this.error = false)],
        [PrimitiveType.code, () => this.validOrError(toCode, this.value)],
        [PrimitiveType.url, () => this.validOrError(toUrl, this.value)],
        [PrimitiveType.uri, () => this.validOrError(toUri, this.value)],
        [PrimitiveType.decimal, () => this.validOrError(toDecimal, this.value)],
      ])
    }
  }


  private validOrError = <O, V>(fn: (original: O) => V, original: O) => {
    let parsedValue = valueOrError(fn, original)

    if (parsedValue.val) {
      this.parsedValue = parsedValue.val
      this.error = false
    }

    if (parsedValue.err) {
      this.parsedValue = parsedValue.err
      this.error = true
    }
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
