// Definition.test.ts

import {Prop}                 from 'profiling/profiling.types'
import {describe, expect, it} from 'vitest'
import {Definition}           from './definition'

// Mocking the Prop type for testing
type TestProp = {
  key: string
  isSummary: boolean
  cardinality: string
  bindings: string[]
  type: string | Definition
}

// Sample constructor for mock props
const createTestProp = (key: string, type: string | Definition): TestProp => ({
  key,
  isSummary: false,
  cardinality: '1..1',
  bindings: [],
  type
})

describe('Definition Class', () => {
  it('should create a Definition instance with default values', () => {
    const def = new Definition()

    expect(def.name).toBe('unknown')
    expect(def.refines).toBe('unknown')
    expect(def.props.size).toBe(0)
  })

  it('should create a Definition instance with specified values', () => {
    const def = new Definition('testName', 'parent')

    expect(def.name).toBe('testName')
    expect(def.refines).toBe('parent')
    expect(def.props.size).toBe(0)
  })

  it('should set and retrieve a property', () => {
    const def = new Definition('testName')
    const prop: Prop = createTestProp('testKey', 'string') as Prop

    def.set(prop)
    expect(def.get('testKey')).toEqual(prop)
    expect(def.get('otherKey')).toBeNull()
  })

  it('should clone the Definition object', () => {
    const def = new Definition('original', 'parent')
    const prop1: Prop = createTestProp('key1', 'string') as Prop
    const prop2: Prop = createTestProp('key2', 'string') as Prop

    def.set(prop1)
    def.set(prop2)

    const clone = def.clone()

    expect(clone).not.toBe(def) // Different instance
    expect(clone.name).toBe(def.name)
    expect(clone.refines).toBe(def.refines)
    expect(clone.get('key1')).toEqual(def.get('key1'))
    expect(clone.get('key2')).toEqual(def.get('key2'))
  })

  it('should generate indented string representation with toString()', () => {
    const def = new Definition('testName')
    const prop: Prop = createTestProp('testKey', 'string') as Prop

    def.set(prop)
    const result = def.toString()
    expect(result).toContain('-testKey') // Ensure the key is present
    expect(result).toContain('string')  // Ensure the type is present
  })

  it('should convert the Definition object to JSON', () => {
    const def = new Definition('testName', 'parentName')
    const prop: Prop = createTestProp('testKey', 'string') as Prop

    def.set(prop)

    const json = def.toJSON()
    expect(json).toEqual({
                           name: 'testName',
                           refines: 'parentName',
                           props: {
                             testKey: prop
                           }
                         })
  })
})
