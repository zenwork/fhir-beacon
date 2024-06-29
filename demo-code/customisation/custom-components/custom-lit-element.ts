import {html, TemplateResult}    from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirContextElement}      from '../../../src/fhir-context-element'


/**
 * Custom Lit element example
 */
@customElement('custom-lit-element')
export class CustomLitElement extends FhirContextElement {

  /**
   * Custom display label attribute
   */
  @property({ reflect: true })
  declare label: string

  protected render(): TemplateResult {
    return html`${this.label}: ${this.value}`
  }

  protected createRenderRoot() {
    return this
  }
}
