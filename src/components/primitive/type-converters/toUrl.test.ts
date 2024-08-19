import {assert, describe, expect, test} from 'vitest'
import {toUrl}                          from './toUrl'

describe('toUrl', () => {
  test('should parse a valid absolute URL', () => {
    const url = toUrl('http://hl7.org/fhir/sid/icd-10')
    expect(url.protocol).toBe('http:')
    expect(url.hostname).toBe('hl7.org')
    expect(url.pathname).toBe('/fhir/sid/icd-10')
  })

  test('should throw an error for a relative URL', () => {
    assert.throws(() => {
      toUrl('/relative/path')
    }, TypeError, 'URL must be valid')
  })

  test('should throw an error for an invalid URL', () => {
    assert.throws(() => {
      toUrl('invalid-url')
    }, TypeError, 'URL must be valid')
  })

  test('should throw a TypeError if the input is empty', () => {
    assert.throws(() => {
      toUrl('')
    }, TypeError, 'URL must be valid')
  })

  test('should throw a TypeError if the input is null', () => {
    assert.throws(() => {
      toUrl(null as unknown as string)
    }, TypeError, 'URL must be valid')
  })

  test('should throw a TypeError if the input malformed URL', () => {
    assert.throws(() => {
      toUrl('http//hl7.org/fhir/sid/icd-10')
    }, TypeError, 'URL must be valid')
  })
})
