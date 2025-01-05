import {describe, expect, it} from 'vitest'
import {toDatetime}           from './toDatetime'

describe('toDatetime - Valid DateTime Strings', () => {

  it('should parse "1971"', () => {
    expect(toDatetime('1971')).toBe('1971')
  })

  it('should parse "1971-12"', () => {
    expect(toDatetime('1971-12')).toBe('1971-12')
  })

  it('should parse "1971-12-31"', () => {
    expect(toDatetime('1971-12-31')).toBe('1971-12-31')
  })

  it('should parse "1971-12-31T23:59:59"', () => {
    expect(toDatetime('1971-12-31T23:59:59')).toBe('1971-12-31T23:59:59')
  })

  it('should parse "1971-12-31T23:59:59.999"', () => {
    expect(toDatetime('1971-12-31T23:59:59.999')).toBe('1971-12-31T23:59:59.999')
  })

  it('should parse "1971-12-31T23:59:59.999+11:00"', () => {
    expect(toDatetime('1971-12-31T23:59:59.999+11:00')).toBe('1971-12-31T23:59:59.999+11:00')
  })

})

describe('toDatetime - Invalid DateTime Strings', () => {

  it('should throw error for "abc"', () => {
    expect(() => toDatetime('abc')).toThrowError('is not a valid date time')
  })

  it('should throw error for "1971-12-31T23:59:59.99911:00"', () => {
    expect(() => toDatetime('1971-12-31T23:59:59.99911:00')).toThrowError('is not a valid date time')
  })

  it('should throw error for "1971-12-31T235959999"', () => {
    expect(() => toDatetime('1971-12-31T235959999')).toThrowError('is not a valid date time')
  })

  it('should throw error for "-12-31T23:59:59.999"', () => {
    expect(() => toDatetime('-12-31T23:59:59.999')).toThrowError('is not a valid date time')
  })

})
