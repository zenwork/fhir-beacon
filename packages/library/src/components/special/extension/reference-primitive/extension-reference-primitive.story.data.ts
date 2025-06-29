import {FhirElementData} from '../../../../internal'
import {FhirDate}        from '../../../primitive'




export const primitiveExtension: FhirElementData & { birthDate: FhirDate } = {
  birthDate: '1970-03-30',
  _birthDate: {
    id: '314159',
    extension: [
      {
        url: 'http://example.org/fhir/StructureDefinition/text',
        valueString: 'Easter 1970'
      }
    ]
  }
}


export const addressWithExtension = {
  use: 'work',
  text: '1050 W Wishard Blvd\nRG,\n5th floor\nIndianapolis, IN 46240',
  line: ['1050 W Wishard Blvd', 'RG 5th floor'],
  city: 'Indianapolis',
  state: 'Indiana',
  _state: {
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-codedString',
        valueCoding: { code: 'IN' }
      }
    ]
  },
  postalCode: '46240',
  country: 'United States',
  _country: {
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-codedString',
        valueCoding: { code: 'US' }
      }
    ]
  }
}
