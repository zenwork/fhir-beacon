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
import {ObservationData}                        from '../components'
import {add}                                    from './builder/add'
import {define}                                 from './define'
import {Preferred, Required}                    from './definition/BindingStrength'
import {Definition}                             from './definition/definition'
import {aValuePresent}                          from './valuePresent'



export const { code } = FhirPrimitiveNameEnum

describe('profileDefinition', () => {
  it('should be tested', () => {
    const observation = define<ObservationData>({
                                                  name: Observation,
                                                  constraints: [
                                                    (data: ObservationData) => {
                                                      if (data.dataAbsentReason && aValuePresent(data)) {
                                                        return {
                                                          success: false,
                                                          message:
                                                            'obs-6: dataAbsentReason SHALL only be present if Observation.value[x] is not present'
                                                        }
                                                      }
                                                      return { success: true }
                                                    },
                                                    (data: ObservationData) => {
                                                      if (
                                                        data.component?.some((c) => c.code.coding === data.code.coding)
                                                        &&
                                                        aValuePresent(data)
                                                      ) {
                                                        return {
                                                          success: false,
                                                          message:
                                                            'obs-7: if Observation.code is the same as an Observation.component.code then the value'
                                                        }
                                                      }
                                                      return { success: true }
                                                    }
                                                  ],
                                                  props: [
                                                    add.listOf<ObservationData>('identifier', Identifier)
                                                       .optional()
                                                       .isSummary(),

                                                    add
                                                      .listOf<ObservationData>('basedOn', Reference, [
                                                        CarePlan,
                                                        DeviceRequest,
                                                        ImmunizationRecommendation,
                                                        MedicationRequest,
                                                        NutritionOrder,
                                                        ServiceRequest
                                                      ])
                                                      .isSummary(),

                                                    add
                                                      .listOf<ObservationData>('partOf', Reference, [
                                                        MedicationAdministration,
                                                        MedicationDispense,
                                                        MedicationStatement,
                                                        Procedure,
                                                        Immunization,
                                                        ImagingStudy
                                                      ])
                                                      .isSummary(),

                                                    add
                                                      .oneOf<ObservationData>('status', code)
                                                      .boundBy('vs-observation-status', Required)
                                                      .isSummary(),

                                                    add
                                                      .listOf<ObservationData>('category', CodeableConcept)
                                                      .boundBy('vs-observation-category', Preferred),

                                                    add.oneOf<ObservationData>('code', CodeableConcept).boundBy(
                                                      'vs-observation-codes'),

                                                    add
                                                      .oneOf<ObservationData>('subject',
                                                                              Reference,
                                                                              [Patient, Group, Device, Location])
                                                      .optional(),

                                                    add.listOf('focus', Reference),

                                                    add.oneOf<ObservationData>('encounter', Reference, [Encounter])
                                                       .optional()
                                                       .isSummary()
                                                  ]
                                                })

    const bp: Definition<ObservationData> = define<ObservationData>({
                                                                      name: Observation.profile('bp'),
                                                                      base: observation,
                                                                      props: [
                                                                        add.oneOf<ObservationData>('identifier',
                                                                                                   Identifier)
                                                                           .constrainedBy([
                                                                                            (v: ObservationData) => {
                                                                                              if (v.id !== 'abc-123')
                                                                                                return {
                                                                                                  success: false,
                                                                                                  message: 'identifier must equal abc-123'
                                                                                                }
                                                                                              return { success: true }
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
    expect(bp.props.get('identifier')?.cardinality).toBe('1..1')
  })
})
