import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'

import '@shoelace-style/shoelace/dist/components/button/button.js'

@customElement('app-header')
export class AppHeader extends LitElement {



  render() {
    return html`
        <header>
            <h1>FHIR Beacon App</h1>
            <sl-button size="small" href="/">Home</sl-button>
            <sl-button size="small" href="/about">About</sl-button>
            <sl-button size="small" href="/search">Search</sl-button>

        </header>
    `
  }
}
