import {describe, expect, it} from 'vitest'
import {hasOnly}              from './hasOnly'

describe('hasOnly', () => {
  it('should return true when the object has only the specified property', () => {
    const obj = { a: 1 }
    expect(hasOnly(obj, 'a')).toBe(true)
  })

  it('should return false when the object has more than one property', () => {
    const obj = { a: 1, b: 2 }
    expect(hasOnly(obj, 'a')).toBe(false)
  })

  it('should return false when the object does not have the specified property', () => {
    const obj = { b: 2 }
    expect(hasOnly(obj, 'a')).toBe(false)
  })

  it('should return false when the object is empty', () => {
    const obj = {}
    expect(hasOnly(obj, 'a')).toBe(false)
  })


  it('should return true when the object has only the specified property with a truthy value', () => {
    const obj = { a: 'hello' }
    expect(hasOnly(obj, 'a')).toBe(true)
  })
})
