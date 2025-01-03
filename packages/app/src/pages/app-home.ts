import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'



@customElement('app-home')
export class AppHome extends LitElement {



  render() {
    return html`
        <main>
            <h1>HOME</h1>
            <p>Demo app for showing capabilities of the fhir-beacon library</p>
            
            <h3>features</h3>
            <ol>
                <li>local - access and view locally stored files</li>
                <li>remote - query a server</li>
            </ol>
        </main>
    `
  }
}
