import {css} from 'lit'

export let componentStyles = css`
    :host {
      padding-top: var(--sl-spacing-2x-small);
      padding-bottom: var(--sl-spacing-2x-small);
    }

    label {
      color: var(--sl-color-primary-700);
    }

    /* TODO: variants should be formalised */
    .error {
      font-style: italic;

    }

  `
