import {SignalWatcher}                         from '@lit-labs/signals'
import {SlRadioButton, SlTab, SlTabGroup}      from '@shoelace-style/shoelace'
import {DisplayMode}                           from 'fhir-beacon'
import {css, html, LitElement, TemplateResult} from 'lit'
import {customElement, property, query, state} from 'lit/decorators.js'
import {until}                                 from 'lit/directives/until.js'
import {BrowserState, FhirData}                from '../state/browser-state'



@customElement('data-viewer')
export class DataViewer extends SignalWatcher(LitElement) {

  static styles = [

    css`
      #sl-tab-1::part(base) {
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

     
      sl-tab-panel::part(base) {
        padding: 0;
        
      }
        
        sl-divider{
          padding-top: 0;
          margin-top:0;
        }
    `
  ]

  @property({ attribute: false, type: BrowserState })
  declare state: BrowserState

  @query('sl-tab-group')
  declare tabGroup: SlTabGroup

  @state()
  private mode: string = 'display'

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
                >
                    <sl-icon-button name="trash3-fill" @click=${() => {
                        this.state.selected.splice(0, this.state.selected.length)
                        this.requestUpdate()
                    }}
                    ></sl-icon-button>
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
                        ${(this.renderToolbar(file))}
                        <div style="margin-left: 5rem; margin-top:2rem">
                        ${until(this.toResource(file), this.renderSkeleton())}
                        </div>
                    </sl-tab-panel>
                `
            })}

        </sl-tab-group>
    `
  }

  private renderToolbar(file: FhirData): TemplateResult<1> {
    return html`
        <div style="display:flex; align-items: center">
            <sl-copy-button .value=${until(file.data.then(d => JSON.stringify(d, null, 2)), 'n/a')}>
            </sl-copy-button>
            <div style="flex-grow:1">&nbsp;</div>
            ${this.switchGroup(file)}
            ${this.modeRadioGroup(file)}
        </div>
        <sl-divider></sl-divider>
    `
  }

  private renderSkeleton(): TemplateResult {
    return html`
        <span style="margin:2rem">
                               <div class="skeleton-overview">
                                  <header>
                                    <sl-skeleton></sl-skeleton>
                                    <sl-skeleton></sl-skeleton>
                                  </header>
                                
                                  <sl-skeleton></sl-skeleton>
                                  <sl-skeleton></sl-skeleton>
                                  <sl-skeleton></sl-skeleton>
                                </div>
                                
                                <style>
                                  .skeleton-overview header {
                                      display: flex;
                                      align-items: center;
                                      margin-bottom: 1rem;
                                  }

                                  .skeleton-overview header sl-skeleton:last-child {
                                      flex: 0 0 auto;
                                      width: 30%;
                                  }

                                  .skeleton-overview sl-skeleton {
                                      margin-bottom: 1rem;
                                  }

                                  .skeleton-overview sl-skeleton:nth-child(1) {
                                      float: left;
                                      width: 3rem;
                                      height: 3rem;
                                      margin-right: 1rem;
                                      vertical-align: middle;
                                  }

                                  .skeleton-overview sl-skeleton:nth-child(3) {
                                      width: 95%;
                                  }

                                  .skeleton-overview sl-skeleton:nth-child(4) {
                                      width: 80%;
                                  }
                                </style>
                            </span>`
  }
  private async toResource(file: FhirData): Promise<TemplateResult> {
    return file.data
               .then((d: any) => {

                 let resource = html``
                 const type: string | null | undefined = file.type ?? d.resourceType
                 const text = JSON.stringify(d, null, 2)
                 if (type) {
                   switch (type) {
                     case 'Medication':
                       resource = html`
                           <fhir-medication .data=${d}
                                            ?showerror=${file.showerrors}
                                            ?headless=${file.headless}
                                            .mode=${file.mode}
                                            ?open=${file.open}
                           >
                               >
                           </fhir-medication>`
                       break
                     case 'Patient':
                       resource = html`
                           <fhir-patient .data=${d}
                                         ?showerror=${file.showerrors}
                                         ?headless=${file.headless}
                                         .mode=${file.mode}
                                         ?open=${file.open}
                           >

                           </fhir-patient>`
                       break
                     case 'Appointment':
                       resource = html`
                           <fhir-appointment .data=${d}
                                             ?showerror=${file.showerrors}
                                             ?headless=${file.headless}
                                             .mode=${file.mode}
                                             ?open=${file.open}
                           >
                           </fhir-appointment>`
                       break
                     case 'Slot':
                       resource = html`

                           <fhir-slot .data=${d}
                                      ?showerror=${file.showerrors}
                                      ?headless=${file.headless}
                                      .mode=${file.mode}
                                      ?open=${file.open}
                           >
                           </fhir-slot>`
                       break
                     case 'Bundle':
                       resource = html`
                           <fhir-bundle .data=${d}
                                        ?showerror=${file.showerrors}
                                        ?headless=${file.headless}
                                        .mode=${file.mode}
                                        ?open=${file.open}
                           >
                           </fhir-bundle>`
                       break
                     case 'Account':
                       resource = html`
                           <fhir-account .data=${d}
                                        ?showerror=${file.showerrors}
                                        ?headless=${file.headless}
                                        .mode=${file.mode}
                                        ?open=${file.open}
                           >
                           </fhir-account>`
                       break
                     default:

                       resource = html`

                           <h3>Narrative
                               <sl-copy-button .value=${JSON.stringify(d.text, null, 2)}
                                               ?disabled=${!d.text}
                               ></sl-copy-button>
                           </h3>
                           ${d.text ? html`
                               <fhir-narrative .data=${d.text} headless></fhir-narrative>
                           ` : html`
                               <div style="width:43rem">
                                   <sl-alert variant="warning" open>
                                       <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
                                       <strong>No Narrative </strong><br/>
                                       Narrative is not available for this resource instance.
                                   </sl-alert>
                               </div>
                           `}
                           <sl-divider></sl-divider>
                           <h3>JSON
                               <sl-copy-button .value=${text}></sl-copy-button>
                           </h3>
                           <fhir-debug .data=${d}></fhir-debug>

                       `
                   }
                 }
                 return Promise.resolve(resource)
               })

  }

  private modeRadioGroup(file: FhirData): TemplateResult {
    return html`
        <sl-radio-group
                name="mode"
                .value="${file.mode}"
                @sl-change=${(e: CustomEvent) => {
                    file.mode = (e.target as SlRadioButton).value as DisplayMode
                    console.log(
                            'sl-change',
                            this.state.selected.find(f => f.name === file.name))
                    this.requestUpdate()

                }}
        >
            <sl-radio-button .value=${DisplayMode.display}>
                <sl-icon name="file-text" label="display"></sl-icon>
            </sl-radio-button>
            <sl-radio-button .value=${DisplayMode.structure}>
                <sl-icon name="bar-chart-steps" label="structure"></sl-icon>
            </sl-radio-button>
            <sl-radio-button .value=${DisplayMode.narrative}>
                <sl-icon name="file-code" label="narrative"></sl-icon>
            </sl-radio-button>
            <sl-radio-button .value=${DisplayMode.debug}>
                <sl-icon name="bug" label="debug"></sl-icon>
            </sl-radio-button>
        </sl-radio-group>
        <br>
    `
  }

  private switchGroup(file: FhirData): TemplateResult {
    return html`
        <sl-button-group label="Switches">
            <sl-tooltip .content="${file.open ? 'expand' : 'collapse'}">
                <sl-icon-button
                        label="expand/collapse"
                        name="${file.open ? 'arrows-expand' : 'arrows-collapse'}"

                        ?disabled=${file.mode !== DisplayMode.structure}
                        @click=${() => {
                            file.open = !file.open
                            this.requestUpdate()
                        }}
                ></sl-icon-button>
            </sl-tooltip>
            <sl-tooltip .content="${file.showerrors ? 'show error messages' : 'hide error messages'}">
                <sl-icon-button
                        label="show/hide error messages"
                        name="${file.showerrors ? 'file-earmark-excel' : 'file-earmark-x'}"

                        ?disabled=${file.mode === DisplayMode.narrative || file.mode === DisplayMode.debug}
                        @click=${() => {
                            file.showerrors = !file.showerrors
                            this.requestUpdate()
                        }}
                ></sl-icon-button>
            </sl-tooltip>
            <sl-tooltip .content="${file.headless ? 'hide header' : 'show header'}">
                <sl-icon-button
                        label="show/hide error messages"
                        name="${file.headless ? 'person-fill-slash' : 'person-fill-check'}"

                        ?disabled=${file.mode === DisplayMode.narrative || file.mode === DisplayMode.debug}
                        @click=${() => {
                            file.headless = !file.headless
                            this.requestUpdate()
                        }}
                ></sl-icon-button>
            </sl-tooltip>
            


        </sl-button-group>
        <br>
    `
  }
}
