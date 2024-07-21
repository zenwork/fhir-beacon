// eslint-disable-next-line @typescript-eslint/no-unused-vars
import format              from 'html-format'
import {LitElement}        from 'lit'
import {IllegalStateError} from './lit-vitest-fixture'

function getInnerHTML(element: LitElement): string {
  if (element && element.shadowRoot) {
    let shadowDomMarkup = element.shadowRoot.innerHTML
    shadowDomMarkup = shadowDomMarkup.replace(/<!--[\s\S]*?-->/g, '').replace(/\n\s*\n/g, '\n')
    return format(shadowDomMarkup)
  }

  throw new IllegalStateError('unable to extract inner html')
}
