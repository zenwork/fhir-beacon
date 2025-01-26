import {SlTextarea}           from '@shoelace-style/shoelace'
import {html, LitElement}     from 'lit'
import {customElement, state} from 'lit/decorators.js'
import {exportDB}             from '../indexeddb/exportDB'
import {importDB}             from '../indexeddb/importDB'
import sample                 from './sample.json' assert {type: 'json'}

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
            <ul>
                <li><h4>general</h4>
                    <p>This app is a demo space. At the moment there are two simple data browsers.</p>
                    <h5>Known Issues</h5>
                    <ol>
                        <li>Some UI components used are subject to CORS issues if you are running this behind a
                            corporate firewall or VPN.
                        </li>
                        <li>Medication, Patient, and Observation have received the most attention</li>
                    </ol>
                </li>
                <li><h4>local client</h4>
                    <p>In this tab you can access and view locally stored FHIR json files</p>
                    <h5>Known Issues</h5>
                    <ol>
                        <li>The library only supports a few resource types at the moment. They come up first in the
                            drop-down menu
                        </li>
                        <li>Only work on desktop browsers that support local file access. Support varies. The best
                            experience is on Chrome on desktop.
                        </li>
                    </ol>
                </li>
                <li><h4>remote client</h4>
                    <p>In this tab you can access and view remote data. You can load sample queries by pressing the 'Use
                       HAPI-FHIR Sample' button and the 'Import DB'. You can also export your queries with the 'Export
                       DB' button and then copy/pasting the export data somewhere.</p>
                    <h5>Known Issues</h5>
                    <ol>
                        <li>only supports GET</li>
                        <li>only tested against the HAPI FHIR test site</li>

                    </ol>
                </li>
            </ul>
            <hr style="margin:2rem 0 2rem 0;">
            <h3>import / export for
                <r></r>
                emote client
            </h3>
            <p>Use this area to import or export remote queries. </p>
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
                            value=${this.importData}
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
                            <sl-button @click=${() => {
                                this.importData = JSON.stringify(sample, null, 2)
                                this.requestUpdate()
                            }}
                            >Use HAPI-FHIR Sample
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
