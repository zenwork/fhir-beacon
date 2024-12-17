import {css} from 'lit'



export const componentStyles = css`
  :host {
    user-select: text;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    list-style-type: none;
    align-items: baseline;
    padding: 0;
    margin: 0;
  }

  sl-badge {
    padding-left: var(--sl-spacing-x-small);
  }

  sl-badge::part(base) {
    color: var(--sl-color-gray-400);
    background-color: var(--sl-color-gray-100);
    border-color: var(--sl-color-gray-300);
    font-weight: var(--sl-font-weight-normal);
    font-style: italic;
  }

  sl-input::part(form-control-label) {
    font-size: 16px;
  }

  sl-input::part(input) {
    font-size: 15px;
  }

  .code {
    font-weight: bold
  }

  .display {
    color: gray
  }

`
