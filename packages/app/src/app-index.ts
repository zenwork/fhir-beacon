import {Router}           from '@lit-labs/router'
import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'
import {remoteBrowser}    from './pages/browser/./remote/remote-browser'
import {localBrowser}     from './pages/browser/local/local-browser'

import './pages/app-home'
import './pages/browser/state/browser-state'
import './pages/browser/local/local-chooser'
import './pages/browser/remote/remote-chooser'
import './pages/browser/data-viewer'
import './pages/app-about/app-about'
import './styles/global.css'
import './components'



@customElement('app-index')
export class AppIndex extends LitElement {

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
            <app-menu slot="header"></app-menu>
<!--            <app-header slot="subheader"></app-header>-->
            ${this.routes.outlet()}
        </wa-page>

    `
  }

  protected createRenderRoot() {
    return this;
  }
}
