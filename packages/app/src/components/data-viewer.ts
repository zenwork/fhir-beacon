import {SignalWatcher}                         from '@lit-labs/signals'
import {SlTab, SlTabGroup}                     from '@shoelace-style/shoelace'
import {css, html, LitElement, TemplateResult} from 'lit'
import {customElement, property, query, state} from 'lit/decorators.js'
import {until}                                 from 'lit/directives/until.js'
import {BrowserState, FhirData}                from '../state/browser-state'



@customElement('data-viewer')
export class DataViewer extends SignalWatcher(LitElement) {

  static styles = [

    css`
      #sl-tab-1::part(base){
        padding-left: 0;
        padding-right: 0;
        width: 2rem
      }
      .clear-tab sl-icon-button::part(base) {
        width: 2rem;
        color: red;
      }
      .clear-tab sl-icon-button::part(base) {
        width: 2rem;
        color: red;
      }
      
      sl-tab-panel {
        margin-left: 5rem;
        margin-top: 5rem;
      }
    `
  ]

  @property({ attribute: false, type: BrowserState })
  declare state: BrowserState

  @query('sl-tab-group')
  declare tabGroup: SlTabGroup

  @state()
  private mode: string='display'

  protected render() {
    return html`

        <sl-tab-group @sl-close=${(event: any) => {
            if (this.tabGroup) {
                const tab: SlTab | null = event.target as SlTab
                if (tab) {
                    const index = this.state.selected.findIndex(f => f.name === tab.panel)
                    this.state.selected.splice(index, 1)
                }

            }
        }}
        >
            <sl-tab slot="nav">
                <div class="clear-tab"
                ><sl-icon-button name="trash3-fill" @click=${() => {
                    this.state.selected.splice(0, this.state.selected.length)
                    this.requestUpdate()
                }}></sl-icon-button>    
                </div>
            </sl-tab>

            ${this.state.selected.map((file, index, files) => {

                return html`
                    <sl-tab slot="nav"
                            panel="${file.name}"
                            ?active=${files.length === index + 1}
                            closable
                            data-id="${file.name}"
                    >
                        ${file.name}
                    </sl-tab>
                    <sl-tab-panel name="${file.name}" ?active=${files.length === index + 1} data-id="${file.name}">
                        ${until(this.toResource(file), html`<span>Loading...</span>`)}
                    </sl-tab-panel>
                `
            })}

        </sl-tab-group>
    `
  }

  private async toResource(file: FhirData): Promise<TemplateResult> {
    let resource = html``
    const type: string | null | undefined = file.type
    if (type) {

      switch (type) {
        case 'Medication':
          resource = html`
              ${this.addMode()}

              <fhir-medication .data=${until(file.data,html`loading...`)} showerror headless .mode=${this.mode} open></fhir-medication>`
          break
        case 'Patient':
          resource = html`
              ${this.addMode()}
              <fhir-patient .data=${until(file.data,html`loading...`)} showerror headless .mode=${this.mode} open></fhir-patient>`
          break
        case 'Appointment':
          resource = html`
              ${this.addMode()}
              <fhir-appointment .data=${until(file.data,html`loading...`)} showerror headless .mode=${this.mode} open></fhir-appointment>`
          break
        case 'Slot':
          resource = html`
              ${this.addMode()}
              <fhir-slot .data=${until(file.data,html`loading...`)} showerror headless .mode=${this.mode} open></fhir-slot>`
          break
        default:
          //TODO: create option to show summary
          resource = html`
              <pre><code>${JSON.stringify(await file.data, null, 2)}</code></pre>
          `
      }
      return resource
    }
    return Promise.resolve(resource)
  }

  private addMode(): TemplateResult {
    return html`
        <sl-radio-group label="Display Mode" name="a" value="${this.mode}" @sl-change=${(e:CustomEvent)=> {
            // @ts-ignore
            this.mode = e.target?.value
                   
        }}>
            <sl-radio-button value="display">display</sl-radio-button>
            <sl-radio-button value="structure">structure</sl-radio-button>
            <sl-radio-button value="narrative">narrative</sl-radio-button>
            <sl-radio-button value="debug">debug</sl-radio-button>
        </sl-radio-group>
        <br>
    `
  }
}
