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


}
