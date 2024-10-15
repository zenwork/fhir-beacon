import {css}        from 'lit'
import {hostStyles} from './hostStyles'

export const textHostStyles = [
  css`
    :host {
      display: inline;
    }
    ::slotted(*) {
      user-select: text;
    }
  `,
  hostStyles
]
