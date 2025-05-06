import {describe, it}                                                                                                            from 'vitest'
import {ObservationData}                                                                                                         from '../components'
import {Annotation, CodeableConcept, Identifier, Period, Quantity, Range, Ratio, Reference, SampledData, SimpleQuantity, Timing} from '../DatatypeDef'

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
import {define, slice}                                                   from './builder'
import {StructureDefinition}                                             from './definition/index'
import {profile}                                                         from './profile'
import {Example, Extensible, Preferred, Required}                        from './util/BindingStrength'

import {aValuePresent} from './util/valuePresent'



export const { code } = PrimitiveDef

describe('profileDefinition', () => {
  it('should be tested', () => {
    const observation =
      profile<ObservationData>({
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
                                   define.optionalListOf<ObservationData>('identifier', Identifier)
                                         .isSummary(),

                                   define
                                     .optionalListOf<ObservationData>('basedOn', Reference, [
                                       CarePlan,
                                       DeviceRequest,
                                       ImmunizationRecommendation,
                                       MedicationRequest,
                                       NutritionOrder,
                                       ServiceRequest
                                     ])
                                     .isSummary(),

                                   define
                                     .optionOf<ObservationData>('partOf', Reference, [
                                       MedicationAdministration,
                                       MedicationDispense,
                                       MedicationStatement,
                                       Procedure,
                                       Immunization,
                                       ImagingStudy
                                     ])
                                     .isSummary(),

                                   define.oneOf<ObservationData>('status', code)
                                         .boundBy('vs-observation-status', Required)
                                         .isSummary(),

                                   define.optionalListOf<ObservationData>('category', CodeableConcept)
                                         .boundBy('vs-observation-category', Preferred),

                                   define.oneOf<ObservationData>('code', CodeableConcept).boundBy(
                                     'vs-observation-codes').isSummary(),

                                   define.optionOf<ObservationData>('subject',
                                                                    Reference,
                                                                    [Patient, Group, Device, Location])
                                         .isSummary(),

                                   define.optionalListOf<ObservationData>('focus', Reference).isSummary(),

                                   define.optionOf<ObservationData>('encounter', Reference, [Encounter]).isSummary(),

                                   define.choiceOf<ObservationData>('effective', 'DateTime', dateTime).optional().isSummary(),
                                   define.choiceOf<ObservationData>('effective', 'Period', Period).optional().isSummary(),
                                   define.choiceOf<ObservationData>('effective', 'Timing', Timing).optional().isSummary(),
                                   define.choiceOf<ObservationData>('effective', 'Instant', instant).optional().isSummary(),

                                   define.oneOf<ObservationData>('issued', instant).optional().isSummary(),

                                   define.optionalListOf<ObservationData>('performer',
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

                                   define.choiceOf<ObservationData>('value', 'Quantity', Quantity).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'CodeableConcept', CodeableConcept).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'String', string).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'Boolean', boolean).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'Integer', integer).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'Range', Range).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'Ratio', Ratio).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'SampledData', SampledData).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'Time', time).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'DateTime', dateTime).optional().isSummary(),
                                   define.choiceOf<ObservationData>('value', 'Period', Period).optional().isSummary(),

                                   define.optionOf<ObservationData>('dataAbsentReason', CodeableConcept)
                                         .boundBy('vs-data-absent-reason', Extensible),
                                   define.optionalListOf<ObservationData>('interpretation', CodeableConcept).boundBy(
                                     'vs-observation-interpretation',
                                     Extensible),
                                   define.optionalListOf<ObservationData>('note', Annotation).optional(),
                                   define.optionOf<ObservationData>('bodySite', CodeableConcept).boundBy('vs-body-site', Example),
                                   define.optionOf<ObservationData>('method', CodeableConcept).boundBy('vs-observation-methods',
                                                                                                       Example),
                                   define.optionOf<ObservationData>('specimen', Reference, [Specimen]),
                                   define.optionOf<ObservationData>('device', Reference, [Device, DeviceMetric]),

                                   define.backboneListOf<ObservationData>(
                                     'referenceRange',
                                     profile<ObservationData>({
                                                                type: new ResourceDef('ObservationReferenceRange'),
                                                                props: [
                                                                  define.optionOf<ObservationData>('low', SimpleQuantity),
                                                                  define.optionOf<ObservationData>('high', SimpleQuantity),
                                                                  define.optionOf<ObservationData>('type', CodeableConcept),
                                                                  define.optionalListOf<ObservationData>('appliesTo', CodeableConcept),
                                                                  define.optionOf<ObservationData>('age', Range),
                                                                  define.optionOf<ObservationData>('text', string)
                                                                ]
                                                              })
                                   ).optional(),

                                   define.optionalListOf<ObservationData>('hasMember',
                                                                          Reference,
                                                                          [Observation, QuestionnaireResponse, MolecularSequence])
                                         .isSummary(),

                                   define.optionalListOf<ObservationData>('derivedForm', Reference,
                                                                          [
                                                                            DocumentReference,
                                                                            ImagingStudy,
                                                                            Media,
                                                                            QuestionnaireResponse,
                                                                            Observation,
                                                                            MolecularSequence
                                                                          ])
                                         .isSummary(),

                                   define.backboneListOf<ObservationData>(
                                     'component',
                                     profile<ObservationData>({
                                                                type: new ResourceDef('ObservationComponent'),
                                                                props: [
                                                                  define.oneOf<ObservationData>('code', CodeableConcept).isSummary(),

                                                                  define.choiceOf<ObservationData>('value', 'Quantity', Quantity)
                                                                        .optional().isSummary(),
                                                                  define.choiceOf<ObservationData>('value',
                                                                                                   'CodeableConcept',
                                                                                                   CodeableConcept)
                                                                        .optional()
                                                                        .isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'String', string)
                                                                        .optional()
                                                                        .isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'Boolean', boolean)
                                                                        .optional().isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'Integer', integer)
                                                                        .optional().isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'Range', Range)
                                                                        .optional()
                                                                        .isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'Ratio', Ratio)
                                                                        .optional()
                                                                        .isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'SampledData', SampledData)
                                                                        .optional().isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'Time', time)
                                                                        .optional()
                                                                        .isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'DateTime', dateTime)
                                                                        .optional().isSummary(),
                                                                  define.choiceOf<ObservationData>('value', 'Period', Period)
                                                                        .optional()
                                                                        .isSummary(),

                                                                  define.optionOf<ObservationData>('dataAbsentReason', CodeableConcept)
                                                                        .boundBy('vs-data-absent-reason', Extensible),
                                                                  define.optionalListOf<ObservationData>('interpretation',
                                                                                                         CodeableConcept).boundBy(
                                                                    'vs-observation-interpretation',
                                                                    Extensible),

                                                                  define.backboneListOf<ObservationData>(
                                                                    'referenceRange',
                                                                    profile<ObservationData>(
                                                                      {
                                                                        type: new ResourceDef('ObservationComponentReferenceRange'),
                                                                        props: [
                                                                          define.optionOf<ObservationData>('low', SimpleQuantity),
                                                                          define.optionOf<ObservationData>('high', SimpleQuantity),
                                                                          define.optionOf<ObservationData>('type', CodeableConcept),
                                                                          define.optionalListOf<ObservationData>('appliesTo',
                                                                                                                 CodeableConcept),
                                                                          define.optionOf<ObservationData>('age', Range),
                                                                          define.optionOf<ObservationData>('text', string)
                                                                        ]
                                                                      })
                                                                  ).optional()
                                                                ]
                                                              })
                                   ).optional().isSummary()

                                 ]
                               })


    const bp: StructureDefinition<ObservationData> =
      profile<ObservationData>({
                                 type: Observation.profile('bp'),
                                 base: observation,
                                 props: [

                                   slice.oneFor(
                                     // name:BPCode
                                     ['code'],
                                     [
                                       (data: ObservationData, fixedValue: string) => ({
                                         success: data.code.coding?.filter(c => c.code === fixedValue).length === 1,
                                         message: 'bp: code.coding[0].code must be ' + fixedValue
                                       }),
                                       (data: ObservationData, fixedValue: string) => ({
                                         success: data.code.coding?.filter(c => c.system === fixedValue).length === 1,
                                         message: 'bp: code.coding[0].system must be ' + fixedValue
                                       })
                                     ],
                                     [
                                       '85354-9',
                                       'http://loinc.org'
                                     ]),
                                   slice.oneFor(
                                     // name:SystolicBP
                                     ['component'],
                                     [
                                       (data: ObservationData, fixedValue: string) => ({
                                         success: data.component?.filter(c => c.code.coding[0].code === fixedValue).length === 1,
                                         message: 'bp: component[0].code.coding[0].code must be ' + fixedValue
                                       }),
                                       (data: ObservationData, fixedValue: string) => ({
                                         success: data.component![0].code.coding[0].system === fixedValue,
                                         message: 'bp: component[0].code.coding[0].system must be ' + fixedValue
                                       })
                                     ],
                                     [
                                       '8480-6',
                                       'http://loinc.org'
                                     ]),
                                   slice.oneFor(
                                     // name:DiastolicBP
                                     ['component'],
                                     [
                                       (data: ObservationData, fixedValue: string) => ({
                                         success: data.component?.filter(c => c.code.coding[0].code === fixedValue).length === 1,
                                         message: 'bp: component[1].code.coding[0].code must be ' + fixedValue
                                       }),
                                       (data: ObservationData, fixedValue: string) => ({
                                         success: data.component![1].code.coding[0].system === fixedValue,
                                         message: 'bp: component[1].code.coding[0].system must be' + fixedValue
                                       })
                                     ],
                                     [
                                       '8462-4',
                                       'http://loinc.org'
                                     ]),
                                   slice.constraint(
                                     ['component'],
                                     [
                                       (data: ObservationData, fixedValue: string) => ({
                                         success: (!!data.dataAbsentReason || data.valueQuantity?.system === fixedValue),
                                         message: 'bp: data.valueQuantity?.system must be ' + fixedValue
                                       }),
                                       (data: ObservationData, fixedValue: string) => ({
                                         success: data.valueQuantity?.code === fixedValue,
                                         message: 'bp: data.valueQuantity.code ' + fixedValue
                                       })
                                     ],
                                     [
                                       'http://unitsofmeasure.org',
                                       'mm[Hg]'
                                     ])
                                 ]
                               })

    // console.log(observation.type.toString())
    // console.log(observation.toString())
    // console.log(JSON.stringify(observation.toJSON(), null, 2))
    // console.log()
    // console.log(bp.type.toString())
    // console.log(bp.toString())

    // expect(bp.type.toString()).toBe('Observation/bp')
    // expect(bp.props.get('identifier')?.cardinality).toBe('1..1')
  })
})
