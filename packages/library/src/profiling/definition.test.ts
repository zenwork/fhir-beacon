import {Prop}                 from 'profiling/profiling.types'
import {describe, expect, it} from 'vitest'
import {FhirDatatypeName}     from '../FhirDatatypeName'
import {FhirPrimitiveName}    from '../FhirPrimitiveName'
import {FhirResourceEnum}     from '../FhirResourceEnum'
import {FhirResourceName}     from '../FhirResourceName'
import {Example}              from './BindingStrength'
import {Definition}           from './definition'


// Sample constructor for mock props
const createTestProp = (key: string,
                        type: FhirPrimitiveName | FhirDatatypeName | FhirResourceName | Definition): Prop => ({
  key,
  isSummary: false,
  cardinality: '1..1',
  bindings: [],
  bindingStrength: Example,
  type,
  typeNarrowing: [],
  constraints: [],
  isModifier: false,
  mustSupport: false
})

describe('Definition Class', () => {

  const name: FhirResourceEnum = new FhirResourceEnum('Basic')
  it('should create a Definition instance with specified values', () => {
    const def = new Definition(name.profile('testName'))

    expect(def.name.value).toBe('Basic')
    expect(def.name.profileName).toBe('testName')
    expect(def.props.size).toBe(0)
  })

  it('should set and retrieve a property', () => {
    const def = new Definition(name)
    const prop: Prop = createTestProp('testKey', 'string') as Prop

    def.set(prop)
    expect(def.get('testKey')).toEqual(prop)
    expect(def.get('otherKey')).toBeNull()
  })

  it('should clone the Definition object', () => {
    const def = new Definition(name)
    const prop1: Prop = createTestProp('key1', 'string') as Prop
    const prop2: Prop = createTestProp('key2', 'string') as Prop

    def.set(prop1)
    def.set(prop2)

    const clone = def.clone()

    expect(clone).not.toBe(def) // Different instance
    expect(clone.name.value).toBe(def.name.value)
    expect(clone.name.profileName).toBe(def.name.profileName)
    expect(clone.get('key1')).toEqual(def.get('key1'))
    expect(clone.get('key2')).toEqual(def.get('key2'))
  })

  it('should generate indented string representation with toString()', () => {
    const def = new Definition(name)
    const prop: Prop = createTestProp('testKey', 'string') as Prop

    def.set(prop)
    const result = def.toString()
    expect(result).toContain('testKey') // Ensure the key is present
    expect(result).toContain('string')  // Ensure the type is present
  })

  it('should convert the Definition object to JSON', () => {
    const def = new Definition(name.profile('testProfile'))
    const prop: Prop = createTestProp('testKey', 'string') as Prop

    def.set(prop)

    const json = def.toJSON()
    expect(json).toEqual({
                           name: {
                             profileName: 'testProfile',
                             value: 'Basic'
                           },
                           props: {
                             testKey: prop
                           }
                         })
  })
})
