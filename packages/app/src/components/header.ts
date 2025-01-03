import {css, html, LitElement} from 'lit'
import {customElement}         from 'lit/decorators.js'

import '@shoelace-style/shoelace/dist/components/button/button.js'



@customElement('app-header')
export class AppHeader extends LitElement {

  static styles = [
    css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
      }

      h1 {
        flex-grow: 1;
        margin: 0;
      }
    `
  ]


  render() {
    return html`
        <header>
            <h1>App</h1>
        </header>
    `
  }
}
