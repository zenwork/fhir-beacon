import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {map}                           from 'lit/directives/map.js'
import {DomainResource}                from '../../../internal/resource/domain-resource'
import {PrimitiveType}                 from '../../primitive/type-converters/type-converters'
import {SubstanceData}                 from './substance.data'

@customElement('fhir-substance')
export class Substance extends DomainResource<SubstanceData> {

  constructor() {
    super('Substance')
  }

  protected renderDisplay(data: SubstanceData): TemplateResult {

    return html`
      <fhir-primitive label="description" .value=${data.description} .context="id:${data.id}" summary></fhir-primitive >
      <fhir-identifier .label="identifier" .data=${data.identifier} summary></fhir-identifier >
      <fhir-primitive label="instance or kind" value=${data.instance ? 'instance' : 'kind'} summary></fhir-primitive >
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code} summary></fhir-primitive >
      ${map(data.category, (c, idx) => {
        return html`
          <fhir-codeable-concept
              label="category ${(data.category && data.category.length > 1) ? '[' + (idx + 1) + ']' : ''}"
              .data=${c}
              summary
          ></fhir-codeable-concept >
        `
      })}
      <fhir-codeable-reference label="code" .data=${data.code} summary></fhir-codeable-reference >
      <fhir-primitive label="expiry" value=${data.expiry} summary></fhir-primitive >
      <fhir-quantity label="quantity" .data=${data.quantity} summary></fhir-quantity >
      ${map(data.ingredient,
          (ing, idx) => html`
            <fhir-wrapper label="ingredient ${(data.ingredient && data.ingredient.length > 1) ? '[' + (idx + 1) + ']' : ''}" variant="primary">
              <fhir-substance-ingredient .data=${ing} summary></fhir-substance-ingredient >
            </fhir-wrapper >
          `)}

    `
  }


  protected renderStructure(data: SubstanceData): TemplateResult {
    return html`
      <fhir-identifier .label="identifier" .data=${data.identifier} summary></fhir-identifier >
      <fhir-primitive label="instance" value=${data.instance} summary></fhir-primitive >
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code} summary></fhir-primitive >
      ${(data.category || this.verbose) ? html`
        <fhir-structure-wrapper label="categories" ?hide=${data.category?.length > 1}>
          ${data.category ? map(data.category, (c) => {
            return html`
              <fhir-codeable-concept label="category" .data=${c} summary></fhir-codeable-concept >
            `
          }) : html`
            <fhir-empty-list ></fhir-empty-list >`}
        </fhir-structure-wrapper >
      ` : nothing}
      <fhir-codeable-reference label="code" .data=${data.code} summary></fhir-codeable-reference >
      <fhir-primitive label="description" .value=${data.description} summary></fhir-primitive >
      <fhir-primitive label="expiry" value=${data.expiry} summary></fhir-primitive >
      <fhir-quantity label="quantity" .data=${data.quantity} summary></fhir-quantity >
      ${(data.ingredient || this.verbose) ? html`
        <fhir-structure-wrapper label="ingredients" ?open=${this.open} summary>
        ${data.ingredient ? map(data.ingredient, (ing) => html`
          <fhir-substance-ingredient label="ingredient" .data=${ing} summary></fhir-substance-ingredient >
        `) : html`
          <fhir-empty-list ></fhir-empty-list >`}
      </fhir-structure-wrapper>
      ` : nothing}
    `
  }

}
