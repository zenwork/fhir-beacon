// This is needed to avoid TS typing issues
export {}

declare global {

  interface HTMLElement {
    deepQuerySelector(selector: string | string[]): unknown

    deepQuerySelectorAll(selector: string | string[]): unknown[]

    queryDefaultSlot(): Node[]

    querySlot(slotName: string): Element[]
  }

}
