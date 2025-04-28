import {describe, it}                                from 'vitest'
import {Address, CodeableConcept, HumanName, Timing} from '../DatatypeDef'
import {DomainResourceData}                          from '../internal'
import {Observation, ResourceDef}                    from '../ResourceDef'
import {add}                                         from './builder/add'
import {define}                                      from './define'
import {StructureDefinition}                         from './definition/StructureDefinition'



describe('test', () => {
  it('test', () => {

    const base: StructureDefinition<DomainResourceData> =
      define({
               type: Observation,
               props: [
                 add.oneOf('foo', HumanName)
                    .optional()
                    .boundBy(['baz', 'biff']),
                 add.listOf('baz', Address)
                    .optional(),
                 add.oneOf('baz', CodeableConcept),
                 add.backboneOf('backboneKey', define({
                                                        type: new ResourceDef('ObservationFoo'),
                                                        props: [
                                                          add.oneOf('bkStuff', CodeableConcept)
                                                             .optional()
                                                             .isSummary(),
                                                          add.oneOf('bkThing', Timing).optional()
                                                        ]
                                                      })).optional()
               ]
             })

    const profile: StructureDefinition<DomainResourceData> =
      define({
               type: Observation.profile('profile'),
               base: base,
               props: [
                 add.oneOf<DomainResourceData>('foo', HumanName)
                    .required()
                    .constrainedBy([
                                     () => ({
                                       success: false,
                                       message: 'foo is required'
                                     })
                                   ]),
                 add.oneOf<DomainResourceData>('baz', Address).isSummary(),
                 add.backboneOf<DomainResourceData>('backboneKey', define({
                                                                            type: new ResourceDef(
                                                                              'ObservationFoo'),
                                                             props: [
                                                               add.oneOf('bkStuff',
                                                                         CodeableConcept)
                                                                  .isSummary(),
                                                               add.oneOf('bkThing', Timing)
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
