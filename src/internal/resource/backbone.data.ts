import {Extension, FhirElementData} from '../base'

export type BackboneElementData = FhirElementData & {
  modifierExtension: Extension[]
}
