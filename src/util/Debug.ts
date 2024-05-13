import {css, html, LitElement, nothing, PropertyValues} from 'lit'

import {customElement, property} from 'lit/decorators.js'
import {map}                     from 'lit/directives/map.js'
import {when}                    from 'lit/directives/when.js'


export function debug(debug: boolean, data: {}) {
  return when(debug,
    () => html`
        <bkn-debug .data=${data}></bkn-debug>`,
    () => nothing)
}

@customElement('bkn-debug')
export class Debug extends LitElement {

  @property({type: Object})
  public data: {} = {}

  private longest = 0

  static styles = css`
      div {
          padding: 0;
          margin: 0;
      }

      ol {
          display: inline-block;
          background: #dddddd;
          color: #0c2d6b;
          border-radius: 0.3rem;
          margin: 0.5rem;
          padding: 0.5rem 2rem;
      }

      li {
          font-family: monospace;
          font-size: 0.6rem;
          margin-top: 0.5rem;
      }

      pre {
          margin: 0;
      }

      .key {
          font-weight: bold;
      }
  `

  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)
    if (_changedProperties.has('data')) {
      this.longest = 0
      Object
        .entries(this.data)
        .forEach(([key, _]) => {
            if (key.length > this.longest) {this.longest = key.length}
          }
        )
    }
  }


  protected render(): unknown {
    return html`
        <div>
            <ol>${map(Object.entries(this.data),
                    (i) => html`
                        <li><span class="key">${i[0].padStart(this.longest, '\u00A0')}</span> :
                            <pre>${(Debug.stringify(i[1]))}</pre>
                        </li>`)}
            </ol>
        </div>
    `
  }

  private static stringify = (i: unknown) => {
    let value = JSON.stringify(i, null, 2)
    if (value.charAt(0) === '"') {
      value = value.substring(1)
      if (value.charAt(value.length - 1) === '"') {value = value.substring(0, value.length - 1)}
    } else {

      value = value.replace(/[{}\[\]]/g, '')
      value = value.replace(/\n\s+\n/g, '')
      value = value.replace(/:\s+/g, ': ')
    }
    return value
  }


}
