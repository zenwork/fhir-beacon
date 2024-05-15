import {css, html, LitElement}   from 'lit'
import {customElement, property} from 'lit/decorators.js'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-structure-wrapper
 * @slot wrapper
 */
@customElement('fhir-structure-wrapper')
export class StrucutreWrapper extends LitElement {

  static styles = css`
      ::part(wrapper) {
          margin-bottom: 0.5rem;
      }

      ::part(label) {
          font-size: 1.05rem;
          font-weight: bold;
          color: darkslategray;
          /*text-decoration-line: underline;*/
      }

      ::part(value) {
          display: inline-block;
          white-space: nowrap;
          border-radius: 0.2rem;
          border: solid 0.1rem #676f7e;
          padding: 0.2rem 0.2rem 0.2rem 1rem;
          background: lightgoldenrodyellow;
          font-size: smaller;
          min-height: 1rem;
          min-width: 20rem;
      }
  `
  @property({type: String})
  label: string = ''

  protected render(): unknown {
    return html`
        <div part="wrapper">
            <article part="element">
                <header part="label">${this.label}:</header>
                <section part="value">
                    <slot></slot>
                </section>
            </article>
        </div>`
  }

}
