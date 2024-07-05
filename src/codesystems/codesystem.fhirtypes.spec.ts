import {expect}    from '@open-wc/testing'
import {FhirTypes} from './index'


describe('Code Systems', () => {
  it('should be 231 types', async () => {
    await expect(FhirTypes.length).to.equal(231)
  })

  describe('by kind', () => {
    it('should find by resource', async () => {
      await expect(FhirTypes.filter(t => t.kind === 'resource').length).to.equal(162)
    })
    it('should find by primitive', async () => {
      await expect(FhirTypes.filter(t => t.kind === 'primitive').length).to.equal(21)

    })
    it('should find by datatype', async () => {
      await expect(FhirTypes.filter(t => t.kind === 'datatype').length).to.equal(47)
    })
  })

  it('by abstract flag', async () => {
    await expect(FhirTypes.filter(t => t.abstract).length).to.equal(10)
  })

  describe('by code', () => {
    it('should find Patient', async () => {
      await expect(FhirTypes.filter(t => t.code === 'Patient').length).to.equal(1)
    })
    it('should find DateTime', async () => {
      await expect(FhirTypes.filter(t => t.code === 'dateTime').length).to.equal(1)
    })
    it('should find Reference', async () => {
      await expect(FhirTypes.filter(t => t.code === 'Reference').length).to.equal(1)
    })
  })

})
