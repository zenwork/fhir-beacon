import {describe, expect, it} from 'vitest'
import {isDecimal, toDecimal} from './toDecimal'

describe('toDecimal', () => {
  it('should convert valid decimal strings to Decimal type', () => {
    const validDecimals = [
      '123.456',
      '0.0001',
      '-123.456',
      '3.14159265358979323',
      '1e3'
    ]

    validDecimals.forEach(decimalString => {
      const result = toDecimal(decimalString)
      expect(isDecimal(result)).toBe(true)
    })
  })

  it('should throw TypeError for invalid decimal strings', () => {
    const invalidDecimals = ['abc', '123..456', '1e999', '']

    invalidDecimals.forEach(decimalString => {
      expect(() => toDecimal(decimalString), `val: ${decimalString}`).toThrow(TypeError)
    })
  })

  it('should throw TypeError if decimal has more than 18 digits or more than one decimal point', () => {
    const invalidDecimals = ['1234567890123456789.1', '123.456.789']

    invalidDecimals.forEach(decimalString => {
      expect(() => toDecimal(decimalString)).toThrow(TypeError)
    })
  })

  it('should correctly parse scientific notation within limits', () => {
    const validScientificDecimals = ['1e2', '1E2', '1.23e2', '-1.23e2']

    validScientificDecimals.forEach(decimalString => {
      const result = toDecimal(decimalString)
      expect(isDecimal(result)).toBe(true)
    })
  })
})

describe('isDecimal', () => {
  it('should return true for valid decimal numbers', () => {
    const validDecimals = [123.456, 0.0001, -123.456, 1e3]

    validDecimals.forEach(decimal => {
      expect(isDecimal(decimal)).toBe(true)
    })
  })

  it('should return false for non-decimal values', () => {
    const invalidDecimals = ['abc', NaN, Infinity, null, undefined]

    invalidDecimals.forEach(decimal => {
      expect(isDecimal(decimal)).toBe(false)
    })
  })
})
