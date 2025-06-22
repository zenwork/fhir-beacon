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
