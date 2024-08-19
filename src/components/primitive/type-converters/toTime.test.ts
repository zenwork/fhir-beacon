import {describe, expect, it} from 'vitest'
import {toTime}               from './toTime'


describe('toTime function', () => {
  it('should convert a valid time string to Time', () => {
    const validTime = '12:34:56'
    expect(toTime(validTime)).toBe(validTime)
  })

  it('should convert a valid time string with milliseconds to Time', () => {
    const validTimeWithMs = '12:34:56.789'
    expect(toTime(validTimeWithMs)).toBe(validTimeWithMs)
  })

  it('should throw an error for an invalid time string', () => {
    const invalidTime = '25:61:61'
    expect(() => toTime(invalidTime)).toThrow(TypeError)
    expect(() => toTime(invalidTime)).toThrow('is not a valid date')
  })

  it('should throw an error for a malformed time string', () => {
    const malformedTime = 'abc:def:ghi'
    expect(() => toTime(malformedTime)).toThrow(TypeError)
    expect(() => toTime(malformedTime)).toThrow('is not a valid date')
  })

  it('should throw an error for an empty string', () => {
    const emptyString = ''
    expect(() => toTime(emptyString)).toThrow(TypeError)
    expect(() => toTime(emptyString)).toThrow('is not a valid date')
  })

  it('should throw an error for time without seconds', () => {
    const timeWithoutSeconds = '12:34'
    expect(() => toTime(timeWithoutSeconds)).toThrow(TypeError)
    expect(() => toTime(timeWithoutSeconds)).toThrow('is not a valid date')
  })

  it('should throw an error for time with too many milliseconds', () => {
    const timeWithExcessiveMs = '12:34:56.1234567890'
    expect(() => toTime(timeWithExcessiveMs)).toThrow(TypeError)
    expect(() => toTime(timeWithExcessiveMs)).toThrow('is not a valid date')
  })
})
