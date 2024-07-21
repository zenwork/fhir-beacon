import {LitElement} from 'lit'
import {HtmlTags}   from './html-tags'

export function queryShadow<E extends HTMLElement>(el: LitElement, tag: HtmlTags | string): E {
  return el.renderRoot.querySelector(tag)! as E
}
