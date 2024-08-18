import {html, TemplateResult}     from 'lit'
import {customElement}            from 'lit/decorators.js'
import {Backbone}                 from '../../../internal/resource/backbone'
import {PrimitiveType}            from '../../primitive'
import {MedicationIngredientData} from './medication-ingredient.data'

@customElement('fhir-medication-ingredient')
export class MedicationIngredientBackbone extends Backbone<MedicationIngredientData> {

  constructor() {
    super('Ingredient')
  }

  protected renderDisplay(data: MedicationIngredientData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-codeable-reference key="${this.key}/item" .data=${data.item}></fhir-codeable-reference >
        <fhir-primitive key="${this.key}/isActive" .type=${PrimitiveType.none} .value=${data.isActive}></fhir-primitive >
        <fhir-ratio key="${this.key}/strengthRatio" label="strength" .data=${data.strengthRatio}></fhir-ratio >
        <fhir-codeable-concept key="${this.key}/strengthCodeableConcept" label="strength" .data=${data.strengthCodeableConcept}></fhir-codeable-concept >
        <fhir-quantity key="${this.key}/strengthQuantity" label="strength" .data=${data.strengthQuantity}></fhir-quantity >
    `
  }


  protected renderStructure(data: MedicationIngredientData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-codeable-reference key="item" .data=${data.item}></fhir-codeable-reference >
        <fhir-primitive key="isActive" .type=${PrimitiveType.none} .value=${data.isActive}></fhir-primitive >
        <fhir-ratio key="strengthRatio" label="strength[x]" .data=${data.strengthRatio}></fhir-ratio >
        <fhir-codeable-concept key="strengthCodeableConcept" label="strength[x]" .data=${data.strengthCodeableConcept}></fhir-codeable-concept >
        <fhir-quantity key="strengthQuantity" label="strength[x]" .data=${data.strengthQuantity}></fhir-quantity >
    `
  }
}
