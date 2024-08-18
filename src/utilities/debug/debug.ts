import {html, LitElement, nothing, PropertyValues} from 'lit'

import {customElement, property} from 'lit/decorators.js'
import {map}                     from 'lit/directives/map.js'
import {when}                    from 'lit/directives/when.js'
import {hostStyles}              from '../../styles/hostStyles'
import {componentStyles}         from './debug.styles'


export function debug(debug: boolean, data: object) {
  return when(
    debug,
    () => html`
      <fhir-debug .data=${data}></fhir-debug >`,
    () => nothing
  )
}

@customElement('fhir-debug')
export class Debug extends LitElement {

  @property({type: Object})
  public data: object = {}

  private longest = 0

  static styles = [hostStyles, componentStyles]

  private static stringify = (i: unknown) => {
    let value = JSON.stringify(
      i, null, 4
    )
    if (value.charAt(0) === '"') {
      value = value.substring(1)
      if (value.charAt(value.length - 1) === '"') {value = value.substring(0, value.length - 1)}
    } else {

      // value = value.replace(/[{}\[\]]/g, '')
      // value = value.replace(/\n\s+\n/g, '')
      // value = value.replace(/:\s+/g, ': ')
    }
    return value
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)
    if (_changedProperties.has('data')) {
      this.longest = 0
      Object
        .entries(this.data)
        .forEach(([key]) => {
          if (key.length > this.longest) {this.longest = key.length}
        })
    }
  }

  protected render(): unknown {
    return html`
        <div>
          <ul >${map(Object.entries(this.data),
                    (i) => html`
                      <li ><span class="key">${i[0]}</span > :
                            <pre>${(Debug.stringify(i[1]))}</pre>
                        </li>`)}
          </ul >
        </div>
    `
  }


}
