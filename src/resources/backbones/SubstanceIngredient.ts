import {html, TemplateResult}                                             from 'lit'
import {customElement}                                                    from 'lit/decorators.js'
import {BaseElement, BaseElementMode}                                     from '../../BaseElement'
import {renderError}                                                      from '../../util/Errors'
import {SubstanceIngredientConceptData, SubstanceIngredientReferenceData} from '../structures/backbone'
import {isSubstanceIngredientConcept, isSubstanceIngredientReference}     from '../structures/type-guards'

import '../../data/complex/Ratio'

@customElement('fhir-substance-ingredient')
export class SubstanceIngredient extends BaseElement<SubstanceIngredientConceptData | SubstanceIngredientReferenceData> {
  constructor() {
    super('Ingredient')
  }

  protected renderDisplay(data: SubstanceIngredientConceptData | SubstanceIngredientReferenceData): TemplateResult | TemplateResult[] {

    let substance: TemplateResult = renderError(this.showerror, this.verbose, 'ingredient', 'substance[x] choice not found')

    if (isSubstanceIngredientConcept(data)) {
      substance = html`
        <fhir-codeable-concept
            label="substance"
            .data=${data.substanceCodeableConcept}
            .mode=${BaseElementMode.display}
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
            ?open=${this.open}
        ></fhir-codeable-concept>
      `
    }

    if (isSubstanceIngredientReference(data)) {
      substance = html`
        <fhir-reference
            label="substance"
            .data=${data.substanceReference}
            .mode=${BaseElementMode.display}
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
            ?open=${this.open}
        ></fhir-reference>
      `
    }

    return html`
      ${substance}
      <fhir-ratio
          label="quantity"
          .data=${data.quantity}
          .mode=${BaseElementMode.display}
          ?showerror=${this.showerror}
          ?verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-ratio>


    `
  }

  protected renderStructure(data: SubstanceIngredientConceptData | SubstanceIngredientReferenceData): TemplateResult | TemplateResult[] {

    let substance: TemplateResult = renderError(this.showerror, this.verbose, 'ingredient', 'substance[x] choice not found')

    if (isSubstanceIngredientConcept(data)) {
      substance = html`
        <fhir-codeable-concept
            label="substance"
            .data=${data.substanceCodeableConcept}
            .mode=${BaseElementMode.structure}
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
            ?open=${this.open}
        ></fhir-codeable-concept>
      `
    }

    if (isSubstanceIngredientReference(data)) {
      substance = html`
        <fhir-reference
            label="substance"
            .data=${data.substanceReference}
            .mode=${BaseElementMode.structure}
            ?showerror=${this.showerror}
            ?verbose=${this.verbose}
            ?open=${this.open}
        ></fhir-reference>
      `
    }

    return html`
      <fhir-ratio
          label="quantity"
          .data=${data.quantity}
          .mode=${BaseElementMode.structure}
          ?showerror=${this.showerror}
          ?verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-ratio>
      ${substance}

    `
  }
}
