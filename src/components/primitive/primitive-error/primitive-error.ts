import {html}                    from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirElement}             from '../../../shell/FhirElement'
import {componentStyles}         from './primitive-error.styles'

@customElement('fhir-error')
export class PrimitiveError extends FhirElement {
  static styles = componentStyles
  @property()
  declare text: string

  protected render(): unknown {
    return html`
      <div part="message" id="message">${this.text}</div>`
  }
}
