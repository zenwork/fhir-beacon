import {SignalWatcher}                    from '@lit-labs/signals'
import {html, LitElement, PropertyValues} from 'lit'
import {customElement, property, state}   from 'lit/decorators.js'
import {FhirElementData}            from '../../../../library/src/internal'
import {FhirFile, FileBrowserState} from './state/file-browser-state'



@customElement('file-viewer')
export class FileViewer extends SignalWatcher(LitElement) {

  @property({ attribute: false, type: FileBrowserState })
  declare state: FileBrowserState

  @state()
  private data: FhirElementData | null = null

  protected willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes)
    const file: FhirFile | null = this.state.selected.get()
    if (file) {
      file.blob.text().then(text => {
        this.data = JSON.parse(text)
        this.requestUpdate('data')
      })
    }

  }

  protected render() {


    let resource = html``
    const type: string | null | undefined = this.state.selected.get()?.type
    if (type) {
      switch (type) {
        case 'Medication':
          resource = html`
              <fhir-medication .data=${this.data} showerror headless></fhir-medication>`
          break
        case 'Patient':
          resource = html`
              <fhir-patient .data=${this.data} showerror headless></fhir-patient>`
          break
        case 'Appointment':
          resource = html`
              <fhir-appointment .data=${this.data} showerror headless></fhir-appointment>`
          break
        default:
          //TODO: create option to show summary
          resource = html`
              <pre><code>${JSON.stringify(this.data, null, 2)}</code></pre>
          `
      }
    }


    return html`
        <h3>${this.state.selected.get()?.type}</h3>
        ${resource} 
    `
  }
}
