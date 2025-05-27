import {FhirElementData, FhirExtensionData} from '../base'



export type BackboneElementData = FhirElementData & {
  modifierExtension: FhirExtensionData[]
}
