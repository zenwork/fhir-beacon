import {describe, expect, test} from 'vitest'
import {hasAll}                 from './hasAll'

describe('function: has all', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }
  const falsyObj = { a: 0, b: '', c: false }

  test('should find all properties', () => {
    expect(hasAll(obj, ['a', 'c'])).to.equal(true)
  })

  test('should find all properties when none are provided', () => {
    expect(hasAll(obj, [])).to.equal(true)
  })

  test('should not find all properties in subset', () => {
    expect(hasAll(obj, ['a', 'f'])).to.equal(false)
  })

  test('should not find all properties', () => {
    expect(hasAll(obj, ['x', 'f'])).to.equal(false)
  })

  test('should not find all properties in superset', () => {
    expect(hasAll(obj, ['a', 'b', 'c', 'd', 'e'])).to.equal(false)
  })

  test('should treat falsy values as defined', () => {
    expect(hasAll(falsyObj, ['a', 'b', 'c'])).to.equal(true)
  })

  test('should detect missing property with falsy values', () => {
    expect(hasAll(falsyObj, ['a', 'b', 'c', 'd'])).to.equal(false)
  })
})
