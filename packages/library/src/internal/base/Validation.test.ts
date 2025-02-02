import {beforeEach, describe, expect, it, vi}                   from 'vitest'
import {CodeableConceptData}                                    from '../../components'
import {Choices}                                                from '../../valuesets/ValueSet.data'
import {Decorated}                                              from './Decorate.types'
import {FqkMap}                                                 from './DeepKeyMap'
import {FhirElementData}                                        from './FhirElement.type'
import {ValidationsImpl}                                        from './Validations.impl'
import {errors, type FullyQualifiedKey, meta, type Validations} from './Validations.type'



describe('ValidationsImpl', () => {
  let val: Validations

  beforeEach(() => {
    vi.clearAllMocks()
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    const { validations, mockCodeMethod } = createValidationImpl()
    val = validations
  })

  describe('errFor', () => {
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

    // it('should return all errors associated with key + index values', () => {
    //
    //   const errorMessage = 'array index 0 error message'
    //   const fqk0: FullyQualifiedKey = { key: 'testKey', index: 0 }
    //   val.add({ fqk: fqk0, message: errorMessage })
    //
    //   const errorMessage2 = 'array index 1 error message'
    //   const fqk1: FullyQualifiedKey = { key: 'testKey', index: 1 }
    //   val.add({ fqk: fqk1, message: errorMessage2 })
    //
    //
    //   expect(val.mapForKey('testKey').get(fqk0)![0]).toEqual(errorMessage)
    //   expect(val.mapForKey('testKey').get(fqk1)![0]).toEqual(errorMessage2)
    // })
    //
    // it('should return all errors associated with path', () => {
    //
    //   const errorMessage = 'error message A'
    //   const fqk0: FullyQualifiedKey = { path: ['foo'], key: 'testKeyA' }
    //   val.add({ fqk: fqk0, message: errorMessage })
    //
    //   const errorMessage2 = 'error message B'
    //   const fqk1: FullyQualifiedKey = { path: ['foo'], key: 'testKeyB' }
    //   val.add({ fqk: fqk1, message: errorMessage2 })
    //
    //   expect(val.mapForPath(['foo']).get(fqk0)![0]).toEqual(errorMessage)
    //   expect(val.mapForPath(['foo']).get(fqk1)![0]).toEqual(errorMessage2)
    //   expect(val.mapForPath(['foo', 'bar']).keys()).toEqual([])
    //   expect(val.mapForPath([]).keys()).toEqual([])
    // })

    // it('should return all errors associated with fully qualified keys', () => {
    //
    //   const errorMessage = 'error message A'
    //   const fqk0: FullyQualifiedKey = { path: ['foo'], key: 'testKey' }
    //   val.add({ fqk: fqk0, message: errorMessage })
    //
    //   const errorMessageB1 = 'error message B1'
    //   const fqk1: FullyQualifiedKey = { path: ['foo'], key: 'testKeyB', index: 0 }
    //   val.add({ fqk: fqk1, message: errorMessageB1 })
    //
    //   const errorMessageB2 = 'error message B2'
    //   const fqk2: FullyQualifiedKey = { path: ['foo'], key: 'testKeyB', index: 1 }
    //   val.add({ fqk: fqk2, message: errorMessageB2 })
    //
    //   const errorMessageC = 'error message C'
    //   const fqk3: FullyQualifiedKey = { path: ['foo', 'bar'], key: 'testKey' }
    //   val.add({ fqk: fqk3, message: errorMessageC })
    //
    //   const entries: DeepKeyMap<FullyQualifiedKey, string[]> = val.mapForPath(['foo'])
    //   expect(entries.get(fqk0)![0]).toEqual(errorMessage)
    //   expect(entries.get(fqk1)![0]).toEqual(errorMessageB1)
    //   expect(entries.get(fqk2)![0]).toEqual(errorMessageB2)
    //   expect(entries.get(fqk3)![0]).toEqual(errorMessageC)
    //   expect(val.mapForPath(['foo', 'bar']).keys()).toHaveLength(1)
    //   expect(val.mapForPath([]).keys()).toEqual([])
    // })

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

const testChoices: Choices = {
  id: 'numbers',
  name: 'Numbers',
  type: 'CodeSystem',
  system: 'http://system.com/numbers',
  valid: true,
  choices: [
    { value: '1', display: 'one' },
    { value: '2', display: 'two' },
    { value: '3', display: 'threee' }
  ]
} as Choices

// Helper function to create a new ValidationsImpl instance
const createValidationImpl = () => {

  const validations = new ValidationsImpl(mockDecorated())
  // biome-ignore lint/suspicious/noExplicitAny: vite mocking
  const mockCodeMethod = vi.spyOn(validations as any, 'code')
                           .mockReturnValue(testChoices)

  return { validations, mockCodeMethod }
}
