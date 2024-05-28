import {html, TemplateResult}                                             from 'lit'
import {customElement}                                                    from 'lit/decorators.js'
import {ConsumerBaseElement}                                              from '../../ConsumerBaseElement'
import {renderError}                                                      from '../../util/Errors'
import {SubstanceIngredientConceptData, SubstanceIngredientReferenceData} from '../structures/backbone'
import {isSubstanceIngredientConcept, isSubstanceIngredientReference}     from '../structures/type-guards'

import '../../data/complex/Ratio'

@customElement('fhir-substance-ingredient')
export class SubstanceIngredient extends ConsumerBaseElement<SubstanceIngredientConceptData | SubstanceIngredientReferenceData> {
  constructor() {
    super('Ingredient')
  }

  protected renderDisplay(data: SubstanceIngredientConceptData | SubstanceIngredientReferenceData): TemplateResult | TemplateResult[] {

    let substance: TemplateResult = renderError(this.displayConfig.showerror, this.displayConfig.verbose, 'ingredient', 'substance[x] choice not found')

    if (isSubstanceIngredientConcept(data)) {
      substance = html`
        <fhir-codeable-concept label="substance" .data=${data.substanceCodeableConcept}></fhir-codeable-concept >
      `
    }

    if (isSubstanceIngredientReference(data)) {
      substance = html`
        <fhir-reference label="substance" .data=${data.substanceReference}></fhir-reference >
      `
    }

    return html` ${substance}
    <fhir-ratio label="quantity" .data=${data.quantity}></fhir-ratio > `
  }

  protected renderStructure(data: SubstanceIngredientConceptData | SubstanceIngredientReferenceData): TemplateResult | TemplateResult[] {

    let substance: TemplateResult = renderError(this.displayConfig.showerror, this.displayConfig.verbose, 'ingredient', 'substance[x] choice not found')

    if (isSubstanceIngredientConcept(data)) {
      substance = html`
        <fhir-codeable-concept label="substance" .data=${data.substanceCodeableConcept}></fhir-codeable-concept > `
    }

    if (isSubstanceIngredientReference(data)) {
      substance = html`
        <fhir-reference label="substance" .data=${data.substanceReference}></fhir-reference > `
    }

    return html`
      ${substance}
      <fhir-ratio label="quantity" .data=${data.quantity}></fhir-ratio >
    `
  }
}
