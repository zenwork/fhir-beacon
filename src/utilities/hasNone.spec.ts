import {expect, test} from '@playwright/test'
import {hasNone}      from './hasNone'

test.describe('function: has none', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }
  test('should find no properties', () => {
    expect(hasNone(obj, ['x', 'y'])).toEqual(true)
  })

  test('should find no properties when none are provided', () => {
    expect(hasNone(obj, [])).toEqual(true)
  })

  test('should find some properties in subset', () => {
    expect(hasNone(obj, ['a', 'f'])).toEqual(false)
  })

  test('should find all properties in subset', () => {
    expect(hasNone(obj, ['a', 'b', 'c'])).toEqual(false)
  })

  test('should find some properties in superset', () => {
    expect(hasNone(obj, ['a', 'b', 'c', 'd', 'e'])).toEqual(false)
  })
})
