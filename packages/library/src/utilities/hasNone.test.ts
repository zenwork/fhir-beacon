import {describe, expect, test} from 'vitest'
import {hasNone}                from './hasNone'

describe('function: has none', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }
  test('should find no properties', () => {
    expect(hasNone(obj, ['x', 'y'])).to.equal(true)
  })

  test('should find no properties when none are provided', () => {
    expect(hasNone(obj, [])).to.equal(true)
  })

  test('should find some properties in subset', () => {
    expect(hasNone(obj, ['a', 'f'])).to.equal(false)
  })

  test('should find all properties in subset', () => {
    expect(hasNone(obj, ['a', 'b', 'c'])).to.equal(false)
  })

  test('should find some properties in superset', () => {
    expect(hasNone(obj, ['a', 'b', 'c', 'd', 'e'])).to.equal(false)
  })
})
