import {describe, it}                                from 'vitest'
import {Address, CodeableConcept, HumanName, Timing} from '../DatatypeDef'
import {DomainResourceData}                          from '../internal'
import {Observation, ResourceDef}                    from '../ResourceDef'
import {define}                                      from './builder'
import {StructureDefinition}                         from './definition/StructureDefinition'
import {profile}                                     from './profile'



describe('test', () => {
  it('test', () => {

    const base: StructureDefinition<DomainResourceData> =
      profile({
                type: Observation,
                props: [
                  define.oneOf('foo', HumanName)
                        .optional()
                        .boundBy([{ value: 'baz', display: 'baz' }, { value: 'biff', display: 'biff' }]),
                  define.listOf('baz', Address)
                        .optional(),
                  define.oneOf('baz', CodeableConcept),
                  define.backboneOf('backboneKey', profile({
                                                             type: new ResourceDef('ObservationFoo'),
                                                             props: [
                                                               define.oneOf('bkStuff', CodeableConcept)
                                                                     .optional()
                                                                     .isSummary(),
                                                               define.oneOf('bkThing', Timing).optional()
                                                             ]
                                                           })).optional()
                ]
              })

    const aProfile: StructureDefinition<DomainResourceData> =
      profile({
                type: Observation.profile('profile'),
                base: base,
                props: [
                  define.oneOf<DomainResourceData>('foo', HumanName)
                        .required()
                        .constrainedBy([
                                         () => ({
                                           success: false,
                                           message: 'foo is required'
                                         })
                                       ]),
                  define.oneOf<DomainResourceData>('baz', Address).isSummary(),
                  define.backboneOf<DomainResourceData>('backboneKey', profile({
                                                                                 type: new ResourceDef(
                                                                                   'ObservationFoo'),
                                                                                 props: [
                                                                                   define.oneOf('bkStuff',
                                                                                                CodeableConcept)
                                                                                         .isSummary(),
                                                                                   define.oneOf('bkThing', Timing)
                                                                                 ]
                                                                               }))

                ]
              })


    // console.log(base.type.toString())
    // console.log(base.toString())
    // console.log()
    // console.log(profile.type.toString())
    // console.log(profile.toString())
    // console.log(JSON.stringify(profile, null, 2))

  })
})
