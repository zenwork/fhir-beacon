import {beforeEach, describe, expect, it}                                                                          from 'vitest'
import {Context, DefConstraintAssertion, Example, extend, ExtensionDef, profile, PropertyDef, StructureDefinition} from '..'
import {CodeableConcept, Extension}                                                                                from '../../DatatypeDef'
import {DomainResourceData}                                                                                        from '../../internal'
import {define}                                                                                                    from './define'
import {definitionProperty}                                                                                        from './definitionProperty'
import {extensionBuilder}                                                                                          from './extensionBuilder'



describe('profile extensions', () => {
  let def: StructureDefinition<DomainResourceData>
  let testContext: Context<DomainResourceData>
  let kv: PropertyDef<DomainResourceData>

  beforeEach(() => {
    // def = new StructureDefinition(Extension)
    testContext = new Context(Extension, def)
  })

  it('should create a simple extension', () => {
    /**
     * ```json
     *    {
     *      "resourceType" : "Patient",
     *      "extension" : [{
     *        "url" : "http://example.org/fhir/StructureDefinition/participation-agreement",
     *        "valueUri" : "http://example.org/phr/documents/patient/general/v1"
     *      }]
     *    // ...
     *    }
     *  ```
     */

    def = profile<DomainResourceData>({
                                        type: Extension,
                                        props: [
                                          extend.withSimple(
                                            'http://example.org/fhir/StructureDefinition/participation-agreement',
                                            'uri'
                                          )
                                        ]
                                      })

    const extension: any = def.props.get('extension') as ExtensionDef
    // expect(extension?.cardinality).toBe('0..*')
    expect(extension?.subdefs?.get('valueCodeableConcept')?.cardinality).toBe('1..1')

  })

  it.skip('should set an extension', () => {
    const subdefs: any = profile<DomainResourceData>(
      {
        type: Extension,
        props: [
          define.oneOf('valueCodeableConcept', CodeableConcept)
        ]
      }).props

    const action = extensionBuilder<DomainResourceData>(
      // @ts-ignore
      definitionProperty<DomainResourceData>(
        `_foo`,
        def.type.value,
        [],
        '0..1',
        [],
        Example,
        [] as DefConstraintAssertion<any>[],
        undefined,
        subdefs
      )
    )
    action.setCtx(testContext)
    action.build()
    expect(def.getExtension('_foo')?.cardinality).toBe('0..1')
    // expect(def.getExtension('_foo')?.subdefs?.get('valueCodeableConcept')?.cardinality).toBe('1..1')
  })
})
