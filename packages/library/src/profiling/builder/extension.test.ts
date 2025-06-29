import {beforeEach, describe, expect, it}                                         from 'vitest'
import {Context, extend, ExtensionDef, profile, PropertyDef, StructureDefinition} from '..'
import {CodeableConcept, Extension}                                               from '../../DatatypeDef'
import {DomainResourceData}                                                       from '../../internal'



describe('profile extensions', () => {
  let def: StructureDefinition<DomainResourceData>
  let testContext: Context<DomainResourceData>
  let kv: PropertyDef<DomainResourceData>

  beforeEach(() => {
    // def = new StructureDefinition(Extension)
    testContext = new Context(Extension, def)
  })

  it('should create a simple extension', () => {

    def = profile<DomainResourceData>({
                                        type: Extension,
                                        props: [
                                          extend.withOne(
                                            'CRInitiatingLocation',
                                            {
                                              url: 'http://hl7.org/fhir/StructureDefinition/communicationrequest-initiatingLocation',
                                              valueType: 'Reference',
                                              valueTypeNarrowing: ['Location']
                                            }
                                          ),
                                          extend.withOne(
                                            'ParticipationAgreement',
                                            {
                                              url: 'http://example.org/fhir/StructureDefinition/participation-agreement',
                                              valueType: 'uri'
                                            }
                                          )
                                        ]
                                      })

    let extension: ExtensionDef = def.getExtension('CRInitiatingLocation')!

    expect(extension).toBeDefined()
    expect(extension.key).toEqual('CRInitiatingLocation')
    expect(extension.defType).toEqual('extension')
    expect(extension.url).toEqual('http://hl7.org/fhir/StructureDefinition/communicationrequest-initiatingLocation')
    expect(extension.valueType).toEqual('Reference')
    expect(extension.valueTypeNarrowing).toEqual(['Location'])
    expect(extension.cardinality).toEqual('1..1')

    extension = def.getExtension('ParticipationAgreement')!

    expect(extension).toBeDefined()
    expect(extension.key).toEqual('ParticipationAgreement')
    expect(extension.defType).toEqual('extension')
    expect(extension.url).toEqual('http://example.org/fhir/StructureDefinition/participation-agreement')
    expect(extension.valueType).toEqual('uri')
    expect(extension.cardinality).toEqual('1..1')

  })

  it('should create a complex extension', () => {

    def = profile<DomainResourceData>({
                                        type: Extension,
                                        props: [
                                          extend.withComplex(
                                            'ClinicalTrialParticipation',
                                            {
                                              url: 'http://example.org/fhir/StructureDefinition/patient-clinicalTrial',
                                              extensions: [
                                                {
                                                  url: 'NCT',
                                                  valueType: 'string'
                                                },
                                                {
                                                  url: 'period',
                                                  valueType: 'Period'
                                                },
                                                {
                                                  url: 'reason',
                                                  valueType: 'CodeableConcept'
                                                }
                                              ]
                                            }
                                          )
                                        ]
                                      })

    let extension: ExtensionDef = def.getExtension('ClinicalTrialParticipation')!

    expect(extension).toBeDefined()
    expect(extension.key).toEqual('ClinicalTrialParticipation')
    expect(extension.defType).toEqual('extension')
    expect(extension.url).toEqual('http://example.org/fhir/StructureDefinition/patient-clinicalTrial')
    expect(extension.valueType).toBeUndefined()
    expect(extension.valueTypeNarrowing).toBeUndefined()
    expect(extension.cardinality).toEqual('1..1')

    expect(extension.subdefs).toBeDefined()
    expect(extension.subdefs!.size).toEqual(3)

    const nct = extension.subdefs!.get('NCT') as ExtensionDef
    expect(nct).toBeDefined()
    expect(nct!.key).toEqual('NCT')
    expect(nct!.valueType).toEqual('string')

    const period = extension.subdefs!.get('period') as ExtensionDef
    expect(period).toBeDefined()
    expect(period!.key).toEqual('period')
    expect(period!.valueType).toEqual('Period')

    const reason = extension.subdefs!.get('reason') as ExtensionDef
    expect(reason).toBeDefined()
    expect(reason!.key).toEqual('reason')
    expect(reason!.valueType).toEqual('CodeableConcept')
    expect(reason!.cardinality).toEqual('1..1')
    expect(reason!.subdefs).toBeUndefined()

  })

  it('should set an extension', () => {
    def = profile<DomainResourceData>({
                                        type: Extension,
                                        props: [
                                          extend.primitive(
                                            'given',
                                            'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier',
                                            [
                                              {
                                                url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier',
                                                valueType: 'code'
                                              }
                                            ]
                                          )
                                        ]
                                      })

    let extension: ExtensionDef = def.getExtension('_given')!

    expect(extension).toBeDefined()
    expect(extension.key).toEqual('_given')
    expect(extension.defType).toEqual('extension')
    expect(extension.url).toEqual('http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier')
    expect(extension.valueType).toEqual('Extension')
    expect(extension.valueTypeNarrowing).toBeUndefined()
    expect(extension.cardinality).toEqual('1..1')

    expect(extension.subdefs).toBeDefined()
    expect(extension.subdefs!.size).toEqual(1)

    const nct = extension.subdefs!.get('valueCode') as ExtensionDef
    expect(nct).toBeDefined()
    expect(nct!.key).toEqual('valueCode')
    expect(nct!.valueType).toEqual('code')

  })
})
