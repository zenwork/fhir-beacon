import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {map}                           from 'lit/directives/map.js'
import {PrimitiveType}                 from '../data/primitive/converters'
import {DomainResource}                from './DomainResource'
import {SubstanceData}                 from './structures'
import '../data/'
import '../util/'
import '../data/complex/CodeableConcept'
import '../data/complex/CodeableReference'
import '../resources/backbones/SubstanceIngredient'

@customElement('fhir-substance')
export class Substance extends DomainResource<SubstanceData> {

  constructor() {super('Substance')}

  protected renderDisplay(data: SubstanceData): TemplateResult {

    return html`
      <fhir-primitive label="description" .value=${data.description} .context="id:${data.id}"></fhir-primitive >
      <fhir-identifier .label="identifier" .data=${data.identifier}></fhir-identifier >
      <fhir-primitive label="instance or kind" value=${data.instance ? 'instance' : 'kind'}></fhir-primitive >
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code}></fhir-primitive >
      ${map(data.category, (c, idx) => {
        return html`
          <fhir-codeable-concept
              label="category ${(data.category && data.category.length > 1) ? '[' + (idx + 1) + ']' : ''}"
              .data=${c}
          ></fhir-codeable-concept >
        `
      })}
      <fhir-codeable-reference label="code" .data=${data.code}></fhir-codeable-reference >
      <fhir-primitive label="expiry" value=${data.expiry}></fhir-primitive >
      <fhir-quantity label="quantity" .data=${data.quantity}></fhir-quantity >
      ${map(data.ingredient,
          (ing, idx) => html`
            <fhir-wrapper label="ingredient ${(data.ingredient && data.ingredient.length > 1) ? '[' + (idx + 1) + ']' : ''}" variant="primary">
              <fhir-substance-ingredient .data=${ing}></fhir-substance-ingredient >
            </fhir-wrapper >
          `)}

    `
  }


  protected renderStructure(data: SubstanceData): TemplateResult {
    let contained = super.renderStructure(data)
    return html`
      ${contained}
      <fhir-identifier .label="identifier" .data=${data.identifier}></fhir-identifier >
      <fhir-primitive label="instance" value=${data.instance}></fhir-primitive >
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code}></fhir-primitive >
      ${(data.category || this.verbose) ? html`
        <fhir-structure-wrapper label="categories">
          ${data.category ? map(data.category, (c) => {
            return html`
              <fhir-codeable-concept label="category" .data=${c}></fhir-codeable-concept >
            `
          }) : html`
            <fhir-empty-set ></fhir-empty-set >`}
        </fhir-structure-wrapper >
      ` : nothing}
      <fhir-codeable-reference label="code" .data=${data.code}></fhir-codeable-reference >
      <fhir-primitive label="description" .value=${data.description}></fhir-primitive >
      <fhir-primitive label="expiry" value=${data.expiry}></fhir-primitive >
      <fhir-quantity label="quantity" .data=${data.quantity}></fhir-quantity >
      ${(data.ingredient || this.verbose) ? html`
      <fhir-structure-wrapper label="ingredients" ?open=${this.open}>
        ${data.ingredient ? map(data.ingredient, (ing) => html`
          <fhir-substance-ingredient label="ingredient" .data=${ing}></fhir-substance-ingredient >
        `) : html`
          <fhir-empty-set ></fhir-empty-set >`}
      </fhir-structure-wrapper>
      ` : nothing}
    `
  }

}
