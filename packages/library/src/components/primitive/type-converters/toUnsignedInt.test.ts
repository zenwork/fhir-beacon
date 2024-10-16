import {describe, expect, it} from 'vitest'
import {toUnsignedInt}        from './toUnsignedInt'

describe('toUnsignedInt', () => {

  it('should convert valid non-negative integer within the range', () => {
    const validInt = 1000
    expect(toUnsignedInt(validInt)).toBe(validInt)
  })

  it('should throw an error for negative numbers', () => {
    const invalidInt = -1
    expect(() => toUnsignedInt(invalidInt)).toThrow(
      'Input must be a non-negative integer within the range 0 to 2,147,483,647')
  })

  it('should throw an error for numbers exceeding the maximum limit', () => {
    const outOfRangeInt = 2147483648
    expect(() => toUnsignedInt(outOfRangeInt)).toThrow(
      'Input must be a non-negative integer within the range 0 to 2,147,483,647')
  })

  it('should throw an error for non-integer values', () => {
    const invalidValues = ['string', {}, [], null, undefined]

    for (const value of invalidValues) {
      expect(() => toUnsignedInt(value as unknown)).toThrow(
        'Input must be a non-negative integer within the range 0 to 2,147,483,647')
    }
  })


  it('should throw an error for non-integer numbers', () => {
    const invalidInt = 3.14
    expect(() => toUnsignedInt(invalidInt)).toThrow('Invalid integer')
  })

  it('should accept the maximum limit integer', () => {
    const maxLimitInt = 2147483647
    expect(toUnsignedInt(maxLimitInt)).toBe(maxLimitInt)
  })
})
