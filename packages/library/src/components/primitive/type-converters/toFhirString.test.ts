import {describe, expect, it} from 'vitest'
import type {FhirString}      from '../primitive.data'
import {toFhirString}         from './toFhirString'



describe('toFhirString', () => {
  it('should convert a valid string to FhirString', () => {
    const input = 'valid string'
    const result: FhirString = toFhirString(input)
    expect(result).toBe(input)
  })

  it('should throw an error if input is not a string', () => {
    const input = 12345
    expect(() => toFhirString(input as unknown)).toThrow('Input must be a string')
  })

  it('should throw an error if string length exceeds 1,048,576 characters', () => {
    const input = 'a'.repeat(1048577)
    expect(() => toFhirString(input)).toThrow('String length shall not exceed 1,048,576 characters')
  })

  it('should throw an error if string contains invalid Unicode characters', () => {
    const input = 'valid\u0001string'
    expect(() => toFhirString(input)).toThrow(
      'String should not contain Unicode character points below 32, except for u0009, u000D and u000A')
  })

  it('should throw an error if string contains invalid Unicode characters', () => {
    const input = ['valid string in array']
    expect(() => toFhirString(input)).toThrow('Input must be a string')
  })

})
