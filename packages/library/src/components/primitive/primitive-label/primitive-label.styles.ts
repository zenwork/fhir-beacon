import {css} from 'lit'

export const componentStyles = css`
  :host {
    padding-left: var(--sl-spacing-2x-small);
    padding-top: var(--sl-spacing-2x-small);
    padding-bottom: var(--sl-spacing-2x-small);
    user-select: text; /* Allow text selection within shadow DOM */
  }

  label {
    color: var(--sl-color-primary-700);
    user-select: text;
  }

  /* TODO: variants should be formalised */
  .error {
    font-style: italic;

  }

`
