// TODO: this needs to be split into three allowed versions
import {CodeableConceptData}              from '../../complex/codeable-concept/codeable-concept.data'
import {QuantityData}                     from '../../complex/quantity/quantity.data'
import {BackboneElementData}              from '../backbone.data'
import {CodeableReferenceData, RatioData} from '../index'

// TODO: better solution needed -> choice of datatype models are a real pain to model. see: https://www.hl7.org/fhir/formats.html#choice

export type MedicationIngredientData = BackboneElementData & {
  item: CodeableReferenceData
  isActive?: boolean
  strengthRatio?: RatioData
  strengthCodeableConcept?: CodeableConceptData
  strengthQuantity?: QuantityData
}
