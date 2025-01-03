import {Router}           from '@lit-labs/router'
import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'
import {remoteBrowser}    from './pages/fs/./remote/remote-browser'

import './pages/app-home'
import './pages/fs/state/browser-state'
import './pages/fs/local/local-chooser'
import './pages/fs/remote/remote-chooser'
import './pages/fs/data-viewer'
import './pages/fs/directory_storage'
import './pages/app-about/app-about'
import './styles/global.css'
import {localBrowser}     from './pages/fs/local/local-browser'
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
