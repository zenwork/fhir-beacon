import { describe, expect, test } from 'vitest'
import {hasAllOrNone} from './hasAllOrNone'
import {hasNone}      from './hasNone'

describe('function has all or none', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }

  test('should find no properties and pass',  () => {
    expect(hasAllOrNone(obj, ['x', 'y'])).to.equal(true)
  })

  test('should find no properties when none are provided and pass',  () => {
    expect(hasAllOrNone(obj, [])).to.equal(true)
  })

  test('should find some properties and fail',  () => {
     expect(hasAllOrNone(obj, ['a', 'f'])).to.equal(false)
  })

  test('should find all properties and pass',  () => {
    expect(hasAllOrNone(obj, ['a', 'b', 'c'])).to.equal(true)
  })

  test('should find some extra properties and fail',  () => {
    expect(hasNone(obj, ['a', 'b', 'c', 'd', 'e'])).to.equal(false)
  })
})
