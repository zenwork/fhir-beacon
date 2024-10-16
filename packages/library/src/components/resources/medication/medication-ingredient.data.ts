import {BackboneElementData}   from '../../../internal/resource/backbone.data'
import {CodeableConceptData}   from '../../complex/codeable-concept/codeable-concept.data'
import {CodeableReferenceData} from '../../complex/codeable-reference/codeable-reference.data'
import {QuantityData}          from '../../complex/quantity/quantity.data'
import {RatioData}             from '../../complex/ratio/ratio.data'

// TODO: better solution needed -> choice of datatype models are a real pain to model. see:
// https://www.hl7.org/fhir/formats.html#choice

export type MedicationIngredientData = BackboneElementData & {
  item: CodeableReferenceData
  isActive?: boolean
  strengthRatio?: RatioData
  strengthCodeableConcept?: CodeableConceptData
  strengthQuantity?: QuantityData
}
