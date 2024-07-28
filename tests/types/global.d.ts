// This is needed to avoid TS typing issues
import {Query} from '../../vitest.setup'

export {}

// WARN: This is only for testing purpose
declare global {

  interface HTMLElement {

    /**
     * Finds the first descendant element that matches the specified selector.
     * This method performs a depth-first search of the element's descendants, excluding the element itself.
     *
     * Specify the return type if one specific subtype of HTMLElement is expected.
     *
     * @param {Query} - The number of expected results(default to 1 if not specified) and CSS selector to match against. selector can be a single string or an
     * array of selectors.
     * @returns {HTMLElement} - The matched descendant elements, or null if no matches were found. returns an array or a single value if only one found.
     * @throws {BeaconTestError} - If no or an unexpected number of elements found .
     */
    deepQuerySelector<T extends HTMLElement | HTMLElement[]>({ select, expect }: Query): T

    queryDefaultSlot(): Node[]

    querySlot(slotName: string): Element[]

    logShadowDOM(): void
  }

}
