import {css} from 'lit'

export const componentStyles = css`
  :host {
    padding-left: var(--sl-spacing-small);
    padding-top: var(--sl-spacing-x-small);
    padding-bottom: var(--sl-spacing-x-small);
  }
  #message {
    padding-left: var(--sl-spacing-2x-small);
    padding-right: var(--sl-spacing-2x-small);
    background: var(--sl-color-danger-300);
    color: var(--sl-color-neutral-50);
    font-style: italic;
    border-radius: var(--sl-border-radius-small);
  }
`
