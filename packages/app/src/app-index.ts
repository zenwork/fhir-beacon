import {Router}           from '@lit-labs/router'
import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'
import {fileBrowser}      from './pages/fs/file-browser'

import './pages/app-home'
import './pages/app-slot'
import './pages/app-book'
import './pages/fs/state/file-browser-state'
import './pages/fs/file-browser'
import './pages/fs/file-chooser'
import './pages/fs/file-viewer'
import './pages/fs/directory_storage'
import './pages/app-query'
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
      path: '/slot',
      render: () => html`
          <app-slot></app-slot>`
    },
    {
      path: '/book',
      render: () => html`
          <app-book></app-book>`
    },
    {
      path: '/query',
      render: () => html`
          <app-dir-storage></app-dir-storage>`
    },
    {
      path: '/file',
      render: () => fileBrowser()
    },
    {
      path: '/about',
      render: () => html`
          <p>
              <app-about></app-about>
          </p> `
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
