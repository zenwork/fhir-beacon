import {describe, it}          from 'vitest'
import {FhirDatatypeNameEnum}  from '../FhirDatatypeEnum'
import {FhirPrimitiveNameEnum} from '../FhirPrimitiveEnum'
import {FhirResourceNameEnum}  from '../FhirResourceNameEnum'
import {add}                   from './add'
import {define}                from './define'



const { Identifier, Reference, CodeableConcept } = FhirDatatypeNameEnum
const { code } = FhirPrimitiveNameEnum
const {
  CarePlan,
  DeviceRequest,
  ImmunizationRecommendation,
  MedicationRequest,
  NutritionOrder,
  ServiceRequest,
  MedicationAdministration,
  MedicationDispense,
  MedicationStatement,
  Procedure,
  Immunization,
  ImagingStudy,
  Patient,
  Group,
  Device,
  Location,
  Encounter
} = FhirResourceNameEnum

describe('profileDefinition', () => {
  it('should be tested', () => {

    const observation = define({
                                 name: 'Observation',
                                 props: [

                                   add.zeroToN('identifier', Identifier)
                                      .isSummary(),

                                   add.zeroToN('basedOn',
                                               Reference,
                                               [
                                                 CarePlan,
                                                 DeviceRequest,
                                                 ImmunizationRecommendation,
                                                 MedicationRequest,
                                                 NutritionOrder,
                                                 ServiceRequest
                                               ]).isSummary(),

                                   add.zeroToN('partOF',
                                               Reference,
                                               [
                                                 MedicationAdministration,
                                                 MedicationDispense,
                                                 MedicationStatement,
                                                 Procedure,
                                                 Immunization,
                                                 ImagingStudy
                                               ]).isSummary(),

                                   add.one('status', code)
                                      .boundBy('vs-observation-status', 'required')
                                      .isSummary(),

                                   add.zeroToN('category', CodeableConcept)
                                      .boundBy('vs-observation-category', 'preferred'),

                                   add.one('code', CodeableConcept)
                                      .boundBy('vs-observation-codes'),

                                   add.one('subject', Reference,
                                           [Patient, Group, Device, Location])
                                      .optional(),

                                   add.zeroToN('focus', Reference),

                                   add.one('encounter', Reference, [Encounter])
                                      .optional()
                                      .isSummary()

                                 ]
                               })

    console.log(observation.toString())

  })
})
