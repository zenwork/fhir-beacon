import {describe, it}                           from 'vitest'
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
import {add}                                    from './add'
import {Preferred, Required}                    from './BindingStrength'
import {define}                                 from './define'



const { code } = FhirPrimitiveNameEnum


describe('profileDefinition', () => {
  it('should be tested', () => {

    const observation = define({
                                 name: Observation,
                                 props: [

                                   add.listOf('identifier', Identifier)
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


    console.log(observation.toString())

  })
})
