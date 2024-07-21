export interface HTMLElement {
  deepQuerySelector(selector: string | string[]): unknown

  deepQuerySelectorAll(selector: string | string[]): unknown[]

  queryDefaultSlot(): Node[]

  querySlot(slotName: string): Element[]
}


export type TestableHtmlElement = HTMLElement
