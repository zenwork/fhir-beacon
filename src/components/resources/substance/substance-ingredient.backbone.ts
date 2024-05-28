import {html, TemplateResult}                                         from 'lit'
import {customElement}                                                from 'lit/decorators.js'
import {BaseElementConsumer}                                          from '../../../internal/base/base-element-consumer'
import {renderError}                                                  from '../../../shell/layout/errors'
import {SubstanceIngredientData, SubstanceIngredientReferenceData}    from './substance-ingredient.data'
import {isSubstanceIngredientConcept, isSubstanceIngredientReference} from './substance-ingredient.type-guard'

import '../../complex/ratio/ratio'

@customElement('fhir-substance-ingredient')
export class SubstanceIngredientBackbone extends BaseElementConsumer<SubstanceIngredientData | SubstanceIngredientReferenceData> {
  constructor() {
    super('Ingredient')
  }

  protected renderDisplay(data: SubstanceIngredientData | SubstanceIngredientReferenceData): TemplateResult | TemplateResult[] {

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

  protected renderStructure(data: SubstanceIngredientData | SubstanceIngredientReferenceData): TemplateResult | TemplateResult[] {

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
