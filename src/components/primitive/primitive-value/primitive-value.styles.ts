import {css} from 'lit'

export let componentStyles = css`
  :host {
    padding-top: var(--sl-spacing-2x-small);
    padding-bottom: var(--sl-spacing-2x-small);
  }

  div {
    color: var(--sl-color-gray-800);
    padding-left: var(--sl-spacing-3x-small);
  }

  .placeholder {
    color: var(--sl-color-gray-300);
    font-style: italic;
    font-family: var(--sl-font-serif);
  }

  .error {
    text-decoration: underline wavy var(--sl-color-danger-600);
  }
`
