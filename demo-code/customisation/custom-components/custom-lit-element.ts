import {html}                    from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirContextElement}      from '../../../src/fhir-context-element'


/**
 * Custom
 */
@customElement('custom-lit-element')
export class CustomLitElement extends FhirContextElement {

  /**
   * Custom display label attribute
   */
  @property({ reflect: true })
  declare label: string

  protected render(): unknown {
    return html`${this.label}: ${this.value}`
  }

  protected createRenderRoot() {
    return this
  }
}
