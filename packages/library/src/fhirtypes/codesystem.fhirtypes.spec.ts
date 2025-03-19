import {describe, expect, test} from 'vitest'
import {FhirTypes}              from './code-systems'



describe('Code Systems', () => {
  test('should be 231 types', () => {
    expect(FhirTypes.length).to.equal(231)
  })

  describe('by kind', () => {
    test('should find by resource', () => {
      expect(FhirTypes.filter(t => t.kind === 'resource').length).to.equal(162)
    })
    test('should find by primitive', () => {
      expect(FhirTypes.filter(t => t.kind === 'primitive').length).to.equal(21)

    })
    test('should find by datatype', () => {
      expect(FhirTypes.filter(t => t.kind === 'datatype').length).to.equal(47)
    })
  })

  test('by abstract flag', () => {
    expect(FhirTypes.filter(t => t.abstract).length).to.equal(10)
  })

  describe('by code', () => {
    test('should find Patient', () => {
      expect(FhirTypes.filter(t => t.code === 'Patient').length).to.equal(1)
    })
    test('should find DateTime', () => {
      expect(FhirTypes.filter(t => t.code === 'dateTime').length).to.equal(1)
    })
    test('should find Reference', () => {
      expect(FhirTypes.filter(t => t.code === 'Ref').length).to.equal(1)
    })
  })

})
