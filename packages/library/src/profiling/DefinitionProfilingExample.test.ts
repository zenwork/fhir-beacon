import {describe, it} from 'vitest'
import {
  ObservationData
}                     from '../components'
import {
  Annotation,
  CodeableConcept,
  Coding,
  Identifier,
  Period,
  Quantity,
  Range,
  Ratio,
  Reference,
  SampledData,
  SimpleQuantity,
  Timing
}                     from '../DatatypeDef'

import {boolean, dateTime, instant, integer, PrimitiveDef, string, time} from '../PrimitiveDef'
import {
  CarePlan,
  CareTeam,
  Device,
  DeviceMetric,
  DeviceRequest,
  DocumentReference,
  Encounter,
  Group,
  ImagingStudy,
  Immunization,
  ImmunizationRecommendation,
  Location,
  Media,
  MedicationAdministration,
  MedicationDispense,
  MedicationRequest,
  MedicationStatement,
  MolecularSequence,
  NutritionOrder,
  Observation,
  Organization,
  Patient,
  Practitioner,
  PractitionerRole,
  Procedure,
  QuestionnaireResponse,
  RelatedPerson,
  ResourceDef,
  ServiceRequest,
  Specimen
}                                                                        from '../ResourceDef'
import {add}                                                             from './builder/add'
import {define}                                                          from './define'
import {Example, Extensible, Preferred, Required}                        from './definition/BindingStrength'
import {StructureDefinition}                                             from './definition/index'
import {profile}                                                         from './profile/index'
import {aValuePresent}                                                   from './valuePresent'



export const { code } = PrimitiveDef

