import {SlTextarea}           from '@shoelace-style/shoelace'
import {html, LitElement}     from 'lit'
import {customElement, state} from 'lit/decorators.js'
import {exportDB}             from '../indexeddb/exportDB'
import {importDB}             from '../indexeddb/importDB'

import '@shoelace-style/shoelace/dist/components/button/button.js'



@customElement('app-home')
export class AppHome extends LitElement {

  @state()
  exportData: string = ''

  @state()
  importData: string = ''


  render() {
    return html`
        <main style="margin:3rem">
            <h1>HOME</h1>
            <p>Demo app for showing capabilities of the fhir-beacon library</p>

            <h3>features</h3>
            <ol>
                <li>local - access and view locally stored files</li>
                <li>remote - query a server</li>
            </ol>
                <hr style="margin:2rem 0 2rem 0;">
            <h3>import / export</h3>
            <div style="display: flex; gap:2rem">
                <div style="display:flex;flex-direction: column; width:40vw">
                    <sl-textarea
                            rows="30"
                            placeholder="press export button to get json text"
                            value=${this.exportData}
                    >
                        <div slot="label" style="display:flex;align-items:center; margin-bottom: 1rem">
                            <sl-button @click=${() => {
                                exportDB('fileHandlesDB', 'handles').then(d => {
                                    this.exportData = d
                                    this.requestUpdate()
                                })
                            }}
                            >Export DB
                            </sl-button>
                            <sl-copy-button value=${this.exportData}></sl-copy-button>
                        </div>
                    </sl-textarea>
                </div>
                <div style="display:flex;flex-direction: column; width:40vw">
                    <sl-textarea
                            rows="30"
                            placeholder="paste json text here & press import button"
                            @sl-input=${(e: CustomEvent) => {
                                this.importData = (e.target as SlTextarea).value
                                this.requestUpdate()
                            }}
                    >
                        <div slot="label" style="display:flex;align-items:center; margin-bottom: 1rem">
                            <sl-button @click=${() => {
                                importDB(this.importData, 'fileHandlesDB', 'handles')
                                        .then(() => this.requestUpdate())
                            }}
                            >Import DB
                            </sl-button>
                            <sl-copy-button value=${this.importData}></sl-copy-button>
                        </div>
                    </sl-textarea>
                </div>
            </div>
        </main>
    `
  }
}
