import {Router}                from '@lit-labs/router'
import {css, html, LitElement} from 'lit'
import {customElement}         from 'lit/decorators.js'
import {localBrowser}          from './pages/local/local-browser'
import {remoteBrowser}         from './pages/remote/remote-browser'



export * from './pages/app-home'
export * from './state/browser-state'
export * from './pages/local/local-chooser'
export * from './pages/remote/remote-chooser'
export * from './components/data-viewer'
export * from './styles/global.css'
export * from './components'



@customElement('app-index')
export class AppIndex extends LitElement {

  static styles = [css`
    wa-page::part(header) {
      padding:0
    }
    
  `]

  private routes: Router = new Router(this, [
    {
      path: '/',
      render: () => html`
          <app-home></app-home>`
    },
    {
      path: '/file',
      render: () => localBrowser()
    },
    {
      path: '/server',
      render: () => remoteBrowser()
    }
  ])


  render() {
    return html`
        <wa-page class="wa-theme-default-dark">
            <app-menu slot="header" style="padding: 0;"></app-menu>
            ${this.routes.outlet()}
        </wa-page>

    `
  }

  protected createRenderRoot() {
    return this;
  }
}
