import {describe, it}                                from 'vitest'
import {Address, CodeableConcept, HumanName, Timing} from '../FhirDatatypeEnum'
import {FhirResourceEnum, Observation}               from '../FhirResourceEnum'
import {add}                                         from './add'
import {define}                                      from './define'
import {Definition}                                  from './definition'



describe('test', () => {
  it('test', () => {

    const base: Definition = define({
                                      name: Observation,
                                      props: [
                                        add.oneOf('foo', HumanName)
                                           .optional()
                                           .boundBy(['baz', 'biff']),
                                        add.listOf('baz', Address)
                                           .optional(),
                                        add.oneOf('baz', CodeableConcept),
                                        add.backboneOf(define({
                                                                name: new FhirResourceEnum('BackboneElement'), props: [
                                            add.oneOf('bkStuff', CodeableConcept).optional().boundBy(['a', 'b', 'c']),
                                            add.oneOf('bkThing', Timing).optional()
                                          ]
                                                              })).optional()
                                      ]
                                    })

    const profile: Definition = define({
                                         name: Observation.profile('profile'),
                                         base: base,
                                         props: [
                                           add.oneOf('foo', HumanName)
                                              .required()
                                              .constrainedBy([() => ({ key: 'foo', error: 'foo is required' })]),
                                           add.oneOf('baz', Address).isSummary(),
                                           add.backboneOf(define({
                                                                   name: new FhirResourceEnum('BackboneElement'),
                                                                   props: [
                                                                     add.oneOf('bkStuff', CodeableConcept).isSummary(),
                                                                     add.oneOf('bkThing', Timing)
                                                                   ]
                                                                 }))

                                         ]
                                       })


    console.log(base.name.toString())
    console.log(base.toString())
    console.log()
    console.log(profile.name.toString())
    console.log(profile.toString())
    // console.log(JSON.stringify(profile, null, 2))

  })
})
