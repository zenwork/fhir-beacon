import {deepQuerySelector, deepQuerySelectorAll} from 'shadow-dom-testing-library'
import {beforeAll}                               from 'vitest'
import {IllegalStateError}                       from './tests/lit-vitest-fixture'
import {queryDefaultSlot, querySlot}             from './tests/query-slot'

// TODO: loading everything for now... should not do this once proper separation of import trees
import './index'

HTMLElement.prototype.deepQuerySelector = function <T extends HTMLElement>(selector: string | string[]): T {
  if (typeof selector === 'string') {
    const result = deepQuerySelector<T>(this, selector)
    if (result) {
      return result
    }

    throw new IllegalStateError('deepQuerySelector: element not found')

  } else {

    let result: any = document

    selector.forEach((sel) => {
      const temp = deepQuerySelector<HTMLElement>(result, sel)
      if (temp) {
        result = temp
      } else {
        throw new IllegalStateError('deepQuerySelector: element not found')
      }
    })

    if (result !== document) {
      return result as T
    }

    throw new IllegalStateError('deepQuerySelector: element not found')

  }
}

HTMLElement.prototype.deepQuerySelectorAll = function <T extends HTMLElement>(selector: string | string[]): T[] {
  if (typeof selector === 'string') {
    const result = deepQuerySelectorAll<T>(this, selector)
    if (result) {
      return result
    }

    throw new IllegalStateError('deepQuerySelectorAll: element not found')
  } else {

    let result: any = document

    selector.forEach((sel) => {
      const temp = deepQuerySelectorAll<HTMLElement>(result, sel)
      if (temp) {
        result = temp
      } else {
        throw new IllegalStateError('deepQuerySelectorAll: element not found')
      }
    })

    if (result !== document) {
      return result as T[]
    }

    throw new IllegalStateError('deepQuerySelectorAll: element not found')

  }
}


HTMLElement.prototype.queryDefaultSlot = function (): Node[] {
  return queryDefaultSlot(this)
}

HTMLElement.prototype.querySlot = function (slotName: string): Element[] {
  return querySlot(this, slotName)
}

const doubleSpace = / {2}/g
const litComments = /<!--.*-->/gm
const doubleSpaced = /\n\s+\n/gm
HTMLElement.prototype.logShadowDOM = function (): void {
  try {
    let shadow = 'n/a'
    if (this.shadowRoot) {
      shadow = this.shadowRoot.innerHTML?.replace(litComments, '').replace(doubleSpace, ' ').replace(doubleSpaced, '\n') ?? ''
      shadow = shadow ?? this.shadowRoot.textContent
    }
    const light = this.innerHTML.replace(litComments, '').replace(doubleSpace, ' ').replace(doubleSpaced, '\n')
    const tag = this.tagName.toLowerCase()
    const outerHTML = this.outerHTML
    const tagAndAttributes = outerHTML.substring(0, outerHTML.indexOf('>') + 1)
    let data: string = ''
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (this.data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data = pad(JSON.stringify(this.data, null, 2))
    }
    console.log(`${tagAndAttributes}\n  #shadow-dom${shadow}\n  #light-dom${light}\n  #data\n${data}\n\n</${tag}>`)
  } catch (e) { console.log(e) }
}

function pad(input: string) {
  // Split the input string into an array of lines
  const lines = input.split('\n')

  // Pad each line with two spaces
  const paddedLines = lines.map(line => '    ' + line)

  // Join the padded lines back into a single string
  const output = paddedLines.join('\n')

  return output
}

beforeAll(() => {
  document.head.innerHTML = `
  <!-- Loads a font from a CDN -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
<link
    href="https://fonts.googleapis.com/css2?family=Assistant&family=Courier+Prime&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Yanone+Kaffeesatz&display=swap"
    rel="stylesheet"
>
<!-- Load your CSS file -->
<link
    crossorigin="anonymous"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    rel="stylesheet"
    title="fhir-style"
>
<link
    crossorigin="anonymous"
    href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/themes/light.css"
    rel="stylesheet"
    title="fhir-style"
/>
<script src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/shoelace.js" type="module"></script >

<!--<link rel="stylesheet" href="path/to/your/styles.css" />-->
<style>


  .roboto-thin {
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    font-style: normal;
  }

  .roboto-light {
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: normal;
  }

  .roboto-regular {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .roboto-medium {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  .roboto-bold {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  .roboto-black {
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    font-style: normal;
  }

  .roboto-thin-italic {
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    font-style: italic;
  }

  .roboto-light-italic {
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: italic;
  }

  .roboto-regular-italic {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: italic;
  }

  .roboto-medium-italic {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: italic;
  }

  .roboto-bold-italic {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-style: italic;
  }

  .roboto-black-italic {
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    font-style: italic;
  }

  body {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  ::part(domain-resource) {
    border: var(--sl-color-neutral-200) solid 0.1rem;
    border-radius: 0.2rem;
    background: var(--sl-color-neutral-100);

  }
</style>
  `
})
