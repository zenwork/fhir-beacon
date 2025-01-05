import {describe, expect, it} from 'vitest'
import {Ref}                  from '../primitive.data'
import {toReference}          from './toReference'

describe('toReference function', () => {
  it('should return a Ref when given a valid reference URL', () => {
    const validRef = 'http://example.com/Patient/123'
    const result = toReference(validRef)
    expect(result).toBe(validRef as Ref)
  })

  it('should return a Ref when given a valid reference URL with history', () => {
    const validRefWithHistory = 'http://example.com/Patient/123/_history/1'
    const result = toReference(validRefWithHistory)
    expect(result).toBe(validRefWithHistory as Ref)
  })

  it('should throw TypeError when given an invalid reference URL', () => {
    const invalidRef = 'invalidReference'
    expect(() => toReference(invalidRef)).toThrow(TypeError)
  })

  it('should throw TypeError with appropriate message for invalid reference', () => {
    const invalidRef = 'invalidReference'
    expect(() => toReference(invalidRef))
      .toThrow(`${invalidRef} is not an acceptable reference. see: http://hl7.org/fhir/R5/references.html`)
  })

  it('should handle https URL correctly', () => {
    const httpsRef = 'https://example.com/Device/456'
    const result = toReference(httpsRef)
    expect(result).toBe(httpsRef as Ref)
  })
})
