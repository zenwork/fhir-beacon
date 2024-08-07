import {css} from 'lit'

export const componentStyles = css`

  .base {
    background: none;
    padding: 0 0 0 0.3rem;
  }

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

  .content {
    display: table;
    margin-left: var(--sl-spacing-medium);

  }

  .primary {
    color: var(--sl-color-primary-700);
  }

  .secondary {
    color: var(--sl-color-gray-700);
  }

  .validation-error {
    background-color: var(--sl-color-red-300);
    padding: 0.2rem;
    border-radius: 0.2rem;
  }

  .validation-error-border {
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: var(--sl-color-red-100);
    border-radius: 0.5rem;
  }
`
