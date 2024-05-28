import {expect, test} from '@playwright/test'
import {FhirTypes}    from '../../src/data/codesystems'


test.describe('Code Systems', () => {
  test('should be 231 types', async () => {
    expect(FhirTypes.length).toBe(231)
  })

  test.describe('by kind', () => {
    test('should find by resource', async () => {
      expect(FhirTypes.filter(t => t.kind === 'resource').length).toBe(162)
    })
    test('should find by primitive', async () => {
      expect(FhirTypes.filter(t => t.kind === 'primitive').length).toBe(21)

    })
    test('should find by datatype', async () => {
      expect(FhirTypes.filter(t => t.kind === 'datatype').length).toBe(47)
    })
  })

  test('by abstract flag', () => {
    expect(FhirTypes.filter(t => t.abstract).length).toBe(10)
  })

  test.describe('by code', () => {
    test('should find Patient', async () => {
      expect(FhirTypes.filter(t => t.code === 'Patient').length).toBe(1)
    })
    test('should find DateTime', async () => {
      expect(FhirTypes.filter(t => t.code === 'dateTime').length).toBe(1)
    })
    test('should find Reference', async () => {
      expect(FhirTypes.filter(t => t.code === 'Reference').length).toBe(1)
    })
  })

})
