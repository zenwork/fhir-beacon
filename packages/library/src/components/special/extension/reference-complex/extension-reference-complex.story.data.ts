import {AddressData}     from '../../../complex'
import {hapiFhirPatient} from '../../../resources/patient/patient.story.data'




export const patient = {
  ...hapiFhirPatient,
  extension: [
    {
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
  ]
}


export const address: AddressData = {
  extension: [
    {
      url: 'https://example.org/fhir/StructureDefinition/owner',
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
  ],
  use: 'work',
  text: '1050 W Wishard Blvd\nRG,\n5th floor\nIndianapolis, IN 46240',
  line: ['1050 W Wishard Blvd', 'RG 5th floor'],
  city: 'Indianapolis',
  postalCode: '46240',
  state: 'IN',
  country: 'United States'
}
