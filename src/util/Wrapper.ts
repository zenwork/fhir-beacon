import {css, html, LitElement}   from 'lit'
import {customElement, property} from 'lit/decorators.js'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-wrapper
 * @slot wrapper
 */
@customElement('fhir-wrapper')
export class Wrapper extends LitElement {

  static styles = css`
      ::part(wrapper) {
          border-radius: 0.2rem;
          border: solid 0.1rem #676f7e;
          padding: 0.2rem;
          background: #fffcfc;
      }

      ::part(element) {
      }

      ::part(label) {
          text-decoration-line: underline;
      }

      ::part(value) {
          margin: 0.75rem;
          font-size: smaller;
      }
  `
  @property({type: String})
  label: string = ''

  protected render(): unknown {
    return html`
        <div part="wrapper">
            <article part="element">
                <header part="label">${this.label}</header>
                <section part="value">
                    <slot></slot>
                </section>
            </article>
        </div>`
  }

}