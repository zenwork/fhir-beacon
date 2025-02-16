import {describe, expect, it} from 'vitest'
import {toInteger}            from './toInteger'



describe('toInteger', () => {

  it('should convert valid numbers within range to Integer', () => {
    expect(toInteger(123)).toBe(123)
    expect(toInteger(1234)).toBe(1234)
    expect(toInteger(-123)).toBe(-123)
    expect(toInteger(0)).toBe(0)
    expect(toInteger(2_147_483_647)).toBe(2_147_483_647)
    expect(toInteger(-2_147_483_648)).toBe(-2_147_483_648)
  })

  it('should throw an error for numbers out of the range', () => {
    expect(() => toInteger(2_147_483_648)).toThrow(
      'Input must be a non-negative integer within the range 1 to 2,147,483,647')
    expect(() => toInteger(-2_147_483_649)).toThrow(
      'Input must be a non-negative integer within the range 1 to 2,147,483,647')
  })

  it('should throw an error for non-number inputs', () => {
    expect(() => toInteger('123')).toThrow('Input must be a non-negative integer within the range 1 to 2,147,483,647')
    expect(() => toInteger(null)).toThrow('Input must be a non-negative integer within the range 1 to 2,147,483,647')
    expect(() => toInteger(undefined)).toThrow(
      'Input must be a non-negative integer within the range 1 to 2,147,483,647')
    expect(() => toInteger({})).toThrow('Input must be a non-negative integer within the range 1 to 2,147,483,647')
  })
})
