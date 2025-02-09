import {html, TemplateResult} from 'lit'
import {Ref}                  from '../primitive.data'



export const asLink = (link: Ref | typeof URL, label?: string): TemplateResult => {
  return html`<a href=${link.toString()}>${label ? label : link}</a>`
}
