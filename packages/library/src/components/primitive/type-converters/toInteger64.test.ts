import {describe, expect, it} from 'vitest'
import type {Integer64}       from '../primitive.data'
import {toInteger64}          from './toInteger64'

describe('toInteger64', () => {
  it('should convert valid integer string to Integer64', () => {
    const value = '1234567890123456789'
    const result = toInteger64(value)
    expect(result).toEqual(BigInt(value) as Integer64)
  })

  it('should throw an error for string representation of non-integer', () => {
    const value = 'not-a-number'
    expect(() => toInteger64(value)).toThrowError(
      'Input must be a non-negative integer within the range -9223372036854775808 to 9223372036854775808')
  })

  it('should throw an error for integer string out of range (lower bound)', () => {
    const value = '-9223372036854775809'
    expect(() => toInteger64(value)).toThrowError(
      'Input must be a non-negative integer within the range -9223372036854775808 to 9223372036854775808')
  })

  it('should throw an error for integer string out of range (upper bound)', () => {
    const value = '9223372036854775809'
    expect(() => toInteger64(value)).toThrowError(
      'Input must be a non-negative integer within the range -9223372036854775808 to 9223372036854775808')
  })

  it('should throw an error for non-string input', () => {
    const value = 1234567890 as any
    expect(() => toInteger64(value)).toThrowError('Input must be a string representation of an integer')
  })
})
