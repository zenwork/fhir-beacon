import {BaseData}                                    from '../../BaseData'
import {CodeableConceptData, QuantityData}           from '../../data/complex/strucutures/complex'
import {ReferenceData}                               from '../../special/structures'
import {CodeableReferenceData, Extension, RatioData} from './index'

export type BackboneElementData = BaseData & {
  modifierExtension: Extension[]
}

// TODO: better solution needed -> choice of datatype models are a real pain to model. see: https://www.hl7.org/fhir/formats.html#choice

// TODO: this needs to be split into three allowed versions
export type MedicationIngredientData = BackboneElementData & {
  item: CodeableReferenceData
  isActive?: boolean
  strengthRatio?: RatioData
  strengthCodeableConcept?: CodeableConceptData
  strengthQuantity?: QuantityData
}

// below is substance[x] the substance resource. see: https://www.hl7.org/fhir/substance-definitions.html#Substance.ingredient.substance_x_
export type SubstanceIngredientConceptData = BackboneElementData & {
  quantity?: RatioData
  substanceCodeableConcept: CodeableConceptData
}

export type SubstanceIngredientReferenceData = BackboneElementData & {
  quantity?: RatioData
  substanceReference: ReferenceData
}
