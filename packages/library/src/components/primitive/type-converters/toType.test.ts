import {describe, expect, it} from 'vitest'
import {toType}               from './toType'


describe('toType', () => {
  it('should return the value if it is a valid FHIR type', () => {

    const result = toType('Patient')
    expect(result).toBe('Patient')
  })

  it('should throw a TypeError if the value is not a valid FHIR type', () => {
    const invalidValue = 'InvalidType'

    expect(() => toType(invalidValue)).toThrow(TypeError)
    expect(() => toType(invalidValue))
      .toThrow(`${invalidValue} is not one of the accepted canonical resource types. see: http://hl7.org/fhir/R5/valueset-resource-types.html`)
  })
})
