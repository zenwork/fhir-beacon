import {css} from 'lit'

export const componentStyles = css`
  :host {
    padding-top: var(--sl-spacing-2x-small);
    padding-bottom: var(--sl-spacing-2x-small);
  }

  div {
    color: var(--sl-color-gray-800);
    padding-left: var(--sl-spacing-3x-small);
    user-select: text;
  }

  .placeholder {
    color: var(--sl-color-gray-300);
    font-style: italic;
    font-family: var(--sl-font-serif);
  }

  .error {
    text-decoration: underline wavy var(--sl-color-danger-600);
  }

  .fixed-width {
    max-width: 40rem;
    word-wrap: break-word;
  }

  .hide-overflow {
    width: 30rem; /* set the initial width */
      height: 2rem; /* set the initial height */
      overflow: hidden; /* hide the overflowed text */
      transition: height 1s; /* animate height */
      word-wrap: break-word;
  }

  .hide-overflow:hover {
      height: 12rem; /* expand to the full height on hover */
      overflow-y: scroll;
      overflow-x: hidden

  }
`
