import {html}                    from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {ShoelaceStyledElement}   from '../../../shell/shoelace-styled-element'
import {componentStyles}         from './primitive-error.styles'

@customElement('fhir-error')
export class PrimitiveError extends ShoelaceStyledElement {

  static styles = componentStyles

  @property()
  declare text: string

  protected render(): unknown {

    if (this.text) {
      return html`
        <div part="message" id="message">${this.text}</div >`
    }

    return html``
  }
}
