import {css, html}     from 'lit'
import {customElement} from 'lit/decorators.js'
import {FhirElement}   from '../../FhirElement'

@customElement('fhir-primitive-wrapper')
export class PrimitiveWrapper extends FhirElement {

  static styles = css`
    li {
      display: flex;
      list-style-type: none;
    }
  `

  protected render(): unknown {
    return html`
      <li part="wrapper">
        <slot ></slot >
      </li >
    `
  }
}
