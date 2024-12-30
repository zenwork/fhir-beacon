import {Router}                from '@lit-labs/router'
import {css, html, LitElement} from 'lit'
import {customElement}         from 'lit/decorators.js'

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
import {fileBrowser}           from './pages/fs/file-browser'



@customElement('app-index')
export class AppIndex extends LitElement {
  static styles = [
    css`
      :host {
        /*display: block;*/
        /*margin: 1rem;*/
        /*border: 1px solid #ccc;*/
        /*border-radius: 1rem;*/
        /*box-shadow: 0.7rem 0.7rem 0.8rem rgba(114, 114, 114, 0.5);*/
        /*padding: 1rem;*/
        /*height: 900px;*/
      }
      
      wa-page::part(navigation) {
       border-right: 10px solid #ccc;
      }
    `
  ]


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
      path: '/about',
      render: () => html`
          <p>
              <app-about></app-about>
          </p> `
    },
    {
      path: '/file',
      render: () => fileBrowser()
    }
  ])


  // render() {
  //   return html`
  //           <app-header slot="header"></app-header>
  //           <div slot="navigation">${this.routes.outlet()}</div>
  //
  //   `
  // }
  render() {
    return html`
        <wa-page class="wa-theme-default-dark">
            <app-menu slot="header"></app-menu>
            <app-header slot="subheader"></app-header>
            ${this.routes.outlet()}
        </wa-page>

    `
  }
  protected createRenderRoot() {
    return this;
  }
}
