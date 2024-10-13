import {css} from 'lit'

export const componentStyles = css`

  :host {
    width: 100%;
    display: flex;
    flex: 1;
    --badge-color: var(--sl-color-gray-400);
    --badge-background: var(--sl-color-gray-100);
    --badge-border: var(--sl-color-gray-300));
  }


  label {
    font-style: italic;
    font-weight: 500;
    color: var(--sl-color-primary-700);
    margin-right: 0.5rem;
  }

  #arrow {
    margin-left: var(--sl-spacing-small);
    color: var(--sl-color-gray-400);
    font-style: italic;
    font-size: var(--sl-font-size-large);
    font-weight: var(--sl-font-weight-medium);
    font-family: var(--sl-font-serif), serif;
  }

  .items {
    margin: var(--sl-spacing-3x-small) 0 0 var(--sl-spacing-x-small);
    padding: 0;
    border-left-style: unset;
    border-left-width: 0.06rem;
  }


  .details_items {
    margin: var(--sl-spacing-3x-small) 0 0 var(--sl-spacing-x-small);
    padding: 0 0 0 var(--sl-spacing-2x-small);
    border-left-style: solid;
    border-left-width: 0.06rem;
    border-left-color: var(--sl-color-neutral-100);
  }

  ::part(wrapped) {
    padding-left: 0.3rem;
  }

  sl-details::part(base) {
    border: none;
    border-radius: 0;
    background: none;
    margin-top: 0.3rem;
    padding: 0 0 0 0;
  }

  sl-details::part(header) {
    padding: var(--sl-spacing-small);
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  sl-details::part(summary-icon) {
    padding: 0 0 0 0;
    margin: 0 0 0 var(--sl-spacing-large);
  }

  sl-details::part(content) {
    display: flex;
    flex: 1;
    padding: 0 0 0 0;
  }

  sl-details.custom-icons::part(summary-icon) {
    /* Disable the expand/collapse animation */
    rotate: none;
  }

  sl-icon {
    color: var(--sl-color-neutral-300);
  }

  .variant-error-label {
    color: var(--sl-color-neutral-50);
    font-weight: normal;
    background-color: var(--sl-color-red-300);
    padding: 0.2rem;
    border-radius: 0.2rem;
  }

  .variant-error {
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: var(--sl-color-red-100);
    border-radius: 0.5rem;
  }


`
