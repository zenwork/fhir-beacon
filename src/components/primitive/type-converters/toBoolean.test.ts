import {describe, expect, it} from 'vitest'
import {toBoolean}            from './toBoolean'

describe('toBoolean Function', () => {
  it('should convert true to true', () => {
    expect(toBoolean(true)).toBe(true)
  })

  it('should convert false to false', () => {
    expect(toBoolean(false)).toBe(false)
  })

  it('should convert "true" to true', () => {
    expect(toBoolean('true')).toBe(true)
  })

  it('should convert "false" to false', () => {
    expect(toBoolean('false')).toBe(false)
  })

  it('should throw a TypeError for non-boolean values', () => {
    expect(() => toBoolean('not a boolean')).toThrow(TypeError)
  })

  it('should throw a TypeError for numbers', () => {
    expect(() => toBoolean(1)).toThrow(TypeError)
    expect(() => toBoolean(0)).toThrow(TypeError)
  })

  it('should throw a TypeError for null', () => {
    expect(() => toBoolean(null)).toThrow(TypeError)
  })

  it('should throw a TypeError for undefined', () => {
    expect(() => toBoolean(undefined)).toThrow(TypeError)
  })

  it('should throw a TypeError for objects and arrays', () => {
    expect(() => toBoolean({})).toThrow(TypeError)
    expect(() => toBoolean([])).toThrow(TypeError)
  })
})
