import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-wrapper
 * @slot wrapper
 */
@customElement('fhir-wrapper')
export class Wrapper extends LitElement {

  protected render(): unknown {
    return html`
        <div part="wrapper" style="border-radius: 0.2rem; border: solid 0.1rem #0c2d6b; padding:0.2rem;background: #fcfcfc;">
            <slot></slot>
        </div>`
  }

}
