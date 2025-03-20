import {describe, expect, it} from 'vitest'
import {actionWith}           from './actionWith'
import {define}               from './define'
import {Definition}           from './definition'
import {property}             from './property'



describe('define function tests', () => {
  it('should create a definition with the provided name and no props or refine (default behavior)', () => {
    const name = 'TestName'
    const def = define({ name })

    expect(def.name).toBe(name)
    expect(def.refines).toBe(name) // Default refine is set to the same name
    expect(def.props.size).toBe(0) // No props
  })

  it('should clone the refine definition and update the name', () => {
    const refine = new Definition('RefineName')
    const name = 'NewName'
    const def = define({ name, base: refine })

    expect(def.name).toBe(name)
    expect(def.refines).toBe(refine.name) // refines is copied from the refine definition
    expect(def.props.size).toBe(0) // No props to apply
  })

  it('should apply props actions and modify the resulting definition', () => {

    const base = new Definition('BaseWithoutProps')
    const name = 'DefinitionWithProps'

    const def = define({ name, base, props: [actionWith(property('testKey', 'string'))] })


    // Props should modify the resulting definition
    expect(def.name).toBe(name)
    expect(def.refines).toBe('BaseWithoutProps')
    expect(def.props.get('testKey')).toMatchObject({
                                                     bindings: [],
                                                     cardinality: '1..1',
                                                     constraints: [],
                                                     isModifier: undefined,
                                                     isSummary: undefined,
                                                     key: 'testKey',
                                                     mustSupport: undefined,
                                                     type: 'string'
                                                   })

  })

  it('should handle multiple props and properly invoke their actions', () => {

    const baseName: string = 'base'
    const refineName = 'profile'
    const base = new Definition(baseName)
    const def = define({
                         name: refineName,
                         base,
                         props: [actionWith(property('key1', 'type1')).hasMany(), actionWith(property('key2', 'type2'))]
                       })

    expect(def.name).toBe(refineName)
    expect(def.refines).toBe(baseName)
    expect(def.props.get('key1')).toMatchObject({
                                                  bindings: [],
                                                  cardinality: '1..*',
                                                  constraints: [],
                                                  isModifier: undefined,
                                                  isSummary: undefined,
                                                  key: 'key1',
                                                  mustSupport: undefined,
                                                  type: 'type1'
                                                })
    expect(def.props.get('key2')).toMatchObject({
                                                  bindings: [],
                                                  cardinality: '1..1',
                                                  constraints: [],
                                                  isModifier: undefined,
                                                  isSummary: undefined,
                                                  key: 'key2',
                                                  mustSupport: undefined,
                                                  type: 'type2'
                                                })


  })

  it('should properly handle empty props array', () => {
    const refine = new Definition('EmptyPropsTest')
    const name = 'EmptyPropsDefinition'
    const def = define({ name, base: refine, props: [] })

    expect(def.name).toBe(name)
    expect(def.refines).toBe(refine.name)
    expect(def.props.size).toBe(0)
  })

  it('should initialize with default refine when not provided', () => {
    const name = 'DefaultRefineTest'
    const def = define({ name })

    expect(def.name).toBe(name)
    expect(def.refines).toBe(name)
    expect(def.props.size).toBe(0)
  })
})
