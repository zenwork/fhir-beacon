import {html}         from '@lit-labs/signals'
import {BrowserState} from '../state/browser-state'
import '../../../../../library/index'



export function remoteBrowser() {


  const appState = new BrowserState()

  return html`
      <remote-chooser slot="navigation" .state=${appState} style="background: #2f2f2f"></remote-chooser>
      <data-viewer .state=${appState}></data-viewer>
  `

}
