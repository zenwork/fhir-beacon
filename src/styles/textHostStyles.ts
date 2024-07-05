import {css}        from 'lit'
import {hostStyles} from './hostStyles'

export const textHostStyles = [
  css`
    :host {
      user-select: text;
    }
  `,
  hostStyles
]
