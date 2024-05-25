import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {map}                  from 'lit/directives/map.js'
import {PrimitiveType}        from '../data/primitive/converters'
import {DomainResource}       from './DomainResource'
import {SubstanceData}        from './structures'
import '../data/'
import '../util/StructureWrapper'
import '../util/Wrapper'
import '../data/complex/CodeableConcept'
import '../data/complex/CodeableReference'
import '../resources/backbones/SubstanceIngredient'

@customElement('fhir-substance')
export class Substance extends DomainResource<SubstanceData> {

  constructor() {super('Substance')}

  protected renderDisplay(data: SubstanceData): TemplateResult {

    return html`
      <fhir-primitive ></fhir-primitive >
      <fhir-primitive label="description" .value=${data.description} .context="id:${data.id}"></fhir-primitive >
      <fhir-identifier .label="identifier" .data=${data.identifier}></fhir-identifier >
      <fhir-primitive label="instance" value=${data.instance}></fhir-primitive >
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code}></fhir-primitive >
      ${map(data.category, (c, idx) => {
        return html`
          <fhir-wrapper label="category [${idx}]" ?open="${this.open}">
            <fhir-codeable-concept label="category" .data=${c}></fhir-codeable-concept >
          </fhir-wrapper >
        `
      })}
      <fhir-codeable-reference label="code" .data=${data.code}></fhir-codeable-reference >
      <fhir-primitive label="expiry" value=${data.expiry}></fhir-primitive >
      <fhir-quantity label="quantity" .data=${data.quantity}></fhir-quantity >
      ${map(data.ingredient,
          (ing, idx) => html`
        <fhir-wrapper label="ingredient [${idx}]" ?open="${this.open}">
          <fhir-substance-ingredient label="ingredient" .data=${ing}></fhir-substance-ingredient >
        </fhir-wrapper >
      `)}

    `
  }


  protected renderStructure(data: SubstanceData): TemplateResult {
    let contained = super.renderStructure(data)
    return html`
      <fhir-primitive label="id" value=${data.id}></fhir-primitive >
      ${contained}
      <fhir-identifier .label="identifier" .data=${data.identifier}></fhir-identifier >
      <fhir-primitive label="instance" value=${data.instance}></fhir-primitive >
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code}></fhir-primitive >
      <fhir-structure-wrapper label="categories">
        ${map(data.category, (c) => {
          return html`
            <fhir-codeable-concept label="category" .data=${c}></fhir-codeable-concept >
          `
        })}
      </fhir-structure-wrapper>
      <fhir-codeable-reference label="code" .data=${data.code}></fhir-codeable-reference >
      <fhir-primitive label="description" .value=${data.description}></fhir-primitive >
      <fhir-primitive label="expiry" value=${data.expiry}></fhir-primitive >
      <fhir-quantity label="quantity" .data=${data.quantity}></fhir-quantity >
      <fhir-structure-wrapper label="ingredients" ?open=${this.open}>
        ${map(data.ingredient, (ing) => html`
          <fhir-substance-ingredient label="ingredient" .data=${ing}></fhir-substance-ingredient >
        `)}
      </fhir-structure-wrapper>
    `
  }

}
