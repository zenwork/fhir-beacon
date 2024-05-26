import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {map}                  from 'lit/directives/map.js'

import {BaseElementMode} from '../BaseElementMode'
import {PrimitiveType}   from '../data/primitive/converters'

import {DomainResource} from './DomainResource'
import {MedicationData} from './structures'
import '../util'
import '../data'
import '../special/Reference'


@customElement('fhir-medication')
export class Medication extends DomainResource<MedicationData> {

  constructor() {super('Medication')}


  protected renderDisplay(data: MedicationData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier>
      <fhir-codeable-concept label="code" .data=${data.code}></fhir-codeable-concept>
      <fhir-primitive label="status" .type=${PrimitiveType.code} .value=${data.status}></fhir-primitive>
      <fhir-reference label="marketing authorization holder" .data=${data.marketingAuthorisationHolder}></fhir-reference>
      <fhir-codeable-concept label="dose form" .data=${data.doseForm}></fhir-codeable-concept>
      <fhir-quantity label="total volume" .data=${data.totalVolume}></fhir-quantity>
      <fhir-wrapper label="ingredients" ?open="${this.open}">
        ${map(data.ingredient, (i, idx) => html`
          <fhir-wrapper label="ingredient [${idx}]">
            <fhir-codeable-reference label="item" .data=${i.item}></fhir-codeable-reference >
            <fhir-primitive .type=${PrimitiveType.none} label="is Active" .value=${i.isActive}></fhir-primitive >
            <fhir-ratio label="ratio" .data=${i.strengthRatio}></fhir-ratio >
            <fhir-codeable-concept .data=${i.strengthCodeableConcept}></fhir-codeable-concept >
            <fhir-quantity .data=${i.strengthQuantity!}></fhir-quantity >
          </fhir-wrapper >
        `)}
      </fhir-wrapper>
      <fhir-primitive label="batch details" value="n/a" context="not implemented yet"></fhir-primitive>
      <fhir-reference label="definition" .data=${data.definition}></fhir-reference>

    `
  }

  protected renderStructure(data: MedicationData): TemplateResult | TemplateResult[] {
    let contained = super.renderStructure(data)
    return html`
      <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier >
      ${contained}
      <fhir-codeable-concept label="code" .data=${data.code}></fhir-codeable-concept >
      <fhir-primitive label="status" .type=${PrimitiveType.code} .value=${data.status}></fhir-primitive >
      <fhir-reference label="marketing authorization holder" .data=${data.marketingAuthorisationHolder}></fhir-reference >
      <fhir-codeable-concept label="dose form" .data=${data.doseForm}></fhir-codeable-concept >
      <fhir-quantity label="total volume" .data=${data.totalVolume}></fhir-quantity >
      <fhir-structure-wrapper label="ingredients">
        ${map(data.ingredient, (i, idx) => html`
          <fhir-structure-wrapper label="ingredient [${idx}]">
            <fhir-codeable-reference label="item" .data=${i.item}></fhir-codeable-reference >
            <fhir-primitive label="is Active" .type=${PrimitiveType.none} .value=${i.isActive}></fhir-primitive >
            <fhir-ratio label="ratio" .data=${i.strengthRatio} .mode=${BaseElementMode.display}></fhir-ratio >
            <fhir-codeable-concept .data=${i.strengthCodeableConcept}></fhir-codeable-concept >
            <fhir-quantity .data=${i.strengthQuantity!}></fhir-quantity >
          </fhir-structure-wrapper >
        `)}
      </fhir-structure-wrapper >
      <fhir-structure-wrapper label="batch">
        <fhir-primitive label="batch details" value="not implemented yet" type=${PrimitiveType.forced_error}></fhir-primitive >
      </fhir-structure-wrapper >
      <fhir-reference label="definition" .data=${data.definition}></fhir-reference >


    `
  }
}
