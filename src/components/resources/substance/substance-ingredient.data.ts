// below is substance[x] the substance resource. see: https://www.hl7.org/fhir/substance-definitions.html#Substance.ingredient.substance_x_
import {BackboneElementData} from '../../../internal/resource/backbone.data'
import {CodeableConceptData} from '../../complex/codeable-concept/codeable-concept.data'

import {RatioData}     from '../../complex/ratio/ratio.data'
import {ReferenceData} from '../../special/reference/reference.data'

export type SubstanceIngredientData = BackboneElementData & {
  quantity?: RatioData
  substanceCodeableConcept: CodeableConceptData
}
export type SubstanceIngredientReferenceData = BackboneElementData & {
  quantity?: RatioData
  substanceReference: ReferenceData
}
