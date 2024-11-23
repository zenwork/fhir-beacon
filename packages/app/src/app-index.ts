import {Router}                from '@lit-labs/router'
import {css, html, LitElement} from 'lit'
import {customElement}         from 'lit/decorators.js'

import './pages/app-home'
import './pages/app-slot'
import './pages/app-book'
import './pages/app-query'
import './pages/app-about/app-about'
import './styles/global.css'
import './components'


@customElement('app-index')
export class AppIndex extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        margin: 1rem;
        border: 1px solid #ccc;
        border-radius: 1rem;
        box-shadow: 0.7rem 0.7rem 0.8rem rgba(114, 114, 114, 0.5);
        padding: 1rem;
        height: 900px;
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
          <app-query></app-query>`
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
