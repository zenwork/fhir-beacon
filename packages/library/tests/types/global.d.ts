// IMPORTANT: This is needed to avoid TS typing issues
export {}


/**
 * Represents a query object with select and expect properties.
 *
 * @typedef {Object} Query
 * @property {string | string[]} select - query selector.
 * @property {number} [expect] - The expected number of results.
 */
export type Query = { select: string | string[], expect?: number }

// WARN: This is only for testing purpose
declare global {

  interface Element {

    logShadow(): void

    /**
     * Finds the first descendant element that matches the specified selector.
     * This method performs a depth-first search of the element's descendants, excluding the element itself.
     *
     * Specify the return type if one specific subtype of HTMLElement is expected.
     *
     * @param {Query} - The number of expected results(default to 1 if not specified) and CSS selector to match
     *   against. selector can be a single string or an array of selectors.
     * @returns {HTMLElement} - The matched descendant elements, or null if no matches were found. returns an array or
     *   a single value if only one found.
     * @throws {BeaconTestError} - If no or an unexpected number of elements found .
     */
    queryShadow<T extends HTMLElement | HTMLElement[]>({ select, expect }: Query): T

    /**
     * Queries the DOM for an element with a specific text content within a shadow root.
     *
     * @param {string} text - The text content to search for.
     * @returns {T | null} - The first element found with the given text content, or null if no such element exists.
     */
    queryShadowByText<T extends HTMLElement>(text: string): T | null

    /**
     * Queries the default slot of a shadow root and returns an array of nodes.
     * This method retrieves all the child nodes that have been assigned to the default slot.
     *
     * @return {Node[]} Array of nodes representing the child nodes assigned to the default slot.
     */
    queryShadowDefaultSlot(): Node[]


    /**
     * Queries the shadow DOM for elements with a specific slot name.
     *
     * @param {string} slotName - The name of the slot to query for.
     * @return {Element[]} An array of elements that contain the specified slot name in their shadow DOM.
     */
    queryShadowNamedSlot(slotName: string): Element[]


    /**
     * Returns the shadowed children of the element as an HTMLCollection.
     *
     * The shadowed children are the elements inside the shadow DOM of the element.
     * The elements returned by this method are part of the tree structure of the shadow DOM.
     *
     * @returns {HTMLCollection} The shadowed children of the element. Empty if none are found.
     */
    shadowedChildren(): HTMLCollection

  }

}
