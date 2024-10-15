import {describe, expect, it} from 'vitest'
import type {Instant}         from '../primitive.data'
import {toInstant}            from './toInstant' // Adjust the import path as necessary

describe('toInstant', () => {
  it('should convert a valid instant string to Instant', () => {
    const validInstant = '2023-09-21T12:45:30.123Z'
    expect(toInstant(validInstant)).toBe(validInstant as Instant)
  })

  it('should throw TypeError for invalid instant format', () => {
    const invalidInstant = '2023-09-21'
    expect(() => toInstant(invalidInstant)).toThrow(TypeError)
  })

  it('should handle leap seconds correctly', () => {
    const leapSecondInstant = '2023-12-31T23:59:60Z'
    expect(toInstant(leapSecondInstant)).toBe(leapSecondInstant as Instant)
  })

  it('should throw TypeError for incorrect date format', () => {
    const wrongFormatInstant = '20230921T12:45:30Z'
    expect(() => toInstant(wrongFormatInstant)).toThrow(TypeError)
  })

  it('should convert an instant string with a positive offset to Instant', () => {
    const offsetPositiveInstant = '2023-09-21T12:45:30.123+02:00'
    expect(toInstant(offsetPositiveInstant)).toBe(offsetPositiveInstant as Instant)
  })

  it('should convert an instant string with a negative offset to Instant', () => {
    const offsetNegativeInstant = '2023-09-21T12:45:30.123-07:00'
    expect(toInstant(offsetNegativeInstant)).toBe(offsetNegativeInstant as Instant)
  })

  it('should throw TypeError for invalid year', () => {
    const invalidYearInstant = '202-09-21T12:45:30Z'
    expect(() => toInstant(invalidYearInstant)).toThrow(TypeError)
  })

  it('should throw TypeError for invalid month', () => {
    const invalidMonthInstant = '2023-13-21T12:45:30Z'
    expect(() => toInstant(invalidMonthInstant)).toThrow(TypeError)
  })

  it('should throw TypeError for invalid day', () => {
    const invalidDayInstant = '2023-09-32T12:45:30Z'
    expect(() => toInstant(invalidDayInstant)).toThrow(TypeError)
  })

  it('should throw TypeError for invalid time', () => {
    const invalidTimeInstant = '2023-09-21T25:45:30Z'
    expect(() => toInstant(invalidTimeInstant)).toThrow(TypeError)
  })
})
