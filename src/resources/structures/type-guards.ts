import {SubstanceIngredientConceptData, SubstanceIngredientReferenceData} from './backbone'

export function isSubstanceIngredientConcept(ingredient: SubstanceIngredientConceptData | SubstanceIngredientReferenceData): ingredient is SubstanceIngredientConceptData {
  return (ingredient as SubstanceIngredientConceptData).substanceCodeableConcept !== undefined
}

export function isSubstanceIngredientReference(ingredient: SubstanceIngredientConceptData | SubstanceIngredientReferenceData): ingredient is SubstanceIngredientReferenceData {
  return (ingredient as SubstanceIngredientReferenceData).substanceReference !== undefined
}
