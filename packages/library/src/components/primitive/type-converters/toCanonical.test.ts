import {describe, expect, it} from 'vitest'
import {Id}                   from '../primitive.data'
import {toCanonical}          from './toCanonical'

describe('toCanonical', () => {
  it('should return the canonical string if it matches the regex', () => {
    const validCanonical = 'validCanonicalString'
    const result: Id = toCanonical(validCanonical)
    expect(result).toBe(validCanonical)
  })

  it('should throw a TypeError if the canonical string contains spaces', () => {
    const invalidCanonical = 'invalid canonical string'
    expect(() => toCanonical(invalidCanonical)).toThrow(TypeError)
  })

  it('should throw a TypeError if the canonical string is empty', () => {
    const invalidCanonical = ''
    expect(() => toCanonical(invalidCanonical)).toThrow(TypeError)
  })

  it('should throw a TypeError with the correct message', () => {
    const invalidCanonical = 'invalid canonical string'
    expect(() => toCanonical(invalidCanonical)).toThrow(
      new TypeError('canonical must match [ /^\\S+$/ ]')
    )
  })
})
