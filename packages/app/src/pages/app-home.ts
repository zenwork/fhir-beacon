import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'


@customElement('app-home')
export class AppHome extends LitElement {



  render() {
    return html`
        <main>
            HOME
        </main>
    `
  }
}