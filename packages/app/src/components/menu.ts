import {css, html, LitElement} from 'lit'
import {customElement}         from 'lit/decorators.js'



@customElement('app-menu')
export class Menu extends LitElement{

  static styles = [css`
  sl-button::part(base) {
    display: inline-block;
  }
  `]
  render(){
     return html`
         <sl-button size="small" variant="text" href="/" >Home</sl-button>
<!--         <sl-button size="small" variant="text" href="/slot">Slots</sl-button>-->
<!--         <sl-button size="small" variant="text" href="/book">Appointments</sl-button>-->
<!--         <sl-button size="small" variant="text" href="/query">Back-Office Query</sl-button>-->
         <sl-button size="small" variant="text" href="/file">Files</sl-button>
         <sl-button size="small" variant="text" href="/about">About</sl-button>
     `
   }
}
