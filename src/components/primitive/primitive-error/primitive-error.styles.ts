import {css} from 'lit'

export let componentStyles = css`
  :host {
    padding-left: var(--sl-spacing-small);
    padding-top: var(--sl-spacing-2x-small);
    padding-bottom: var(--sl-spacing-2x-small);
  }
  #message {
    padding-left: var(--sl-spacing-2x-small);
    padding-right: var(--sl-spacing-2x-small);
    background: var(--sl-color-danger-200);
    color: var(--sl-color-danger-950);
    font-style: italic;
    border-radius: var(--sl-border-radius-small);
  }
`
