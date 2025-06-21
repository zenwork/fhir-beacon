import {SignatureData}     from 'components'
import {FhirExtensionData} from '../../../internal'
import {Boolean, Uuid}     from '../../../PrimitiveTypes'
import {
  AnnotationData,
  AttachmentData,
  CodeableConceptData,
  CodingData,
  ContactPointData,
  HumanNameData,
  IdentifierData,
  MoneyData,
  PeriodData,
  QuantityData,
  RangeData,
  RatioData,
  SampledDataData,
  TimingData
}                          from '../../complex'
import {
  Base64Binary,
  Canonical,
  Code,
  DateTime,
  Decimal,
  FhirDate,
  FhirString,
  Id,
  Instant,
  Integer,
  Markdown,
  PositiveInt,
  Time,
  UnsignedInt,
  URI,
  Url
}                          from '../../primitive'
import {ReferenceData}     from '../reference'



export const stringExtension: FhirExtensionData<FhirString> = {
  url: 'treatment-description',
  valueString: 'This is a string value'
}

export const booleanExtension: FhirExtensionData<Boolean> = {
  url: 'https://example.org/fhir/StructureDefinition/appointment-confirmed',
  valueBoolean: 'true'
}

export const dateExtension: FhirExtensionData<FhirDate> = {
  url: 'https://example.org/fhir/StructureDefinition/first-visit',
  valueDate: '2025-05-28'
}

export const datetimeExtension: FhirExtensionData<DateTime> = {
  url: 'https://example.org/fhir/StructureDefinition/test-start',
  valueDateTime: '2025-05-28T14:30:00Z'
}

export const decimalExtension: FhirExtensionData<Decimal> = {
  url: 'https://example.org/fhir/StructureDefinition/price',
  valueDecimal: '123.45'
}

export const codeableConceptExtension: FhirExtensionData<CodeableConceptData> = {
  url: 'https://example.org/fhir/StructureDefinition/event-type',
  valueCodeableConcept: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/example',
        code: 'unscheduled-appointment',
        display: 'unscheduled appointment'
      }
    ],
    text: 'Unscheduled Appointment'
  }
}

export const uriExtension: FhirExtensionData<URI> = {
  url: 'https://example.org/fhir/StructureDefinition/information-source',
  valueUri: 'https://example.org/resource'
}

export const idExtension: FhirExtensionData<Id> = {
  url: 'https://example.org/fhir/StructureDefinition/passport-id',
  valueId: 'example-id-123'
}

export const positiveIntExtension: FhirExtensionData<PositiveInt> = {
  url: 'https://example.org/fhir/StructureDefinition/magic-number',
  valuePositiveInt: 42
}


export const annotationExtension: FhirExtensionData<AnnotationData> = {
  url: 'https://example.org/fhir/StructureDefinition/clinical-note',
  valueAnnotation: {
    authorString: 'Dr. Jane Smith',
    time: '2025-05-15T10:30:00Z',
    text: 'Patient presented with symptoms of seasonal allergies.'
  }
}

export const attachmentExtension: FhirExtensionData<AttachmentData> = {
  url: 'https://example.org/fhir/StructureDefinition/medical-scan',
  valueAttachment: {
    contentType: 'application/dicom',
    language: 'en',
    data: 'SGVsbG8gV29ybGQ=', // Base64 encoded
    url: 'https://example.org/fhir/Binary/1234',
    hash: 'EQVQoZ4Il8ZBtXlvQbPy4vVhQj0=',
    title: 'Chest X-Ray',
    creation: '2025-04-17T14:15:00Z'
  }
}

export const base64BinaryExtension: FhirExtensionData<Base64Binary> = {
  url: 'https://example.org/fhir/StructureDefinition/signature-image',
  valueBase64Binary: 'SGVsbG8gV29ybGQgQmFzZTY0IEVuY29kZWQ='
}

export const canonicalExtension: FhirExtensionData<Canonical> = {
  url: 'https://example.org/fhir/StructureDefinition/profile-reference',
  valueCanonical: 'http://hl7.org/fhir/StructureDefinition/Patient|4.0.1'
}

export const codeExtension: FhirExtensionData<Code> = {
  url: 'https://example.org/fhir/StructureDefinition/status-code',
  valueCode: 'active'
}

export const codingExtension: FhirExtensionData<CodingData> = {
  url: 'https://example.org/fhir/StructureDefinition/diagnosis-code',
  valueCoding: {
    system: 'http://snomed.info/sct',
    version: '2023-09',
    code: '73211009',
    display: 'Diabetes mellitus'
  }
}

export const contactPointExtension: FhirExtensionData<ContactPointData> = {
  url: 'https://example.org/fhir/StructureDefinition/emergency-contact',
  valueContactPoint: {
    system: 'phone',
    value: '+1-555-123-4567',
    use: 'mobile',
    rank: 1,
    period: {
      start: '2023-01-01',
      end: '2026-12-31'
    }
  }
}

export const humanNameExtension: FhirExtensionData<HumanNameData> = {
  url: 'https://example.org/fhir/StructureDefinition/preferred-name',
  valueHumanName: {
    use: 'official',
    family: 'Smith',
    given: ['John', 'Robert'],
    prefix: ['Mr.'],
    suffix: ['MD'],
    period: {
      start: '2010-01-01'
    }
  }
}

export const identifierExtension: FhirExtensionData<IdentifierData> = {
  url: 'https://example.org/fhir/StructureDefinition/insurance-number',
  valueIdentifier: {
    use: 'official',
    type: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
          code: 'MR',
          display: 'Medical Record Number'
        }
      ]
    },
    system: 'https://example.org/fhir/identifier/insurance',
    value: 'INS-12345-6789',
    period: {
      start: '2024-01-01',
      end: '2026-01-01'
    },
    assigner: {
      display: 'Example Health Insurance'
    }
  }
}

