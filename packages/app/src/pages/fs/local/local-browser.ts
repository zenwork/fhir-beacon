import {html}         from '@lit-labs/signals'
import {BrowserState} from '../state/browser-state'
import '../../../../../library/index'



export function localBrowser() {


  const appState = new BrowserState()

  return html`
      <local-chooser slot="navigation" .state=${appState} style="background: #2f2f2f"></local-chooser>
      <data-viewer .state=${appState}></data-viewer>
  `

}
