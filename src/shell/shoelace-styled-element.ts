import {LitElement} from 'lit'
import {state}      from 'lit/decorators.js'

import {loadShoelaceStylesFromPage} from '../styles/loadShoelaceStylesFromPage'

export abstract class ShoelaceStyledElement extends LitElement {


  @state()
  protected isSlotted = false

  public connectedCallback() {
    super.connectedCallback()
    if (this.shadowRoot) loadShoelaceStylesFromPage(this.shadowRoot)
  }

}
