import {expect, test} from '@playwright/test'
import {hasAll}       from './hasAll'

test.describe('function: has all', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }
  test('should find all properties', () => {
    expect(hasAll(obj, ['a', 'c'])).toEqual(true)
  })

  test('should find all properties when none are provided', () => {
    expect(hasAll(obj, [])).toEqual(true)
  })

  test('should not find all properties in subset', () => {
    expect(hasAll(obj, ['a', 'f'])).toEqual(false)
  })

  test('should not find all properties', () => {
    expect(hasAll(obj, ['x', 'f'])).toEqual(false)
  })

  test('should not find all properties in superset', () => {
    expect(hasAll(obj, ['a', 'b', 'c', 'd', 'e'])).toEqual(false)
  })
})
