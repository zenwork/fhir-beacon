import {Decorated, DisplayConfig, Identifier, IdentifierData, PrimitiveType, Validations} from 'fhir-beacon'
import {css, html, TemplateResult}                                                        from 'lit'
import {customElement, state}                                                             from 'lit/decorators.js'

@customElement('app-identifier-form')
export class AppIdentifierForm extends Identifier {
  static styles = [
    css`
      sl-input {
        margin: 0.5rem;
      }

    `
  ]

  @state()
  private toggle: boolean = false


  // @ts-ignore
  public renderDisplay(config: DisplayConfig,
                       data: Decorated<IdentifierData>,
                       validations: Validations): TemplateResult[] {

    return [
      html`
          <form @submit=${(evt: SubmitEvent) => {
              evt.preventDefault()

          }}
          >
              <sl-switch @sl-change=${() => this.toggle = !this.toggle}>edit</sl-switch>
              <br/>
              <br/>
              <br/>
              <fhir-primitive key="use"
                              .value=${data.use}
                              type=${PrimitiveType.code}
                              ?input=${this.toggle}
                              @change=${(evt: CustomEvent) => {
                                  data.system = evt.detail.value
                                  this.requestUpdate()
                              }
                              }
              ></fhir-primitive>
              <fhir-not-supported label="type" description="not implemented"></fhir-not-supported>
              <fhir-primitive key="system"
                              .value=${data.system}
                              type=${PrimitiveType.uri}
                              ?input=${this.toggle}
                              @change=${(evt: CustomEvent) => {
                                  data.system = evt.detail.value
                                  this.requestUpdate()
                              }
                              }
              ></fhir-primitive>
              <fhir-primitive key="value"
                              .value=${data.value}
                              type=${PrimitiveType.id}
                              ?input=${this.toggle}
                              @change=${(evt: CustomEvent) => {
                                  data.value = evt.detail.value
                                  this.requestUpdate()
                              }
                              }
              ></fhir-primitive>
              <fhir-not-supported label="period" description="period form not implemented"></fhir-not-supported>
              <fhir-not-supported label="assigner" description="reference form not implemented"></fhir-not-supported>

              <br/>
              <br/>
              <sl-button type='submit'>validate</sl-button>
          </form>
          <br/>
          <br/>
          <br/>
          <br/>
          <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
      `
    ]
  }
}
