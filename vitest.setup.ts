import './index'
import format                                from 'html-format'
import {deepQuerySelectorAll, shadowQueries} from 'shadow-dom-testing-library'
import {beforeAll}                           from 'vitest'
// TODO: loading everything for now... should not do this once proper separation of import trees
import {queryDefaultSlot, querySlot}         from './tests/shadowDomUtils/query-slot'
import {hostOf}                              from './tests/shadowDomUtils/shadowDomUtils'
import {Query}                               from './tests/types/global'

Element.prototype.queryShadow =
  function <T extends Element | Element[]>({ select, expect = 1 }: Query): T {

    let results: any[] = [this]

    if (typeof select === 'string') {
      results = deepQuerySelectorAll(results[0], select)
    }

    if (Array.isArray(select)) {
      // search down stack of values
      let intermediateSet: any[] = results

      select.forEach((sel) => {
        intermediateSet = intermediateSet.map((el) => deepQuerySelectorAll(el, sel)).flat()
      })

      if (intermediateSet) {
        results = intermediateSet
      } else {
        throw new BeaconTestError('deepQuerySelector: element not found')
      }
    }

    if (results) {
      if (results.length === expect) {
        if (results.length === 1) {
          return results[0] as T
        }
        return results as T
      }

      const found = results ? results.length : '0'
      const paths = results.map(hostOf).join('\n')
      throw new BeaconTestError(`deepQuerySelectorAll: unexpected number of elements found for: ${select}.\nexpected: ${expect}\nfound: ${found}\nelements:\n${paths}`)
    }

    throw new BeaconTestError('deepQuerySelectorAll: selector must be a string or and array of strings')

  }
Element.prototype.shadowedChildren = function (): HTMLCollection {
  return this.shadowRoot ? this.shadowRoot.children : new HTMLCollection()
}


Element.prototype.queryShadowDefaultSlot = function (): Node[] {
  return queryDefaultSlot(this as HTMLElement)
}

Element.prototype.queryShadowNamedSlot = function (slotName: string): Element[] {
  return querySlot(this as HTMLElement, slotName)
}

const doubleSpace = / {2}/g
const litComments = /<!--.*-->/gm
const doubleSpaced = /\n\s+\n/gm
Element.prototype.logShadow = function (): void {
  try {
    let shadow = ''
    if (this.shadowRoot) {
      shadow = format(
        this.shadowRoot.innerHTML?.replace(litComments, '').replace(doubleSpace, ' ').replace(doubleSpaced, '\n') ?? '',
        ' '.repeat(4),
        60
      )
      shadow = shadow ?? this.shadowRoot.textContent
    }
    const light = format(
      this.innerHTML.replace(litComments, '').replace(doubleSpace, ' ').replace(doubleSpaced, '\n'), ' '.repeat(4), 60
    )
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
    console.log(`${tagAndAttributes}\n  #shadow-dom\n${shadow}\n\n  #light-dom\n${light}\n\n  #data\n${data}\n\n</${tag}>`)
  } catch (e) { console.log(e) }
}

Element.prototype.queryShadowByText = function <T extends Element>(text: string): T | null {
  return shadowQueries.queryByShadowText(this as HTMLElement, text) as T | null
}


function pad(input: string) {
  // Split the input string into an array of lines
  const lines = input.split('\n')

  // Pad each line with two spaces
  const paddedLines = lines.map(line => '    ' + line)

  // Join the padded lines back into a single string
  return paddedLines.join('\n')
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

/**
 * Represents an error that occurs during the execution of a Beacon Test.
 *
 * @class
 * @extends Error
 *
 * @param {string} message - The error message.
 */
export class BeaconTestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BeaconTestError'
  }
}
