import {css, html, LitElement, nothing, PropertyValues} from 'lit'
import {customElement, property, state}                 from 'lit/decorators.js'
import {choose}                                         from 'lit/directives/choose.js'
import {when}                                           from 'lit/directives/when.js'
import {PrimitiveType, toCode, toUrl, validOrError}     from './Primitives'

@customElement('bkn-primitive')
export class Primitive extends LitElement {

  @property()
  public value: string = ''

  @property({type: PrimitiveType, converter: converter})
  public type: PrimitiveType = PrimitiveType.none

  @property({type: Boolean})
  public showError: boolean = false

  @state()
  private error: boolean = false

  @state()
  private parsedValue: string = ''

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
              <div class="error value">${this.value}</div>
              ${when(this.showError, 
                      () => html`<div class="error message">(${this.parsedValue})</div>`, 
                      () => nothing)}
          </div>`,
      () => html`
          <div class="base">
              <div class="value">${this.parsedValue}</div>
          </div>`
    )
  }

  protected updated(_changedProperties: PropertyValues) {
    if ((_changedProperties.has('value') || _changedProperties.has('type')) && this.value && this.type) {
      choose(this.type, [
        [PrimitiveType.none, () => (this.parsedValue = this.value) && (this.error = false)],
        [PrimitiveType.code, () => this.validOrError(toCode, this.value)],
        [PrimitiveType.url, () => this.validOrError(toUrl, this.value)],
      ])
    }
  }

  private validOrError = (fn: (code: string) => any, v: string) => {
    let parsedValue = validOrError(fn, v)

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

function converter(value: string | null): PrimitiveType {
  return value ? <PrimitiveType>value : PrimitiveType.none
}
