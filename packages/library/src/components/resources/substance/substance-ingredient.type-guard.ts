import {SubstanceIngredientData, SubstanceIngredientReferenceData} from './substance-ingredient.data'

export function isSubstanceIngredientConcept(ingredient: SubstanceIngredientData | SubstanceIngredientReferenceData): ingredient is SubstanceIngredientData {
  return (ingredient as SubstanceIngredientData).substanceCodeableConcept !== undefined
}

export function isSubstanceIngredientReference(ingredient: SubstanceIngredientData | SubstanceIngredientReferenceData): ingredient is SubstanceIngredientReferenceData {
  return (ingredient as SubstanceIngredientReferenceData).substanceReference !== undefined
}
