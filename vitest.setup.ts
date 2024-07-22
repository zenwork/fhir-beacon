import {deepQuerySelector, deepQuerySelectorAll} from 'shadow-dom-testing-library'
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

    throw new IllegalStateError('element not found')

  } else {

    let result: any = document

    selector.forEach((sel) => {
      const temp = deepQuerySelector<HTMLElement>(result, sel)
      if (temp) {
        result = temp
      } else {
        throw new IllegalStateError('element not found')
      }
    })

    if (result !== document) {
      return result as T
    }

    throw new IllegalStateError('element not found')


  }
}

HTMLElement.prototype.deepQuerySelectorAll = function <T extends HTMLElement>(selector: string | string[]): T[] {
  if (typeof selector === 'string') {
    const result = deepQuerySelectorAll<T>(this, selector)
    if (result) {
      return result
    }

    throw new IllegalStateError('element not found')
  } else {

    let result: any = document

    selector.forEach((sel) => {
      const temp = deepQuerySelectorAll<HTMLElement>(result, sel)
      if (temp) {
        result = temp
      } else {
        throw new IllegalStateError('element not found')
      }
    })

    if (result !== document) {
      return result as T[]
    }

    throw new IllegalStateError('element not found')

  }
}


HTMLElement.prototype.queryDefaultSlot = function (): Node[] {
  return queryDefaultSlot(this)
}

HTMLElement.prototype.querySlot = function (slotName: string): Element[] {
  return querySlot(this, slotName)
}
