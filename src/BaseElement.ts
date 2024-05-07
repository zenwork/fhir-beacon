import {html, LitElement, TemplateResult} from 'lit'
import {property}                         from 'lit/decorators.js'
import {BaseElementData}                  from './data/Structures'
import {debug} from './Debug'


export class BaseElement extends LitElement {

  @property({type: Boolean})
  public debug: boolean = false

  @property({type: Boolean})
  public input: boolean = false

  @property({type: Object, attribute: 'data'})
  declare data: BaseElementData & { [key: string]: any }

  protected renderDebug(): TemplateResult {
    return html`${debug(this.debug, this.data)}`
  }

}
