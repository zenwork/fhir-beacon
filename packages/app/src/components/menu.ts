import {css, html, LitElement} from 'lit'
import {customElement}         from 'lit/decorators.js'



@customElement('app-menu')
export class Menu extends LitElement{

  static styles = [css`
    :host {
        padding: 0
    }
    sl-button::part(base) {
      display: inline-block;
    }

    .image-cropper {
      width: 48px;
      height: 48px;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
    }

    img {
      display: inline;
      margin: 0 auto;
      height: 100%;
      width: auto;
    }
  `]

  render(){
     return html`
         <div style="display:flex; align-items: center; width:100% ">
             <sl-button size="small" variant="text" href="/"><div class="image-cropper" style="flex-grow:1"><img src="../../public/assets/icons/48x48.png"></div></sl-button>
             <div style="flex-grow:1"><h3>FHIR Beacon Showcase</h3></div>
             <sl-button size="small" variant="text" href="/file">local</sl-button>
             <sl-button size="small" variant="text" href="/server">remote</sl-button>
         </div>
     `
   }

}
