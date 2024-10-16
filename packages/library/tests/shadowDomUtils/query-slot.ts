import {IllegalStateError} from '../lit/lit-vitest-fixture'

/**
 * Queries for elements assigned to a named slot within a shadow DOM.
 *
 * @param {HTMLElement} shadowedElement - The element with a shadow DOM.
 * @param {string} slotName - The name of the slot to query for.
 * @returns {Element[]} - An array of elements assigned to the named slot.
 * @throws {IllegalStateError} - If the named slot was not found or the element has no shadow DOM.
 */
export function querySlot(shadowedElement: HTMLElement, slotName: string): Element[] {
  if (shadowedElement.shadowRoot) {
    const slot: HTMLSlotElement | null = shadowedElement.shadowRoot.querySelector(`slot[name=${slotName}]`)
    if (slot) {
      return slot.assignedElements()
    }
  }

  throw new IllegalStateError(`named slot ${slotName} was not found or the element has no shadow dom`)

}

/**
 * Queries for the nodes assigned to the default slot of a shadow DOM element.
 *
 * @param {HTMLElement} shadowedElement - The shadowed element to query.
 *
 * @return {Node[]} - An array of nodes assigned to the default slot.
 *
 * @throws {IllegalStateError} - Thrown if the default slot was not found or if the element has no shadow DOM.
 */
export function queryDefaultSlot(shadowedElement: HTMLElement): Node[] {
  if (shadowedElement.shadowRoot) {
    const slot: HTMLSlotElement | null = shadowedElement.shadowRoot.querySelector(`slot:not([name])`)
    if (slot) {
      return slot.assignedNodes()
    }
  }
  throw new IllegalStateError('default slot was not found or element has no shadow dom')


}
