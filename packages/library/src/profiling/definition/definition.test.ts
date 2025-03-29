import {DatatypeName}         from 'DatatypeName'
import {PrimitiveName}        from 'PrimitiveName'
import {ResourceName}         from 'ResourceName'
import {DomainResourceData}   from 'internal'
import {describe, expect, it} from 'vitest'
import {ResourceDef}          from '../../ResourceDef'
import {PropertyDef}          from '../definition/types'
import {Example}              from './BindingStrength'
import {StructureDefinition}  from './StructureDefinition'


// Sample constructor for mock props
const createTestProp = <T>(key: string,
                           type: PrimitiveName | DatatypeName | ResourceName | `${DatatypeName}${string}` | `${ResourceName}${string}`): PropertyDef<T> => ({
  key,
  isSummary: false,
  cardinality: '1..1',
  bindings: [],
  bindingStrength: Example,
  type,
  typeNarrowing: [],
  constraints: [],
  choice: undefined,
  isModifier: false,
  mustSupport: false,
  subdefs: undefined
})

describe('Definition Class', () => {

  const name: ResourceDef = new ResourceDef('Basic')
  it('should create a Definition instance with specified values', () => {
    const def = new StructureDefinition(name.profile('testName'))

    expect(def.type.value).toBe('Basic')
    expect(def.type.profileName).toBe('testName')
    expect(def.props.size).toBe(0)
  })

  it('should set and retrieve a property', () => {
    const def = new StructureDefinition<DomainResourceData>(name)
    const prop: PropertyDef<DomainResourceData> = createTestProp<DomainResourceData>('testKey',
                                                                                     'string') as PropertyDef<DomainResourceData>

    def.set(prop)
    expect(def.get('testKey')).toEqual(prop)
    expect(def.get('otherKey')).toBeNull()
  })

  it('should clone the Definition object', () => {
    const def = new StructureDefinition<DomainResourceData>(name)
    const prop1: PropertyDef<DomainResourceData> = createTestProp('key1', 'string') as PropertyDef<DomainResourceData>
    const prop2: PropertyDef<DomainResourceData> = createTestProp('key2', 'string') as PropertyDef<DomainResourceData>

    def.set(prop1)
    def.set(prop2)

    const clone = def.clone()

    expect(clone).not.toBe(def) // Different instance
    expect(clone.type.value).toBe(def.type.value)
    expect(clone.type.profileName).toBe(def.type.profileName)
    expect(clone.get('key1')).toEqual(def.get('key1'))
    expect(clone.get('key2')).toEqual(def.get('key2'))
  })

  it('should generate indented string representation with toString()', () => {
    const def = new StructureDefinition<DomainResourceData>(name)
    const prop: PropertyDef<DomainResourceData> = createTestProp('testKey', 'string') as PropertyDef<DomainResourceData>

    def.set(prop)
    const result = def.toString()
    expect(result).toContain('testKey') // Ensure the key is present
    expect(result).toContain('string')  // Ensure the type is present
  })

  it('should convert the Definition object to JSON', () => {
    const def = new StructureDefinition<DomainResourceData>(name.profile('testProfile'))
    const prop: PropertyDef<DomainResourceData> = createTestProp('testKey', 'string') as PropertyDef<DomainResourceData>

    def.set(prop)

    const json = def.toJSON()


    expect(json).toEqual({
                           name: {
                             value: 'Basic',
                             dataset: 'BasicData',
                             profileName: 'testProfile'
                           },
                           props: {
                             testKey: {
                               key: 'testKey',
                               isSummary: false,
                               cardinality: '1..1',
                               bindings: [],
                               bindingStrength: {
                                 value: 'example'
                               },
                               type: 'string',
                               typeNarrowing: [],
                               constraints: [],
                               choice: undefined,
                               isModifier: false,
                               mustSupport: false,
                               subdefs: undefined
                             }
                           }
                         }
    )
  })
})
