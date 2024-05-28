import {CSSResultGroup, html} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {FhirElement}          from '../../../shell/FhirElement'
import {componentStyles}      from './primitive-wrapper.styles'

@customElement('fhir-primitive-wrapper')
export class PrimitiveWrapper extends FhirElement {

  static styles: CSSResultGroup = [componentStyles]

  protected render(): unknown {
    return html`
      <li part="wrapper">
        <slot ></slot >
      </li >
    `
  }
}
