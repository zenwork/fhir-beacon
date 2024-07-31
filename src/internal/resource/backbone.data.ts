import {Extension, FhirDataElementData} from '../base/fhir-data-element.data'

export type BackboneElementData = FhirDataElementData & {
  modifierExtension: Extension[]
}
