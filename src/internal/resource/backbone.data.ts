import {Extension, FhirElementData} from '../base/fhir-data-element.data'

export type BackboneElementData = FhirElementData & {
  modifierExtension: Extension[]
}
