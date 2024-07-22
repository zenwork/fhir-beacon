import {describe, expect, test} from 'vitest'
import {hasAll}                 from './hasAll'

describe('function: has all', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }

  test('should find all properties',  () => {
    expect(hasAll(obj, ['a', 'c'])).to.equal(true)
  })

  test('should find all properties when none are provided',  () => {
    expect(hasAll(obj, [])).to.equal(true)
  })

  test('should not find all properties in subset',  () => {
    expect(hasAll(obj, ['a', 'f'])).to.equal(false)
  })

  test('should not find all properties',  () => {
    expect(hasAll(obj, ['x', 'f'])).to.equal(false)
  })

  test('should not find all properties in superset',  () => {
    expect(hasAll(obj, ['a', 'b', 'c', 'd', 'e'])).to.equal(false)
  })
})
