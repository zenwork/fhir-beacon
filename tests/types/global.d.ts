// This is needed to avoid TS typing issues
export {}

// WARN: This is only for testing purpose
declare global {

  interface HTMLElement {
    deepQuerySelector<T extends HTMLElement>(selector: string | string[]): T

    deepQuerySelectorAll<T extends HTMLElement>(selector: string | string[]): T[]

    queryDefaultSlot(): Node[]

    querySlot(slotName: string): Element[]

    logShadowDOM(): void
  }

}
