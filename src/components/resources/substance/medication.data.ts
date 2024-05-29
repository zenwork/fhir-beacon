import {BaseElementData}          from '../../../internal/base/base-element.data'
import {DomainResourceData}       from '../../../internal/resource/domain-resource.data'
import {CodeableConceptData}      from '../../complex/codeable-concept/codeable-concept.data'
import {IdentifierData}           from '../../complex/identifier/identifier.data'
import {QuantityData}             from '../../complex/quantity/quantity.data'
import {Code, DateTime}           from '../../primitive/primitive.data'
import {ReferenceData}            from '../../special/reference/reference.data'
import {MedicationIngredientData} from '../medication/medication-ingredient.data'

type MedicationBatchData = BaseElementData & {
  lotNumber?: string
  expirationDate?: DateTime
}
export type MedicationData = DomainResourceData & {
  identifier: IdentifierData[]
  code?: CodeableConceptData
  status?: Code
  marketingAuthorisationHolder?: ReferenceData
  doseForm?: CodeableConceptData
  totalVolume?: QuantityData
  ingredient?: MedicationIngredientData[]
  batch?: MedicationBatchData
  definition?: ReferenceData
}
