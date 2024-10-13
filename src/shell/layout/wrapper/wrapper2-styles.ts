import {css} from 'lit'

export const componentStyles = css`

  :host {
    --badge-color: var(--sl-color-gray-400);
    --badge-background: var(--sl-color-gray-100);
    --badge-border: var(--sl-color-gray-300));
  }


  label {
    font-weight: bold;
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
    padding: 0;
    border-left-style: solid;
    border-left-width: 0.06rem;
    border-left-color: var(--sl-color-primary-300);
  }

  ::part(wrapped) {
    padding-left: 0.3rem;
  }

  sl-details::part(base) {
    border: none;
    border-radius: 0;
    display: inline-flex;
    background: none;
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
    padding: 0 0 0 0;
  }

  sl-details.custom-icons::part(summary-icon) {
    /* Disable the expand/collapse animation */
    rotate: none;
  }


`
