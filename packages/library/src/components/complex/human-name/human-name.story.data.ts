export const data =
  {
    use: 'official',
    family: 'von Hochheim-Weilenfels',
    _family: {
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix',
          valueString: 'von'
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/humanname-own-name',
          valueString: 'Hochheim-Weilenfels'
        }
      ]
    },
    given: ['Regina', 'Johanna', 'Maria'],
    prefix: 'Dr. phil.',
    _prefix: {
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier',
          valueCode: 'AC'
        }
      ]
    },
    suffix: 'NCFSA'
  }

export const data2 = {
  use: 'official',
  family: 'van Hentenryck',
  given: ['Karen']
}

export const data3 = {
  'text': 'Mao Ze Dong'
}
