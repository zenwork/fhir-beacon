import {beforeEach, describe, expect, it}             from 'vitest'
import {ContactPointData}                             from '../components'
import {ContactPoint, DatatypeDef, Extension}         from '../DatatypeDef'
import {decorate, Decorated, FqkMap, ValidationsImpl} from '../internal'

import {profile as profileKey}                                                     from '../internal/base/Validations.type'
import {code}                                                                      from '../PrimitiveDef'
import {Context, define, extend, profile, PropertyDef, slice, StructureDefinition} from './index'



describe('profile validation', () => {
  let def: StructureDefinition<ContactPointData>
  let testContext: Context<ContactPointData>
  let kv: PropertyDef<ContactPointData>

  beforeEach(() => {
    testContext = new Context(Extension, new StructureDefinition<ContactPointData>(Extension))
  })

  it('should create a simple slice and validate it against data', () => {

    const data: ContactPointData & { _use?: any } = {
      system: 'email',  //error
      value: '+41 78 123 4567',
      use: 'home',
      _use: {
        extension: [
          {
            url: 'https://fhir.ch/ig/ch-core/5.0.0/StructureDefinition-ch-ext-ech-46-phonecategory.html',
            valueCodeableConcept: {
              coding: [
                {
                  system: 'https://fhir.ch/ig/ch-core/5.0.0/CodeSystem-ch-ech-46-phonecategory',
                  code: '12',   //error
                  display: 'PrivateMobile'
                }
              ]
            }
          }
        ]
      },
      period: {
        start: '2022-07-01',
        end: '2024-07-01'
      }
    }

    const baseDefinition: StructureDefinition<ContactPointData> = profile(
      {
        type: ContactPoint,
        props: [
          define.oneOf('system', code).optional()
        ]
      })


    const profiledDefinition: StructureDefinition<ContactPointData> = profile(
      {
        type: new DatatypeDef('ContactPoint', 'CHCoreContactPointECH46Phone'),
        base: baseDefinition,
        props: [
          slice.constraint(
            ['system'],
            [
              (data: ContactPointData, fixedValue: string) => ({
                success: data.system === fixedValue,
                message: `Must be fixed value:${fixedValue}`
              })
            ],
            ['phone']
          ),
          extend.primitive<ContactPointData>(
            'use',
            'https://fhir.ch/ig/ch-core/5.0.0/StructureDefinition-ch-ext-ech-46-phonecategory.html',
            [
              {
                key: 'phoneCategory',
                url: 'https://fhir.ch/ig/ch-core/5.0.0/StructureDefinition-ch-ext-ech-46-phonecategory.html',
                valueType: 'CodeableConcept',
                bindings: [
                  { value: '1', display: 'PrivatePhone' },
                  { value: '2', display: 'PrivateMobile' },
                  { value: '3', display: 'PrivateFax' },
                  { value: '4', display: 'PrivateInternetVoice' },
                  { value: '5', display: 'BusinessCentral' },
                  { value: '6', display: 'BusinessDirect' },
                  { value: '7', display: 'BusinessMobile' },
                  { value: '8', display: 'BusinessFax' },
                  { value: '9', display: 'BusinessInternetVoice' },
                  { value: '10', display: 'Pager' }
                ]
              }
            ])
        ]
      })


    const decoratedContactPoint: Decorated<ContactPointData> = decorate('test', data, new FqkMap(), profiledDefinition)
    const validations = new ValidationsImpl<ContactPointData>(decoratedContactPoint)
    decoratedContactPoint[profileKey]!.validate(decoratedContactPoint, validations, false)

    expect(validations.all()).length(2)

    expect(validations.all()[0].fqk).toEqual({ path: [{ node: 'system' }] })
    expect(validations.all()[0].message).toBe('Must be fixed value:phone (CHCoreContactPointECH46Phone)')

    expect(validations.all()[1].fqk).toEqual({
                                               path: [
                                                 { node: 'extension' },
                                                 { node: 'https://fhir.ch/ig/ch-core/5.0.0/StructureDefinition-ch-ext-ech-46-phonecategory.html' },
                                                 { node: 'valueCodeableConcept' },
                                                 { node: 'coding' },
                                                 { node: 'code' }
                                               ]
                                             })
    expect(validations.all()[1].message).toBe('wrong binding value')


  })

})
