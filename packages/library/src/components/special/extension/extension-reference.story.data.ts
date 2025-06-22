import {FhirElementData} from '../../../internal'
import {Code, FhirDate}  from '../../primitive'




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


export const listPrimitiveExtension: FhirElementData & { code: Code[] } = {
  code: ['au', 'nz'],
  _code: [
    null,
    {
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/display',
          valueString: 'New Zealand a.k.a Kiwiland'
        }
      ]
    }
  ]
}
