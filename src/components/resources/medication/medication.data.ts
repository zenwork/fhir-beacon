import {BackboneElementData}      from '../../../internal'
import {DomainResourceData}       from '../../../internal/resource/domain-resource.data'
import {CodeableConceptData}      from '../../complex/codeable-concept/codeable-concept.data'
import {IdentifierData}           from '../../complex/identifier/identifier.data'
import {QuantityData}             from '../../complex/quantity/quantity.data'
import {Code, DateTime}           from '../../primitive/primitive.data'
import {ReferenceData}            from '../../special/reference/reference.data'
import {MedicationIngredientData} from './medication-ingredient.data'

export type MedicationBatchData = BackboneElementData & {
  lotNumber?: string
  expirationDate?: DateTime
}
export type MedicationData = DomainResourceData & {
  identifier: IdentifierData[]
  code?: CodeableConceptData
  status?: Code
  marketingAuthorizationHolder?: ReferenceData
  doseForm?: CodeableConceptData
  totalVolume?: QuantityData
  ingredient?: MedicationIngredientData[]
  batch?: MedicationBatchData
  definition?: ReferenceData
}
