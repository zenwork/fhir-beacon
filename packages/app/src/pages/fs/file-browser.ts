import {html}             from '@lit-labs/signals'
import {FileBrowserState} from './state/file-browser-state'
import '../../../../library/index'



export function fileBrowser() {


  const appState = new FileBrowserState()

  return html`
      <file-chooser slot="navigation" .state=${appState} style="background: #2f2f2f"></file-chooser>
      <file-viewer .state=${appState}></file-viewer>
  `

}
