import {describe, expect, it}                 from 'vitest'
import {Basic, FhirResourceEnum, Observation} from '../FhirResourceEnum'
import {define}                               from './define'
import {Definition}                           from './definition'
import {prop}                                 from './prop'
import {set}                                  from './set'



describe('define function tests', () => {
  const name: FhirResourceEnum = new FhirResourceEnum('Basic')

  it('should create a definition with the provided name and no props or refine (default behavior)', () => {

    const def = define({ name })

    expect(def.name).toBe(name)
    expect(def.name.profileName).toBe(name.profileName) // Default refine is set to the same name
    expect(def.props.size).toBe(0) // No props
  })

  it('should clone the refine definition and update the name', () => {
    const refine = new Definition(name)

    const def = define({ name: name.profile('profile'), base: refine })

    expect(def.name.value).toBe(name.value)
    expect(def.name.profileName).toBe('profile') // refines is copied from the refine definition
    expect(def.props.size).toBe(0) // No props to apply
  })

  it('should apply props actions and modify the resulting definition', () => {

    const base = new Definition(name)


    const def = define({ name: name.profile('profile'), base, props: [set(prop('testKey', 'string'))] })


    // Props should modify the resulting definition
    expect(def.name.value).toBe(name.value)
    expect(def.name.profileName).toBe('profile')
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


    const base = new Definition(name)
    const def = define({
                         name: name.profile('profile'),
                         base,
                         props: [set(prop('key1', 'code')).hasMany(), set(prop('key2', 'code'))]
                       })

    expect(def.name.value).toBe(name.value)
    expect(def.name.profileName).toBe('profile')
    expect(def.props.get('key1')).toMatchObject({
                                                  bindings: [],
                                                  cardinality: '1..*',
                                                  constraints: [],
                                                  isModifier: undefined,
                                                  isSummary: undefined,
                                                  key: 'key1',
                                                  mustSupport: undefined,
                                                  type: 'code'
                                                })
    expect(def.props.get('key2')).toMatchObject({
                                                  bindings: [],
                                                  cardinality: '1..1',
                                                  constraints: [],
                                                  isModifier: undefined,
                                                  isSummary: undefined,
                                                  key: 'key2',
                                                  mustSupport: undefined,
                                                  type: 'code'
                                                })


  })

  it('should properly handle empty props array', () => {
    const refine = new Definition(name)
    const def = define({ name, base: refine, props: [] })

    expect(def.name.value).toBe(name.value)
    expect(def.name.profileName).toBe(refine.name.profileName)
    expect(def.props.size).toBe(0)
  })

  it('should initialize with default refine when not provided', () => {
    const name = new FhirResourceEnum('Basic')
    const def = define({ name })

    expect(def.name.value).toBe(name.value)
    expect(def.name.profileName).toBe(name.profileName)
    expect(def.props.size).toBe(0)
  })

  it('should throw an error when the base names do not match', () => {
    expect(() => define({ name: Observation.profile('foo'), base: new Definition(Basic) })).toThrow(
      'Base name Basic does not match name Observation')
  })
})
