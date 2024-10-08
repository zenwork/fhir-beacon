import {css} from 'lit'

export const componentStyles = css`
  sl-details::part(base) {
    border: none;
    border-radius: 0;
    display: inline-flex;
    background: none;
    padding: 0 0 0 0.3rem;
  }

  sl-details::part(header) {
    padding: var(--sl-spacing-small);
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  sl-details::part(header) {
    /*border-bottom: dotted var(--sl-spacing-3x-small) var(--sl-color-neutral-200);*/

  }

  sl-details::part(summary-icon) {
    padding: 0 0 0 0;
    margin: 0 0 0 var(--sl-spacing-large);
  }

  sl-details::part(content) {
    padding: var(--sl-spacing-small);
  }

  label {
    font-size: var(--sl-font-size-medium);
    color: var(--sl-color-primary-700);
  }

  sl-badge {
    padding-left: var(--sl-spacing-x-small)
  }

  sl-badge::part(base) {
    color: var(--sl-color-gray-400);
    background-color: var(--sl-color-gray-100);
    border-color: var(--sl-color-gray-300);
    font-weight: var(--sl-font-weight-normal);
    font-style: italic;
  }

  #arrow {
    color: var(--sl-color-gray-300);
    font-style: italic;
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-medium);
    font-family: var(--sl-font-serif), serif;
  }

  ul {
    padding: 0 0 0 var(--sl-spacing-x-small);
    margin: 0;
    border-left-style: solid;
    border-left-width: 0.06rem;
    border-left-color: var(--sl-color-primary-300);
  }

  i {
    font-size: var(--sl-font-size-x-small);
    color: var(--sl-color-gray-400)
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