export const instantExtension: FhirExtensionData<Instant> = {
  url: 'https://example.org/fhir/StructureDefinition/recorded-time',
  valueInstant: '2025-05-28T14:30:00.123Z'
}

export const integerExtension: FhirExtensionData<Integer> = {
  url: 'https://example.org/fhir/StructureDefinition/count-value',
  valueInteger: 256
}

export const markdownExtension: FhirExtensionData<Markdown> = {
  url: 'https://example.org/fhir/StructureDefinition/formatted-notes',
  valueMarkdown: '# Patient Notes\n\n**Important**: Patient has *medication allergies*.\n\n- Penicillin\n- Sulfa drugs'
}

export const moneyExtension: FhirExtensionData<MoneyData> = {
  url: 'https://example.org/fhir/StructureDefinition/procedure-cost',
  valueMoney: {
    value: '299.99',
    currency: 'USD'
  }
}

export const periodExtension: FhirExtensionData<PeriodData> = {
  url: 'https://example.org/fhir/StructureDefinition/treatment-duration',
  valuePeriod: {
    start: '2025-01-15',
    end: '2025-02-15'
  }
}

export const quantityExtension: FhirExtensionData<QuantityData> = {
  url: 'https://example.org/fhir/StructureDefinition/weight',
  valueQuantity: {
    value: '75.5',
    unit: 'kg',
    system: 'http://unitsofmeasure.org',
    code: 'kg'
  }
}

export const rangeExtension: FhirExtensionData<RangeData> = {
  url: 'https://example.org/fhir/StructureDefinition/normal-range',
  valueRange: {
    low: {
      value: '60',
      unit: 'bpm',
      system: 'http://unitsofmeasure.org',
      code: '/min'
    },
    high: {
      value: '100',
      unit: 'bpm',
      system: 'http://unitsofmeasure.org',
      code: '/min'
    }
  }
}

export const ratioExtension: FhirExtensionData<RatioData> = {
  url: 'https://example.org/fhir/StructureDefinition/medication-dilution',
  valueRatio: {
    numerator: {
      value: '1',
      unit: 'mg',
      system: 'http://unitsofmeasure.org',
      code: 'mg'
    },
    denominator: {
      value: '10',
      unit: 'mL',
      system: 'http://unitsofmeasure.org',
      code: 'mL'
    }
  }
}

export const referenceExtension: FhirExtensionData<ReferenceData> = {
  url: 'https://example.org/fhir/StructureDefinition/related-practitioner',
  valueReference: {
    reference: 'Practitioner/12345',
    type: 'Practitioner',
    display: 'Dr. Smith'
  }
}

export const sampledDataExtension: FhirExtensionData<SampledDataData> = {
  url: 'https://example.org/fhir/StructureDefinition/ecg-data',
  valueSampledData: {
    origin: {
      value: '0',
      unit: 'mV',
      system: 'http://unitsofmeasure.org',
      code: 'mV'
    },
    intervalUnit: 'g/(kg.min)',
    factor: '1.0',
    lowerLimit: '-10.0',
    upperLimit: '10.0',
    dimensions: 1,
    data: '2 2 1.5 2 2 2 1.5 2 2 2.5 2.5 2.5 3 3 3.5 3.5 3 3 2.5 2 2 1.5 1 1 1.5 2 2'
  }
}

export const signatureExtension: FhirExtensionData<SignatureData> = {
  url: 'https://example.org/fhir/StructureDefinition/consent-signature',
  valueSignature: {
    type: [
      {
        system: 'urn:iso-astm:E1762-95:2013',
        code: '1.2.840.10065.1.12.1.1',
        display: 'Author\'s Signature'
      }
    ],
    when: '2025-05-28T13:45:00Z',
    who: {
      reference: 'Patient/123456',
      display: 'John Doe'
    },
    targetFormat: 'application/pdf',
    sigFormat: 'image/png',
    data: 'SGVsbG8gV29ybGQgU2lnbmF0dXJl' // Base64 encoded
  }
}

export const timeExtension: FhirExtensionData<Time> = {
  url: 'https://example.org/fhir/StructureDefinition/preferred-contact-time',
  valueTime: '14:30:00'
}

export const timingExtension: FhirExtensionData<TimingData> = {
  url: 'https://example.org/fhir/StructureDefinition/medication-schedule',
  valueTiming: {
    event: ['2025-05-28T08:00:00Z', '2025-05-28T20:00:00Z'],
    repeat: {
      frequency: 2,
      period: '1',
      periodUnit: 'd',
      boundsDuration: {
        value: '14',
        unit: 'days',
        system: 'http://unitsofmeasure.org',
        code: 'd'
      }
    },
    code: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v3-TimingEvent',
          code: 'BID',
          display: 'twice daily'
        }
      ]
    }
  }
}

export const unsignedIntExtension: FhirExtensionData<UnsignedInt> = {
  url: 'https://example.org/fhir/StructureDefinition/version-number',
  valueUnsignedInt: 3
}

export const urlExtension: FhirExtensionData<Url> = {
  url: 'https://example.org/fhir/StructureDefinition/external-resource',
  valueUrl: 'https://example.org/resources/patient-education/diabetes.pdf'
}

export const uuidExtension: FhirExtensionData<Uuid> = {
  url: 'https://example.org/fhir/StructureDefinition/system-identifier',
  valueUuid: 'urn:uuid:c757873d-ec9a-4326-a141-556f43239520'
}
