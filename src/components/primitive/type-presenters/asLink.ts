import {html, TemplateResult} from 'lit'
import {Reference}            from '../type-converters/toReference'


export const asLink = (link: Reference | typeof URL, label?: string): TemplateResult => {
  return html`<a href=${link.toString()}>${label ? label : link}</a>`
}
