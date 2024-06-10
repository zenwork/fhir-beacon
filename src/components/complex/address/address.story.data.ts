export let data = {
  use: 'work',
  text: '1050 W Wishard Blvd\nRG,\n5th floor\nIndianapolis, IN 46240',
  line: ['1050 W Wishard Blvd', 'RG 5th floor'],
  city: 'Indianapolis',
  _state: {
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-codedString',
        valueCoding: 'IN'
      }
    ]
  },
  postalCode: '46240',
  state: 'IN',
  country: 'United States',
  _country: {
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-codedString',
        valueCoding: 'US'
      }
    ]
  }
}
