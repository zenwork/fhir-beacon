import {LitElement} from 'lit'

export class ShoelaceStyledElement extends LitElement {

  protected isSlotted() {
    try {
      return this.shadowRoot!.querySelector('slot')!.assignedNodes()!.length > 0
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false
    }

  }

  public connectedCallback() {
    super.connectedCallback()
    // TODO: figure out the best way to provide the standrad css theme. At the moment this is blocking overriding in specific locations
    // if (this.shadowRoot) loadShoelaceStylesFromPage(this.shadowRoot)
  }

}
