import {Router}           from '@lit-labs/router'
import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'

import './pages/app-home'
import './pages/app-search'
import './pages/app-about/app-about'
import './components/header'
import './styles/global.css'


@customElement('app-index')
export class AppIndex extends LitElement {
  private routes: Router = new Router(this, [
    {
      path: '/',
      render: () => html`
          <app-home></app-home>`
    },
    {
      path: '/search',
      render: () => html`
          <app-search></app-search>`
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
        <app-header></app-header>
        ${this.routes.outlet()}
    `
  }
}
