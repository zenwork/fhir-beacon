// below is substance[x] the substance resource. see: https://www.hl7.org/fhir/substance-definitions.html#Substance.ingredient.substance_x_
import {CodeableConceptData} from '../../complex/codeable-concept/codeable-concept.data'
import {ReferenceData}       from '../../special/reference/reference.data'
import {BackboneElementData} from '../backbone.data'
import {RatioData}           from '../index'

export type SubstanceIngredientData = BackboneElementData & {
  quantity?: RatioData
  substanceCodeableConcept: CodeableConceptData
}
export type SubstanceIngredientReferenceData = BackboneElementData & {
  quantity?: RatioData
  substanceReference: ReferenceData
}
