import './index'
import {deepQuerySelector, deepQuerySelectorAll} from 'shadow-dom-testing-library'
import {IllegalStateError}                       from './tests/lit-vitest-fixture'
import {queryDefaultSlot, querySlot}             from './tests/query-slot'


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
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


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
HTMLElement.prototype.queryDefaultSlot = function (): Node[] {
  return queryDefaultSlot(this)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
HTMLElement.prototype.querySlot = function (slotName: string): Element[] {
  return querySlot(this, slotName)
}
