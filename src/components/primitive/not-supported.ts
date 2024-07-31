import {html, LitElement}        from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {PrimitiveType}           from './type-converters/type-converters'

@customElement('fhir-not-supported')
export class NotSupported extends LitElement {

  @property()
  declare description: string

  @property()
  declare label: string

  @property()
  declare variant: string

  protected render(): unknown {

    if (this.label && this.description && !this.variant) {
      return html`
        <fhir-wrapper >
          <fhir-primitive label="${this.label}" value="${this.description}" .type=${PrimitiveType.forced_error}></fhir-primitive >
        </fhir-wrapper >`
    }

    if (this.variant == 'no-impl') {
      return html`
        <fhir-primitive label="${this.label || 'error'}" value="Not Implemented Yet" .type=${PrimitiveType.forced_error}></fhir-primitive >
      `
    }

    if (this.variant == 'no-sup') {
      return html`
        <fhir-primitive label="${this.label || 'error'}" value="Not Supported" .type=${PrimitiveType.forced_error}></fhir-primitive >
      `
    }

    if (this.variant == 'stop') {
      return html`
        <fhir-primitive
            label="${this.label
                     || 'error'}" value="rendering interrupted due to modelling constraint" .type=${PrimitiveType.forced_error}
        ></fhir-primitive >
      `
    }


    if (!this.label && this.description && !this.variant) {
      return html`
        <fhir-wrapper >
          ${this.description}
        </fhir-wrapper >`
    }

    return html`
      <fhir-wrapper >
        <fhir-primitive label="error" value="Undefined reason" .type=${PrimitiveType.forced_error}></fhir-primitive >
        <slot ></slot >
      </fhir-wrapper >`


  }
}
