import {FhirExtensionData} from '../../../internal'



export const complexExtension: FhirExtensionData<never> = {
  url: 'http://example.org/fhir/StructureDefinition/patient-clinicalTrial',
  extension: [
    {
      url: 'NCT',
      valueString: 'NCT00000419'
    },
    {
      url: 'period',
      valuePeriod: {
        start: '2004-01-01',
        end: '2012-12-31'
      }
    },
    {
      url: 'reason',
      valueCodeableConcept: {
        text: 'healthy-volunteer'
      }
    }
  ]
}
