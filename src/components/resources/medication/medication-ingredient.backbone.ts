import {html, TemplateResult}     from 'lit'
import {customElement}            from 'lit/decorators.js'
import {Backbone}                 from '../../../internal/resource/Backbone'
import {DisplayConfig}            from '../../../types'
import {PrimitiveType}            from '../../primitive'
import {MedicationIngredientData} from './medication-ingredient.data'

const { none } = PrimitiveType

@customElement('fhir-medication-ingredient')
export class MedicationIngredientBackbone extends Backbone<MedicationIngredientData> {

  constructor() {
    super('Ingredient')
  }

  public renderDisplay(config: DisplayConfig, data: MedicationIngredientData): TemplateResult[] {
    return [
      html`
          <fhir-codeable-reference key="item" .data=${data.item}></fhir-codeable-reference>
          <fhir-primitive key="isActive" .type=${none} .value=${data.isActive}></fhir-primitive>
          <fhir-ratio key="strengthRatio" label="strength" .data=${data.strengthRatio}></fhir-ratio>
          <fhir-codeable-concept key="strengthCodeableConcept"
                                 label="strength"
                                 .data=${data.strengthCodeableConcept}
          ></fhir-codeable-concept>
          <fhir-quantity key="strengthQuantity"
                         label="strength"
                         .data=${data.strengthQuantity}
          ></fhir-quantity>
      `
    ]
  }


  public renderStructure(config: DisplayConfig, data: MedicationIngredientData): TemplateResult[] {
    return [
      html`
          <fhir-codeable-reference key="item" .data=${data.item}></fhir-codeable-reference>
          <fhir-primitive key="isActive" .type=${none} .value=${data.isActive}></fhir-primitive>
          <fhir-ratio key="strengthRatio" label="strength[x]" .data=${data.strengthRatio}></fhir-ratio>
          <fhir-codeable-concept key="strengthCodeableConcept"
                                 label="strength[x]"
                                 .data=${data.strengthCodeableConcept}
          ></fhir-codeable-concept>
          <fhir-quantity key="strengthQuantity" label="strength[x]" .data=${data.strengthQuantity}></fhir-quantity>
      `
    ]
  }
}
