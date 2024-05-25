import {LitElement} from 'lit'
import {state}      from 'lit/decorators.js'
import {loadStyles} from './util/LoadCss'

export abstract class FhirElement extends LitElement {

  @state()
  protected isSlotted = false

  public connectedCallback() {
    super.connectedCallback()
    if (this.shadowRoot) loadStyles(this.shadowRoot)
  }

}
