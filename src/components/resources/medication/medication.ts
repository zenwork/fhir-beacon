import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {map}                           from 'lit/directives/map.js'
import {DisplayMode, DomainResource}   from '../../../internal'
import {PrimitiveType}                 from '../../primitive'
import {MedicationData}                from './medication.data'


@customElement('fhir-medication')
export class Medication extends DomainResource<MedicationData> {

  constructor() {
    super('Medication')
    this.summary = true
  }

  protected renderDisplay(data: MedicationData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-identifier label="identifier" .data=${data.identifier} summary></fhir-identifier >
      <fhir-codeable-concept label="code" .data=${data.code} summary></fhir-codeable-concept >
      <fhir-primitive label="status" .type=${PrimitiveType.code} .value=${data.status} summary></fhir-primitive >
      <fhir-reference label="marketing authorization holder" .data=${data.marketingAuthorisationHolder} summary></fhir-reference >
      <fhir-codeable-concept label="dose form" .data=${data.doseForm}></fhir-codeable-concept >
      <fhir-quantity label="total volume" .data=${data.totalVolume} summary></fhir-quantity >
      ${((data.ingredient && data.ingredient.length > 0) || this.verbose) ? html`

        ${map(data.ingredient, (i, idx) => html`
          <fhir-wrapper
            label="ingredient ${(data.ingredient && data.ingredient.length > 1) ? '[' + (idx + 1) + ']' : ''}" ?hide=${this.mode
                                                                                                                       == DisplayMode.display_summary} variant="primary"
          >
            <fhir-codeable-reference label="item" .data=${i.item}></fhir-codeable-reference >
            <fhir-primitive .type=${PrimitiveType.none} label="is Active" .value=${i.isActive}></fhir-primitive >
            <fhir-ratio label="ratio" .data=${i.strengthRatio}></fhir-ratio >
            <fhir-codeable-concept .data=${i.strengthCodeableConcept}></fhir-codeable-concept >
            <fhir-quantity .data=${i.strengthQuantity!}></fhir-quantity >
          </fhir-wrapper >
        `)}

      ` : nothing}
      ${(data.batch || this.verbose) ? html`
        <fhir-wrapper label="batch" variant="primary">
          <fhir-primitive label="lot number" .value=${data.batch?.lotNumber} .type=${PrimitiveType.fhir_string}></fhir-primitive >
          <fhir-primitive label="expiration date" .value=${data.batch?.expirationDate} .type=${PrimitiveType.datetime}></fhir-primitive >
        </fhir-wrapper >
      ` : nothing}
      <fhir-reference label="definition" .data=${data.definition}></fhir-reference >

    `
  }

  protected renderStructure(data: MedicationData): TemplateResult | TemplateResult[] {

    return html`
      <fhir-identifier label="identifier" .data=${data.identifier} summary></fhir-identifier >
      <fhir-codeable-concept label="code" .data=${data.code} summary></fhir-codeable-concept >
      <fhir-primitive label="status" .type=${PrimitiveType.code} .value=${data.status} summary></fhir-primitive >
      <fhir-reference label="marketing authorization holder" .data=${data.marketingAuthorisationHolder} summary></fhir-reference >
      <fhir-codeable-concept label="dose form" .data=${data.doseForm}></fhir-codeable-concept >
      <fhir-quantity label="total volume" .data=${data.totalVolume} summary></fhir-quantity >
      ${((data.ingredient && data.ingredient.length > 0) || this.verbose) ? html`
        <fhir-structure-wrapper label="ingredients">
          ${map(data.ingredient, (i, idx) => html`
            <fhir-structure-wrapper label="ingredient [${idx}]">
              <fhir-codeable-reference label="item" .data=${i.item}></fhir-codeable-reference >
              <fhir-primitive label="is Active" .type=${PrimitiveType.none} .value=${i.isActive}></fhir-primitive >
              <fhir-ratio label="ratio" .data=${i.strengthRatio} .mode=${DisplayMode.display}></fhir-ratio >
              <fhir-codeable-concept .data=${i.strengthCodeableConcept}></fhir-codeable-concept >
              <fhir-quantity .data=${i.strengthQuantity!}></fhir-quantity >
            </fhir-structure-wrapper >
          `)}
        </fhir-structure-wrapper >
      ` : nothing}
      ${(data.batch || this.verbose) ? html`
        <fhir-structure-wrapper label="batch">
          <fhir-primitive label="lot number" .value=${data.batch?.lotNumber} .type=${PrimitiveType.fhir_string}></fhir-primitive >
          <fhir-primitive label="expiration date" .value=${data.batch?.expirationDate} .type=${PrimitiveType.datetime}></fhir-primitive >
        </fhir-structure-wrapper >
      ` : nothing}
      <fhir-reference label="definition" .data=${data.definition}></fhir-reference >
    `
  }
}