describe('profileDefinition', () => {
  it('should be tested', () => {
    const observation =
      define<ObservationData>({
                                type: Observation,
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
                                  add.optionalListOf<ObservationData>('identifier', Identifier)
                                     .isSummary(),

                                  add
                                    .optionalListOf<ObservationData>('basedOn', Reference, [
                                      CarePlan,
                                      DeviceRequest,
                                      ImmunizationRecommendation,
                                      MedicationRequest,
                                      NutritionOrder,
                                      ServiceRequest
                                    ])
                                    .isSummary(),

                                  add
                                    .optionOf<ObservationData>('partOf', Reference, [
                                      MedicationAdministration,
                                      MedicationDispense,
                                      MedicationStatement,
                                      Procedure,
                                      Immunization,
                                      ImagingStudy
                                    ])
                                    .isSummary(),

                                  add.oneOf<ObservationData>('status', code)
                                     .boundBy('vs-observation-status', Required)
                                     .isSummary(),

                                  add.optionalListOf<ObservationData>('category', CodeableConcept)
                                     .boundBy('vs-observation-category', Preferred),

                                  add.oneOf<ObservationData>('code', CodeableConcept).boundBy(
                                    'vs-observation-codes').isSummary(),

                                  add.optionOf<ObservationData>('subject',
                                                                Reference,
                                                                [Patient, Group, Device, Location])
                                     .isSummary(),

                                  add.optionalListOf<ObservationData>('focus', Reference).isSummary(),

                                  add.optionOf<ObservationData>('encounter', Reference, [Encounter]).isSummary(),

                                  add.choiceOf<ObservationData>('effective', 'DateTime', dateTime).optional().isSummary(),
                                  add.choiceOf<ObservationData>('effective', 'Period', Period).optional().isSummary(),
                                  add.choiceOf<ObservationData>('effective', 'Timing', Timing).optional().isSummary(),
                                  add.choiceOf<ObservationData>('effective', 'Instant', instant).optional().isSummary(),

                                  add.oneOf<ObservationData>('issued', instant).optional().isSummary(),

                                  add.optionalListOf<ObservationData>('performer',
                                                                      Reference,
                                                                      [
                                                                        Practitioner,
                                                                        PractitionerRole,
                                                                        Organization,
                                                                        CareTeam,
                                                                        Patient,
                                                                        RelatedPerson
                                                                      ])
                                     .isSummary(),

                                  add.choiceOf<ObservationData>('value', 'Quantity', Quantity).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'CodeableConcept', CodeableConcept).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'String', string).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'Boolean', boolean).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'Integer', integer).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'Range', Range).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'Ratio', Ratio).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'SampledData', SampledData).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'Time', time).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'DateTime', dateTime).optional().isSummary(),
                                  add.choiceOf<ObservationData>('value', 'Period', Period).optional().isSummary(),

                                  add.optionOf<ObservationData>('dataAbsentReason', CodeableConcept)
                                     .boundBy('vs-data-absent-reason', Extensible),
                                  add.optionalListOf<ObservationData>('interpretation', CodeableConcept).boundBy(
                                    'vs-observation-interpretation',
                                    Extensible),
                                  add.optionalListOf<ObservationData>('note', Annotation).optional(),
                                  add.optionOf<ObservationData>('bodySite', CodeableConcept).boundBy('vs-body-site', Example),
                                  add.optionOf<ObservationData>('method', CodeableConcept).boundBy('vs-observation-methods',
                                                                                                   Example),
                                  add.optionOf<ObservationData>('specimen', Reference, [Specimen]),
                                  add.optionOf<ObservationData>('device', Reference, [Device, DeviceMetric]),

                                  add.backboneListOf<ObservationData>(
                                    'referenceRange',
                                    define<ObservationData>({
                                                              type: new ResourceDef('ObservationReferenceRange'),
                                                              props: [
                                                                add.optionOf<ObservationData>('low', SimpleQuantity),
                                                                add.optionOf<ObservationData>('high', SimpleQuantity),
                                                                add.optionOf<ObservationData>('type', CodeableConcept),
                                                                add.optionalListOf<ObservationData>('appliesTo', CodeableConcept),
                                                                add.optionOf<ObservationData>('age', Range),
                                                                add.optionOf<ObservationData>('text', string)
                                                              ]
                                                            })
                                  ).optional(),

                                  add.optionalListOf<ObservationData>('hasMember',
                                                                      Reference,
                                                                      [Observation, QuestionnaireResponse, MolecularSequence])
                                     .isSummary(),

                                  add.optionalListOf<ObservationData>('derivedForm', Reference,
                                                                      [
                                                                        DocumentReference,
                                                                        ImagingStudy,
                                                                        Media,
                                                                        QuestionnaireResponse,
                                                                        Observation,
                                                                        MolecularSequence
                                                                      ])
                                     .isSummary(),

                                  add.backboneListOf<ObservationData>(
                                    'component',
                                    define<ObservationData>({
                                                              type: new ResourceDef('ObservationComponent'),
                                                              props: [
                                                                add.oneOf<ObservationData>('code', CodeableConcept).isSummary(),

                                                                add.choiceOf<ObservationData>('value', 'Quantity', Quantity)
                                                                   .optional().isSummary(),
                                                                add.choiceOf<ObservationData>('value',
                                                                                              'CodeableConcept',
                                                                                              CodeableConcept)
                                                                   .optional()
                                                                   .isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'String', string)
                                                                   .optional()
                                                                   .isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'Boolean', boolean)
                                                                   .optional().isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'Integer', integer)
                                                                   .optional().isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'Range', Range)
                                                                   .optional()
                                                                   .isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'Ratio', Ratio)
                                                                   .optional()
                                                                   .isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'SampledData', SampledData)
                                                                   .optional().isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'Time', time)
                                                                   .optional()
                                                                   .isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'DateTime', dateTime)
                                                                   .optional().isSummary(),
                                                                add.choiceOf<ObservationData>('value', 'Period', Period)
                                                                   .optional()
                                                                   .isSummary(),

                                                                add.optionOf<ObservationData>('dataAbsentReason', CodeableConcept)
                                                                   .boundBy('vs-data-absent-reason', Extensible),
                                                                add.optionalListOf<ObservationData>('interpretation',
                                                                                                    CodeableConcept).boundBy(
                                                                  'vs-observation-interpretation',
                                                                  Extensible),

                                                                add.backboneListOf<ObservationData>(
                                                                  'referenceRange',
                                                                  define<ObservationData>({
                                                                                            type: new ResourceDef(
                                                                                              'ObservationComponentReferenceRange'),
                                                                                            props: [
                                                                                              add.optionOf<ObservationData>('low',
                                                                                                                            SimpleQuantity),
                                                                                              add.optionOf<ObservationData>('high',
                                                                                                                            SimpleQuantity),
                                                                                              add.optionOf<ObservationData>('type',
                                                                                                                            CodeableConcept),
                                                                                              add.optionalListOf<ObservationData>(
                                                                                                'appliesTo',
                                                                                                CodeableConcept),
                                                                                              add.optionOf<ObservationData>('age',
                                                                                                                            Range),
                                                                                              add.optionOf<ObservationData>('text',
                                                                                                                            string)
                                                                                            ]
                                                                                          })
                                                                ).optional()
                                                              ]
                                                            })
                                  ).optional().isSummary()

                                ]
                              })


    const bp: StructureDefinition<ObservationData> =
      define<ObservationData>({
                                type: Observation.profile('bp'),
                                base: observation,
                                props: [
                                  profile.slice(
                                    ['code', 'coding'],
                                    Coding,
                                    [
                                      (data: ObservationData) => ({
                                        success: data.code.coding[0].code === '85354-9',
                                        message: 'bp: code.coding[0].code must be 85354-9'
                                      }),
                                      (data: ObservationData) => ({
                                        success: data.code.coding[0].system === 'http://loinc.org',
                                        message: 'bp: code.coding[0].system must be http://loinc.org'
                                      })
                                    ])
                                ]
                              })

    console.log(observation.type.toString())
    console.log(observation.toString())
    // console.log(JSON.stringify(observation.toJSON(), null, 2))
    console.log()
    console.log(bp.type.toString())
    console.log(bp.toString())

    // expect(bp.type.toString()).toBe('Observation/bp')
    // expect(bp.props.get('identifier')?.cardinality).toBe('1..1')
  })
})
