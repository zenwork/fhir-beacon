import {FhirExtensionData}   from '../../../../internal'
import {CodeableConceptData} from '../../../complex'




export const data: FhirExtensionData<CodeableConceptData> = {
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
