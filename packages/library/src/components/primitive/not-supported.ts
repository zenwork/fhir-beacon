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
  declare error: string

  @property()
  declare variant: string

  protected createRenderRoot() {
    return this
  }

  protected render(): unknown {
    if (!this.variant && (this.label || this.description)) {
      return html`
          <fhir-primitive .label="${this.label}" .value="${this.description}" .errormessage=${this.error} .type=${PrimitiveType.forced_error}></fhir-primitive >
      `
    }

    switch (this.variant) {
      case 'no-data':
        return html`
          <fhir-primitive
                  .label="${this.label ?? 'error'}"
                  .value="${this.description ?? 'No data provided.'}"
            errormessage="the data or data-path property must be provided"
            .type=${PrimitiveType.forced_error}
          >
          </fhir-primitive >
        `

      case 'no-impl':
        return html`
            <fhir-primitive .label="${this.label}" .value="${this.description}" errormessage="Not Implemented" .type=${PrimitiveType.forced_error}>
            </fhir-primitive >
        `

      case 'no-sup':
        return html`
            <fhir-primitive .label="${this.label}" .value="${this.description}" errormessage="Not Supported" .type=${PrimitiveType.forced_error}>
            </fhir-primitive >
        `

      case 'stop':
        return html`
            <fhir-primitive .label="${this.label
                                      || 'error'}" value="Rendering Stopped" .errormessage=${this.error} .type=${PrimitiveType.forced_error}
            >
            </fhir-primitive >
        `

      default:
        return html`
            <fhir-primitive label="error" value="Undefined reason" errormessage="The reason is unknown" .type=${PrimitiveType.forced_error}></fhir-primitive >
            <slot ></slot >
        `
    }
  }
}
