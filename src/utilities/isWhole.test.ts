import {describe, expect, test} from 'vitest'
import {isWholeNumber}          from './isWhole'

describe('function: is a whole number', () => {

  test('should handle number', () => {
    expect(isWholeNumber(222)).to.equal(true)
  })

  test('should handle strings', () => {
    expect(isWholeNumber('222')).to.equal(true)
  })

})
