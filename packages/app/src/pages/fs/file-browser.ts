import {html}                      from '@lit-labs/signals'
import '../../../../library/index'
import {FileBrowserState, FSState} from './state/file-browser-state'



export function fileBrowser() {

    const appState: FSState = new FileBrowserState()

  return html`

      <div slot="main-header">
          <h3>File</h3></h3>
      </div>
      <div slot="navigation-header" style="background: #2f2f2f">files</div>
      <file-chooser slot="navigation" .state=${appState} style="background: #2f2f2f"></file-chooser>
      <file-viewer .state=${appState}></file-viewer>
  `

}
