import {html, nothing} from 'lit'
import {customElement} from 'lit/decorators.js'
import {join}          from 'lit/directives/join.js'
import {when}          from 'lit/directives/when.js'
import {BaseElement}   from './BaseElement'


@customElement('bkn-coding')
export class Coding extends BaseElement {

  protected render(): unknown {
    return when(this.input,
      () => join([
        html`${this.data?.display ? this.data.display : 'n/a'}`,
        super.renderDebug()
      ], nothing),
      () => html`${this.data?.display ? this.data.display : 'n/a'}${super.renderDebug()}`
    )
  }

  // protected render(): unknown {
  //   return html``
  // }

}
