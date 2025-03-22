import {describe, it} from 'vitest'
import {add}          from './add'
import {define}       from './define'
import {Definition}   from './definition'



describe('test', () => {
  it('test', () => {

    const base: Definition = define({
                                      name: 'base',
                                      props: [
                                        add.prop('foo', 'bar')
                                           .optional()
                                           .boundBy(['baz', 'biff']),
                                        add.listOf('baz', 'biff')
                                           .optional(),
                                        add.prop('baz', 'biff'),
                                        add.backboneOf(define({
                                                                name: 'stuff', props: [
                                            add.prop('bkStuff', 'bar').optional().boundBy(['a', 'b', 'c']),
                                            add.prop('bkThing', 'foo').optional()
                                          ]
                                                              })).optional()
                                      ]
                                    })

    const profile: Definition = define({
                                         name: 'profile',
                                         base: base,
                                         props: [
                                           add.prop('foo', 'bar')
                                              .required()
                                              .constrainedBy([() => ({ key: 'foo', error: 'foo is required' })]),
                                           add.prop('baz', 'biff').isSummary(),
                                           add.backboneOf(define({
                                                                   name: 'stuff', props: [
                                               add.prop('bkStuff', 'bar').isSummary(),
                                               add.prop('bkThing', 'foo')
                                             ]
                                                                 }))

                                         ]
                                       })


    console.log(base.name + `${base.refines !== base.name ? `[refines:${base.refines}]` : ''}`)
    console.log(base.toString())
    console.log()
    console.log(profile.name + `${profile.refines !== profile.name ? `[refines:${profile.refines}]` : ''}`)
    console.log(profile.toString())
    console.log(JSON.stringify(profile, null, 2))

  })
})
