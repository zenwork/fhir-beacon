import {SlDropdown}              from '@shoelace-style/shoelace'
import {css, html, LitElement}   from 'lit'
import {customElement, property} from 'lit/decorators.js'



@customElement('fhir-system-choice')
export class SystemChoice extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: flex-end;
      }

      sl-input {
        flex-grow: 1;
      }

      sl-input::part(form-control-label) {
        font-size: 16px;
      }

      sl-input::part(input) {
        font-size: 15px;
      }

      sl-icon-button {
        margin-right: 0.2rem;
      }

      sl-icon-button::part(base) {
        padding: 0;
      }
    `
  ]

  @property()
  public value: string = ''

  @property({ type: Boolean })
  public overridable: boolean = false

  @property()
  declare valuesets: { value: string, label: string }[]

  @property()
  public label: string = ''

  @property()
  public error: string = ''

  constructor() {
    super()
    this.addEventListener('sl-select', (evt: CustomEvent) => {
      this.value = this.valuesets.filter(v => v.value === evt.detail.item.value)[0].value
      this.dispatchEvent(new CustomEvent('fhir-change',
                                         { bubbles: true, composed: true, detail: { value: this.value } }))
      evt.stopImmediatePropagation()
    })

    this.addEventListener('fhir-system-choice', async (evt: CustomEvent) => {
      const dropdown = this.renderRoot.querySelector('#dd') as SlDropdown
      if (dropdown) await dropdown.show()
      evt.stopImmediatePropagation()
    })

  }

  //TODO: using the sl-icon instead of a button
  protected render(): unknown {
    const mapping: { value: string; label: string }[] = this.valuesets.filter(v => v.value === this.value)
    return html`
        <sl-input name=${this.id}
                  value=${mapping.length == 1 ? mapping[0].label : 'unknown'}
                  size="small"
                  .readonly=${!this.overridable}
        >
            <fhir-label slot="label" text=${this.label}></fhir-label>
            <fhir-error slot="help-text" text=${this.error}></fhir-error>
            <sl-dropdown id="dd"
                         slot="suffix"
                         distance="10"
                         skidding="-20"
                         placement="right-start"
                         hoist
            >
                <sl-icon-button name="chevron-down"
                                label="Settings"
                                slot="trigger"
                                @click=${(evt: Event) => {
                                    this.dispatchEvent(new CustomEvent('fhir-system-choice',
                                                                       { bubbles: true, composed: true }))
                                    evt.stopImmediatePropagation()

                                }}
                ></sl-icon-button>
                <sl-menu>
                    ${this.valuesets.map(set => html`
                        <sl-menu-item value=${set.value}>${set.label}</sl-menu-item>
                    `)}
                </sl-menu>
            </sl-dropdown>

        </sl-input>

    `
  }
}
