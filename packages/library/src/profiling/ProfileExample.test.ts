import {IdentifierData}                         from 'components'
import {describe, expect, it}                   from 'vitest'
import {CodeableConcept, Identifier, Reference} from '../FhirDatatypeEnum'
import {FhirPrimitiveNameEnum}                  from '../FhirPrimitiveEnum'
import {
  CarePlan,
  Device,
  DeviceRequest,
  Encounter,
  Group,
  ImagingStudy,
  Immunization,
  ImmunizationRecommendation,
  Location,
  MedicationAdministration,
  MedicationDispense,
  MedicationRequest,
  MedicationStatement,
  NutritionOrder,
  Observation,
  Patient,
  Procedure,
  ServiceRequest
}                                               from '../FhirResourceEnum'
import {Preferred, Required}                    from './BindingStrength'
import {add}                                    from './add'
import {define}                                 from './define'
import {Definition}                             from './definition'



const { code } = FhirPrimitiveNameEnum


describe('profileDefinition', () => {
  it('should be tested', () => {

    const observation = define({
                                 name: Observation,
                                 props: [

                                   add.listOf('identifier', Identifier)
                                      .optional()
                                      .isSummary(),

                                   add.listOf('basedOn',
                                              Reference,
                                              [
                                                CarePlan,
                                                DeviceRequest,
                                                ImmunizationRecommendation,
                                                MedicationRequest,
                                                NutritionOrder,
                                                ServiceRequest
                                              ]).isSummary(),

                                   add.listOf('partOf',
                                              Reference,
                                              [
                                                MedicationAdministration,
                                                MedicationDispense,
                                                MedicationStatement,
                                                Procedure,
                                                Immunization,
                                                ImagingStudy
                                              ]).isSummary(),

                                   add.oneOf('status', code)
                                      .boundBy('vs-observation-status', Required)
                                      .isSummary(),

                                   add.listOf('category', CodeableConcept)
                                      .boundBy('vs-observation-category', Preferred),

                                   add.oneOf('code', CodeableConcept)
                                      .boundBy('vs-observation-codes'),

                                   add.oneOf('subject', Reference,
                                             [Patient, Group, Device, Location])
                                      .optional(),

                                   add.listOf('focus', Reference),

                                   add.oneOf('encounter', Reference, [Encounter])
                                      .optional()
                                      .isSummary()

                                 ]
                               })


    const bp: Definition = define({
                                    name: Observation.profile('bp'),
                                    base: observation,
                                    props: [
                                      add.oneOf('identifier', Identifier)
                                         .constrainedBy([
                                                          (v: IdentifierData) => {
                                                            if (v.id
                                                                !== 'abc-123') return {
                                                              key: 'identifier',
                                                              error: 'identifier must equal abc-123'
                                                            }
                                                          }
                                                        ])
                                    ]
                                  })


    console.log(observation.name.toString())
    console.log(observation.toString())
    console.log()
    console.log(bp.name.toString())
    console.log(bp.toString())

    expect(bp.name.toString()).toBe('Observation/bp')
    expect(bp.props.get('identifier').cardinality).toBe('1..1')
  })
})
