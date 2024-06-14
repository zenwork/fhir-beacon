import {LitElement} from 'lit'
import {state}      from 'lit/decorators.js'

export abstract class ShoelaceStyledElement extends LitElement {


  @state()
  protected isSlotted = false

  public connectedCallback() {
    super.connectedCallback()
    // TODO: figure out the best way to provide the standrad css theme. At the moment this is blocking overriding in specific locations
    // if (this.shadowRoot) loadShoelaceStylesFromPage(this.shadowRoot)
  }

}
