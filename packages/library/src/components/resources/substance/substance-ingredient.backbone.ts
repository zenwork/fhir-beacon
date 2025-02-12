import {html, TemplateResult}                                         from 'lit'
import {customElement}                                                from 'lit/decorators.js'
import {BaseElement}                                                  from '../../../internal'
import {DisplayConfig}                                                from '../../../shell/types'
import {SubstanceIngredientData, SubstanceIngredientReferenceData}    from './substance-ingredient.data'
import {isSubstanceIngredientConcept, isSubstanceIngredientReference} from './substance-ingredient.type-guard'



@customElement('fhir-substance-ingredient')
export class SubstanceIngredientBackbone extends BaseElement<SubstanceIngredientData | SubstanceIngredientReferenceData> {
  constructor() {
    super('Ingredient')
  }

  public renderDisplay(config: DisplayConfig,
                       data: SubstanceIngredientData | SubstanceIngredientReferenceData): TemplateResult[] {

    let substance: TemplateResult = html`
        <fhir-not-supported
                label="ingredient"
                description="substance[x] choice not found"
        ></fhir-not-supported >`

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

    return [
      html`
          <fhir-wrapper .label=${this.label} ?summaryonly=${this.getDisplayConfig().summaryonly}>
            ${substance}
            <fhir-ratio label="quantity" .data=${data.quantity}></fhir-ratio >
          </fhir-wrapper>
      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: SubstanceIngredientData | SubstanceIngredientReferenceData): TemplateResult[] {

    let substance: TemplateResult = html`
        <fhir-not-supported
                label="ingredient"
                description="substance[x] choice not found"
        ></fhir-not-supported >`

    if (isSubstanceIngredientConcept(data)) {
      substance = html`
          <fhir-codeable-concept label="substance" .data=${data.substanceCodeableConcept}></fhir-codeable-concept > `
    }

    if (isSubstanceIngredientReference(data)) {
      substance = html`
          <fhir-reference label="substance" .data=${data.substanceReference}></fhir-reference > `
    }

    return [
      html`
        ${substance}
        <fhir-ratio label="quantity" .data=${data.quantity}></fhir-ratio >
      `
    ]
  }
}
