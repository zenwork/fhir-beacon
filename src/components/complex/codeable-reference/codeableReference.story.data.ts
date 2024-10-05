export const data = {
  concept: {
    coding: [
      {
        system: 'http://hl7.org/fhir/sid/icd-10',
        code: 'R51'
      }, {
        system: 'http://snomed.info/sct',
        code: '25064002',
        display: 'Headache',
        userSelected: 'true'
      }
    ],
    text: 'general headache'
  },
  reference: {
    reference: '/Observation/id1234',
    type: 'Observation',
    display: 'Patient reported Headache'
  }
}
