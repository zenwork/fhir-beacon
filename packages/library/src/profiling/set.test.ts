import {beforeEach, describe, expect, it} from 'vitest'
import {Context, Definition}              from './definition'
import {InternalAction, Prop}             from './profiling.types'
import {prop}                             from './prop'
import {set}                              from './set' // Adjust the import path as needed


// Tests
describe('actionWith', () => {

  let def: Definition
  let testContext: Context
  let kv: Prop

  beforeEach(() => {
    // Reset the context and Prop object for each test
    def = new Definition('base', 'base')
    testContext = new Context('base', 'base', def)
    kv = prop('test-key', 'code')
  })

  it('should initialize with proper default state', () => {
    const action = set(kv)

    expect(action).toHaveProperty('setCtx')
    expect(action).toHaveProperty('run')
    expect(action).toHaveProperty('optional')
    expect(action).toHaveProperty('required')
    expect(action).toHaveProperty('hasMany')
    expect(action).toHaveProperty('boundBy')
    expect(action).toHaveProperty('constrainedBy')
    expect(action).toHaveProperty('mustSupport')
    expect(action).toHaveProperty('isModifier')
    expect(action).toHaveProperty('isSummary')
  })

  it('should set context via setCtx()', () => {
    const action = set(kv) as InternalAction
    action.setCtx(testContext)

    expect(() => (action as InternalAction).run()).not.toThrow()
  })

  it('should modify Prop based on "optional()"', () => {
    const action = set(kv) as InternalAction
    action.setCtx(testContext)
    action.optional()
    action.run()
    expect(def.props.get('test-key').cardinality).toBe('0..1')
  })

  it('should set "many" properly with hasMany()', () => {
    const action = set(kv) as InternalAction
    action.setCtx(testContext)
    action.hasMany()
    action.run()
    expect(def.props.get('test-key').cardinality).toBe('1..*')
  })

  it('should adjust cardinality based on optional and hasMany', () => {
    const action = set(kv) as InternalAction
    action.setCtx(testContext)
    action.optional().hasMany()
    action.run()
    expect(def.props.get('test-key').cardinality).toBe('0..*')
  })

  it('should add bindings via boundBy()', () => {
    const action = set(kv) as InternalAction
    const bindings = ['binding1', 'binding2']
    action.setCtx(testContext)
    action.boundBy(bindings)
    action.run()
    expect(def.props.get('test-key').bindings).toEqual(bindings)
  })

  it('should add constraints via constrainedBy()', () => {
    const action = set(kv) as InternalAction
    const constraints = [
      () => ({ key: 'constraint1', error: 'error1' }),
      () => ({ key: 'constraint2', error: 'error2' })
    ]
    action.setCtx(testContext)
    action.constrainedBy(constraints)
    action.run()
    expect(def.props.get('test-key').constraints).toEqual(constraints)
  })

  it('should set "mustSupport" to true with mustSupport()', () => {
    const action = set(kv) as InternalAction
    action.setCtx(testContext)
    action.mustSupport()
    action.run()
    expect(kv.mustSupport).toBe(true)
  })

  it('should set "isModifier" to true with isModifier()', () => {
    const action = set(kv) as InternalAction
    action.setCtx(testContext)
    action.isModifier()
    action.run()
    expect(kv.isModifier).toBe(true)
  })

  it('should set "isSummary" to true with isSummary()', () => {
    const action = set(kv) as InternalAction
    action.setCtx(testContext)
    action.isSummary()
    action.run()
    expect(kv.isSummary).toBe(true)
  })

  it('should handle adding a new Prop to the context', () => {
    const action = set(kv) as InternalAction
    action.setCtx(testContext)
    action.run()
    expect(testContext.def.get(kv.key)).toMatchObject({
                                                        key: 'test-key',
                                                        cardinality: '1..1'
                                                      })
  })

  it('should merge existing Prop from context', () => {
    const existingProp: Prop = {
      key: 'test-key',
      type: 'code',
      typeNarrowing: [],
      cardinality: '0..1',
      bindings: ['existing-binding'],
      bindingStrength: 'example',
      constraints: [],
      mustSupport: false,
      isModifier: false,
      isSummary: false
    }

    testContext.def.set(existingProp)

    const action = set(kv) as InternalAction

    action.setCtx(testContext)
    action.boundBy(['new-binding']).hasMany()
    action.run()

    const result = testContext.def.get('test-key')
    expect(result).toMatchObject({
                                   key: 'test-key',
                                   type: 'code',
                                   cardinality: '1..*', // From the original kv
                                   bindings: ['new-binding'] // Overridden
                                 })
  })
})
