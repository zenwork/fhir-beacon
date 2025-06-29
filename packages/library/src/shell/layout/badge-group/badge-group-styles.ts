import {css} from 'lit'



export const componentStyles = css`

  :host {
    --badge-color: var(--sl-color-gray-500);
    --badge-background: var(--sl-color-gray-100);
    --badge-border: var(--sl-color-gray-300);

    padding: 0;
    margin: 0;
  }

  sl-badge {
    padding-left: var(--sl-spacing-x-small);
    margin: 0;
  }

  sl-badge::part(base) {
    color: var(--badge-color);
    background-color: var(--badge-background);
    border-color: var(--badge-border);
    font-weight: var(--sl-font-weight-normal);
    font-style: italic;
  }
`
