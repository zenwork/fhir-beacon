import {css} from 'lit'

export let componentStyles = css`

  label {
    font-size: var(--sl-font-size-medium);
    color: var(--sl-color-neutral-500);
    font-style: oblique;
  }


  #arrow {
    color: var(--sl-color-gray-300);
    font-style: italic;
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-medium);
    font-family: var(--sl-font-serif), serif;
  }

  #content {
    display: table;
    margin-left: var(--sl-spacing-medium);

  }

  .primary {
    color: var(--sl-color-primary-700);
  }

  .secondary {
    color: var(--sl-color-gray-700);
  }
`
