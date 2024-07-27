import {html, LitElement, render, TemplateResult} from 'lit'

export const emptyLitShadow = /^(?:<!--[\s\S]*?-->|\s)*$/

const elements: any[] = []

class FixtureResult<T extends HTMLElement> {
  private readonly promises: Promise<boolean>[]
  private readonly reactiveElements: T[] = []

  constructor(promises: Promise<boolean>[], reactiveElements: T[]) {
    this.promises = promises
    this.reactiveElements = reactiveElements
  }

  async all() {
    await Promise.all(this.promises)
    return this.reactiveElements
  }

  async first() {
    await Promise.all(this.promises)
    return this.reactiveElements[0]
  }

  async at(index: number) {
    await Promise.all(this.promises)
    return this.reactiveElements[index]
  }
}

/**
 * Asynchronously renders the provided template within a div element and returns an array of elements that extend LitElement for testing purposes. This is
 * designed to work with Vitest in browser testing.
 *
 * @template T - The type of elements that extend LitElement.
 * @param {TemplateResult} template - The template to be rendered.
 * @returns {Promise<T[]>} - A promise that resolves with an array of elements that extend LitElement.
 * @throws {IllegalStateError} - If the element with the generated id is not found.
 */
export function fixture<T extends HTMLElement>(template: TemplateResult): FixtureResult<T> {

  const id = `test-${((Math.random() * 100000).toFixed(0))}`
  const wrappedTemplate = html`
    <div id="${id}">${template}</div >`

  render(wrappedTemplate, document.body)
  const wrapper: Element | null = document.body.querySelector(`#${id}`)

  if (wrapper) {

    // store for eventual cleanup
    elements.push(wrapper)
    const reactiveElements: LitElement[] = getDerivedChildren(wrapper.children)

    return new FixtureResult<T>(reactiveElements.map(e => e.updateComplete), reactiveElements as unknown as T[])
  }

  throw new IllegalStateError(`element with id=${id} not found`)
}

/**
 * Returns an array of derived children from the given HTMLCollection.
 *
 * @param elements - The HTMLCollection to search for derived children.
 * @returns An array of derived children as type T, which extends LitElement.
 */
function getDerivedChildren<T extends LitElement>(elements: HTMLCollection): T[] {
  const derivedChildren: LitElement[] = []

  Array
    .from(elements)
    .forEach(element => {
      if (element instanceof HTMLElement) {

        function search(node: Node) {
          if (node instanceof LitElement) {
            derivedChildren.push(node)
          }
          node.childNodes.forEach(search)
        }

        search(element)
      }
    })

  return derivedChildren as T[]
}

/**
 * Cleans up the fixture by removing all elements.
 *
 * @returns {void}
 */
export function fixtureCleanUp() {
  elements.forEach(element => element.remove())
}

/**
 * Represents an error that is thrown when the current state is invalid or unexpected.
 *
 * @class
 * @extends Error
 *
 * @param {string} message - The error message.
 */
export class IllegalStateError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'IllegalStateError'
  }
}
