import {beforeEach, describe, expect, it, vi}                                 from 'vitest'
import {CodeableConceptData}                                                  from '../../components'
import {Decorated}                                                            from './Decorate.types'
import {FqkMap}                                                               from './DeepKeyMap'
import {FhirElementData}                                                      from './FhirElement.type'
import {ValidationsImpl}                                                      from './Validations.impl'
import {errors, type FullyQualifiedKey, KeyErrorPair, meta, type Validations} from './Validations.type'



describe('ValidationsImpl', () => {
  let val: Validations

  beforeEach(() => {
    vi.clearAllMocks()
    const { validations } = createValidationImpl()
    val = validations
  })

  describe('message for', () => {
    it('should return undefined if no errors exist for the given key', () => {
      const key: FullyQualifiedKey = { path: [{ node: 'nonexistent' }] }
      expect(val.messageFor(key)).toBeUndefined()
    })

    it('should return the error message associated with the given baseless key', () => {
      const key: FullyQualifiedKey = { path: [{ node: 'key' }] }
      const errorMessage = 'Test error message'

      val.add({ fqk: key, message: errorMessage })

      expect(val.messageFor(key)).toEqual(errorMessage)
    })

    it('should return the error message associated with a key as string', () => {
      const key: FullyQualifiedKey = { path: [{ node: 'key' }] }
      const errorMessage = 'Test error message'
      val.add({ fqk: key, message: errorMessage })
      expect(val.messageFor('key')).toEqual(errorMessage)
    })


    it('should return the error message associated with the given full key', () => {
      const key: FullyQualifiedKey = { path: [{ node: 'parent' }, { node: 'child' }], key: 'testKey' }
      const errorMessage = 'Test error message'

      val.add({ fqk: key, message: errorMessage })

      expect(val.messageFor(key)).toEqual(errorMessage)
    })

    it('should return the one concatenated error message associated with the given full key', () => {
      const key: FullyQualifiedKey = { path: [{ node: 'parent' }, { node: 'child' }], key: 'testKey' }
      const errorMessage = 'Test error message'
      val.add({ fqk: key, message: errorMessage })

      const errorMessage2 = 'Test error message2'
      val.add({ fqk: key, message: errorMessage2 })


      expect(val.messageFor(key, ', ')).toEqual(errorMessage + ', ' + errorMessage2)
    })


    it('should concatenate multiple error messages with a semicolon', () => {
      val.add({ fqk: { path: [{ node: 'testKey' }] }, message: 'A' })
      val.add({ fqk: { path: [{ node: 'testKey' }] }, message: 'B' })
      val.add({ fqk: { path: [{ node: 'testKey' }] }, message: 'C' })
      expect(val.messageFor({ path: [{ node: 'testKey' }] }, '\n')).toEqual('A\nB\nC')
    })

    it('should resolve simple key string to fqk', () => {
      val.add({ fqk: { path: [{ node: 'testKey' }] }, message: 'A' })
      expect(val.messageFor('testKey')).toEqual('A')
    })
  })
  describe('slicing', () => {
    it('should slice map for fqk', () => {
      val.add({ fqk: { path: [{ node: 'to' }, { node: 'testKey', index: 0 }], key: 'err' }, message: 'A' })
      val.add({ fqk: { path: [{ node: 'to' }, { node: 'testKey', index: 1 }], key: 'err', index: 0 }, message: 'B1' })
      val.add({ fqk: { path: [{ node: 'to' }, { node: 'testKey', index: 1 }], key: 'err', index: 1 }, message: 'B2' })
      val.add({ fqk: { path: [{ node: 'to' }, { node: 'otherTestKey' }], key: 'err' }, message: 'C' })


      let key: FullyQualifiedKey = { path: [{ node: 'to' }, { node: 'testKey', index: 0 }], key: 'err' }
      let subMap: FqkMap = val.sliceForFQK(key)

      expect(subMap.keys()).toHaveLength(1)
      expect(subMap.get({ path: [{ node: 'testKey' }], key: 'err' })).toEqual(['A'])

      key = { path: [{ node: 'to' }, { node: 'testKey', index: 1 }], key: 'err' }
      subMap = val.sliceForFQK(key)

      expect(subMap.keys()).toHaveLength(2)

      expect(subMap.get({ path: [{ node: 'testKey' }], key: 'err', index: 0 })).toEqual(['B1'])
      expect(subMap.get({ path: [{ node: 'testKey' }], key: 'err', index: 1 })).toEqual(['B2'])

      key = { path: [{ node: 'to' }, { node: 'testKey' }], key: 'err' }
      subMap = val.sliceForFQK(key)

      expect(subMap.keys()).toHaveLength(3)

      expect(subMap.get({ path: [{ node: 'testKey', index: 0 }], key: 'err' })).toEqual(['A'])
      expect(subMap.get({ path: [{ node: 'testKey', index: 1 }], key: 'err', index: 0 })).toEqual(['B1'])
      expect(subMap.get({ path: [{ node: 'testKey', index: 1 }], key: 'err', index: 1 })).toEqual(['B2'])

      key = { path: [{ node: 'to' }, { node: 'testKey' }] }
      subMap = val.sliceForFQK(key)

      expect(subMap.keys()).toHaveLength(3)
      expect(subMap.get({ path: [{ node: 'testKey' }], key: 'err' })).toEqual(['A'])
      expect(subMap.get({ path: [{ node: 'testKey', index: 1 }], key: 'err', index: 0 })).toEqual(['B1'])
      expect(subMap.get({ path: [{ node: 'testKey', index: 1 }], key: 'err', index: 1 })).toEqual(['B2'])

      key = { path: [{ node: 'to' }, { node: 'otherTestKey' }] }
      subMap = val.sliceForFQK(key)
      expect(subMap.keys()).toHaveLength(1)
      expect(subMap.get({ path: [{ node: 'otherTestKey' }], key: 'err' })).toEqual(['C'])

    })

  })

  describe('codeable concept', () => {
    it('should validate a codeable concept', () => {

      val.inspectCodeableConcept({
                                   key: 'test',
                                   concept: {
                                     coding: [
                                       {
                                         system: 'http://hl7.org/fhir/sid/ex-icd-10-procedures',
                                         code: '123000'
                                       }
                                     ],
                                     text: 'general headache'
                                   },
                                   bindingId: 'cs-icd-10-procedures'
                                 })


      const all: KeyErrorPair[] = val.all()
      expect(all).toHaveLength(1)
      expect(all[0].message).toEqual('123000 not in: cs-icd-10-procedures. Valid: 123001, 123002, 123003')

    })
  })

})


type MockData = FhirElementData & {
  number: CodeableConceptData
}

// Create a mock implementation of Decorated<D>
function mockDecorated(): Decorated<MockData> {
  return {
    [errors]: new FqkMap(),
    [meta]: { hide: false },
    number: { coding: [{ id: '1', code: '1', system: 'http://system.com/numbers', display: 'one' }], text: 'mock' }
  }
}

// const testChoices: Choices = {
//   id: 'numbers',
//   name: 'Numbers',
//   type: 'CodeSystem',
//   system: 'http://system.com/numbers',
//   valid: true,
//   choices: [
//     { value: '1', display: 'one' },
//     { value: '2', display: 'two' },
//     { value: '3', display: 'threee' }
//   ]
// } as Choices

// Helper function to create a new ValidationsImpl instance
const createValidationImpl = () => {

  const validations = new ValidationsImpl(mockDecorated())
  // biome-ignore lint/suspicious/noExplicitAny: vite mocking
  // const mockCodeMethod = vi.spyOn(validations as any, 'code')
  //                          .mockReturnValue(testChoices)

  return { validations }
}
