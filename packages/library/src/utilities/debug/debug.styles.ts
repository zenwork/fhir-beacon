import {css} from 'lit'

export const componentStyles = css`
  div {
    padding: 0;
    margin: 0;

  }

  ul {
    display: inline-block;
    background-color: var(--sl-color-blue-200);
    color: #0c2d6b;
    border-radius: 0.5rem;
    border: solid 0.1rem var(--sl-color-blue-400);
    margin: 0.5rem;
    padding: 0.5rem 1rem;
  }

  li {
    font-family: monospace;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    list-style-type: none;
    color: var(--sl-color-yellow-900);
  }

  pre {
    max-width: 40rem;
    word-wrap: anywhere;
    white-space: pre-wrap;
    margin: 0rem;
    padding: 0.3rem;
    color: var(--sl-color-blue-800);
    border-radius: 0.5rem;
    background-color: var(--sl-color-blue-300);
  }

  .key {
    font-weight: bold;
  }
`
