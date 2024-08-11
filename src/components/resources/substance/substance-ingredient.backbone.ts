import {html, TemplateResult}                                         from 'lit'
import {customElement}                                                from 'lit/decorators.js'
import {BaseElement}                                                  from '../../../internal/base'
import {renderError}                                                  from '../../../shell/layout/renderError'
import {SubstanceIngredientData, SubstanceIngredientReferenceData}    from './substance-ingredient.data'
import {isSubstanceIngredientConcept, isSubstanceIngredientReference} from './substance-ingredient.type-guard'


@customElement('fhir-substance-ingredient')
export class SubstanceIngredientBackbone extends BaseElement<SubstanceIngredientData | SubstanceIngredientReferenceData> {
  constructor() {
    super('Ingredient')
  }

  protected renderDisplay(data: SubstanceIngredientData | SubstanceIngredientReferenceData): TemplateResult | TemplateResult[] {

    let substance: TemplateResult = renderError(this.getDisplayConfig().showerror,
      this.getDisplayConfig().verbose,
      'ingredient',
      'substance[x] choice not found')

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

    return html`
      <fhir-wrapper .label=${this.label}>
        ${substance}
        <fhir-ratio label="quantity" .data=${data.quantity}></fhir-ratio >
      </fhir-wrapper >
    `
  }

  protected renderStructure(data: SubstanceIngredientData | SubstanceIngredientReferenceData): TemplateResult | TemplateResult[] {

    let substance: TemplateResult = renderError(this.getDisplayConfig().showerror, this.getDisplayConfig().verbose, 'ingredient', 'substance[x] choice not'
                                                                                                                                  + ' found')

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
