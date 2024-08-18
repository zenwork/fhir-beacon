import {FhirElementData}          from '../../../internal/base/fhir-data-element.data'
import {DomainResourceData}       from '../../../internal/resource/domain-resource.data'
import {CodeableConceptData}      from '../../complex/codeable-concept/codeable-concept.data'
import {IdentifierData}           from '../../complex/identifier/identifier.data'
import {QuantityData}             from '../../complex/quantity/quantity.data'
import {Code, DateTime}           from '../../primitive/primitive.data'
import {ReferenceData}            from '../../special/reference/reference.data'
import {MedicationIngredientData} from './medication-ingredient.data'

type MedicationBatchData = FhirElementData & {
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
