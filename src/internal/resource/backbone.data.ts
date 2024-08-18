import {Extension, FhirElementData} from '../base/data/fhir-data-element.data'

export type BackboneElementData = FhirElementData & {
  modifierExtension: Extension[]
}
