export const ValueSetDurationUnits = {
  resourceType: 'ValueSet',
  id: 'duration-units',
  meta: {
    lastUpdated: '2023-03-26T15:21:02.749+11:00',
    profile: ['http://hl7.org/fhir/StructureDefinition/shareablevalueset']
    },
  extension: [
    { url: 'http://hl7.org/fhir/StructureDefinition/structuredefinition-wg', valueCode: 'fhir' },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status',
          valueCode: 'normative'
        },
    { url: 'http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version', valueCode: '4.0.0' },
    { url: 'http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm', valueInteger: 5 }
    ],
  url: 'http://hl7.org/fhir/ValueSet/duration-units',
  identifier: [{ system: 'urn:ietf:rfc:3986', value: 'urn:oid:2.16.840.1.113883.4.642.3.61' }],
  version: '5.0.0',
  name: 'CommonUCUMCodesForDuration',
  title: 'Common UCUM Codes for Duration',
  status: 'active',
  experimental: false,
  date: '2023-03-26T15:21:02+11:00',
  publisher: 'FHIR Project team',
  contact: [{ telecom: [{ system: 'url', value: 'http://hl7.org/fhir' }] }],
  description: 'Unified Code for Units of Measure (UCUM). This value set includes all common UCUM codes used for Duration - that it is, all commonly used units which have the same canonical unit as \u0027a\u0027 (year)',
  jurisdiction: [
    { coding: [{ system: 'http://unstats.un.org/unsd/methods/m49/m49.htm', code: '001', display: 'World' }] }
    ],
  copyright: 'The UCUM codes, UCUM table (regardless of format), and UCUM Specification are copyright © 1999-2009, Regenstrief Institute, Inc. and the Unified Codes for Units of Measures (UCUM) Organization. All rights reserved.',
  compose: {
    include: [
            {
              system: 'http://unitsofmeasure.org',
              concept: [
                { code: 'ms', display: 'milliseconds' },
                { code: 's', display: 'seconds' },
                { code: 'min', display: 'minutes' },
                { code: 'h', display: 'hours' },
                { code: 'd', display: 'days' },
                { code: 'wk', display: 'weeks' },
                { code: 'mo', display: 'months' },
                { code: 'a', display: 'years' }
                ]
            }
        ]
    }
}
