import {beforeEach, describe, expect, it}                            from 'vitest'
import {DomainResourceData}                                          from '../../internal'
import {Basic}                                                       from '../../ResourceDef'
import {Context, StructureDefinition}                                from '../definition'
import {definitionBuilder, definitionProperty, Example, PropertyDef} from '../index'
import {Builder, PropertyBuilder}                                    from './builder.type'


// Tests
describe('actionWith', () => {

  let def: StructureDefinition<DomainResourceData>
  let testContext: Context<DomainResourceData>
  let kv: PropertyDef<DomainResourceData>

  beforeEach(() => {
    // Reset the context and Prop object for each test
    def = new StructureDefinition(Basic)
    testContext = new Context(Basic, def)
    kv = definitionProperty('test-key', 'code')
  })

  it('should initialize with proper default state', () => {
    const action = definitionBuilder(kv)

    expect(action).toHaveProperty('setCtx')
    expect(action).toHaveProperty('build')
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
    const action = definitionBuilder(kv) as Builder<DomainResourceData>
    action.setCtx(testContext)

    expect(() => (action as Builder<DomainResourceData>).build()).not.toThrow()
  })

  it('should modify Prop based on "optional()"', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    action.setCtx(testContext)
    action.optional()
    action.build()
    expect(def.getProperty('test-key')?.cardinality).toBe('0..1')
  })

  it('should set "many" properly with hasMany()', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    action.setCtx(testContext)
    action.hasMany()
    action.build()
    expect(def.getProperty('test-key')?.cardinality).toBe('1..*')
  })

  it('should adjust cardinality based on optional and hasMany', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    action.setCtx(testContext)
    action.optional().hasMany()
    action.build()
    expect(def.getProperty('test-key')?.cardinality).toBe('0..*')
  })

  it('should add bindings via boundBy()', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    const bindings = [{ value: 'binding1', display: 'binding1' }, { value: 'binding2', display: 'binding2' }]
    action.setCtx(testContext)
    action.boundBy(bindings)
    action.build()
    expect(def.getProperty('test-key')?.bindings).toEqual(bindings)
  })

  it('should add constraints via constrainedBy()', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    const constraints = [
      () => ({ success: false, message: 'error1' }),
      () => ({ success: false, message: 'error2' })
    ]
    action.setCtx(testContext)
    action.constrainedBy(constraints)
    action.build()
    expect(def.getProperty('test-key')?.constraints).toEqual(constraints)
  })

  it('should set "mustSupport" to true with mustSupport()', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    action.setCtx(testContext)
    action.mustSupport()
    action.build()
    expect(kv.mustSupport).toBe(true)
  })

  it('should set "isModifier" to true with isModifier()', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    action.setCtx(testContext)
    action.isModifier()
    action.build()
    expect(kv.isModifier).toBe(true)
  })

  it('should set "isSummary" to true with isSummary()', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    action.setCtx(testContext)
    action.isSummary()
    action.build()
    expect(kv.isSummary).toBe(true)
  })

  it('should handle adding a new Prop to the context', () => {
    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>
    action.setCtx(testContext)
    action.build()
    expect(testContext.def.get(kv.key)).toMatchObject({
                                                        key: 'test-key',
                                                        cardinality: '1..1'
                                                      })
  })

  it('should merge existing Prop from context', () => {
    const existingProp: PropertyDef<DomainResourceData> = {
      defType: 'property',
      key: 'test-key',
      type: 'code',
      typeNarrowing: [],
      cardinality: '0..1',
      bindings: [{ value: 'existing-binding', display: 'existing-binding' }],
      bindingStrength: Example,
      constraints: [],
      choice: undefined,
      mustSupport: false,
      isModifier: false,
      isSummary: false,
      subdefs: undefined
    }

    testContext.def.set(existingProp)

    const action = definitionBuilder(kv) as PropertyBuilder<DomainResourceData>

    action.setCtx(testContext)
    action.boundBy([{ value: 'new-binding', display: 'new-binding' }]).hasMany()
    action.build()

    const result = testContext.def.get('test-key')
    expect(result).toMatchObject({
                                   key: 'test-key',
                                   type: 'code',
                                   cardinality: '1..*', // From the original kv
                                   bindings: [{ value: 'new-binding', display: 'new-binding' }] // Overridden
                                 })
  })
})
