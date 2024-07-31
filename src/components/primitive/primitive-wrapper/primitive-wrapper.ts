import {html}                  from 'lit'
import {customElement}         from 'lit/decorators.js'
import {ShoelaceStyledElement} from '../../../shell/shoelace-styled-element'
import {textHostStyles}        from '../../../styles/textHostStyles'
import {componentStyles}       from './primitive-wrapper.styles'

@customElement('fhir-primitive-wrapper')
export class PrimitiveWrapper extends ShoelaceStyledElement {

  static styles = [textHostStyles, componentStyles]

  protected render(): unknown {

    if (this.hasChildNodes()) {
      return html`
        <li part="wrapper">
          <slot ></slot >
        </li >
      `
    }

    return html``
  }


}
