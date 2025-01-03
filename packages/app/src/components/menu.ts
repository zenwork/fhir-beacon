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
         <div>
             
         <sl-button size="small" variant="text" href="/" >home</sl-button>
         <sl-button size="small" variant="text" href="/file">local</sl-button>
         <sl-button size="small" variant="text" href="/server">remote</sl-button>
         </div>
     `
   }

}
