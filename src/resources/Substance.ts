import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {map}                  from 'lit/directives/map.js'
import {BaseElementMode}      from '../BaseElement'
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
      <fhir-primitive ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive
          label="description"
          .value=${data.description}
          .context="id:${data.id}"
          ?showError=${this.showError}
          .verbose=${this.verbose}
      ></fhir-primitive>
      <fhir-identifier
          .label="identifier"
          .data=${data.identifier}
          .mode=${BaseElementMode.display}
          ?showError=${this.showError}
          ?open=${this.open}
          ?verbose=${this.verbose}
      ></fhir-identifier>
      <fhir-primitive label="instance" value=${data.instance} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>

      ${map(data.category, (c, idx) => {
        return html`
          <fhir-wrapper label="category [${idx}]" ?open="${this.open}">
            <fhir-codeable-concept
                label="category"
                .data=${c}
                .mode=${BaseElementMode.display}
                ?showError=${this.showError}
                ?open=${this.open}
                ?verbose=${this.verbose}
            ></fhir-codeable-concept>
          </fhir-wrapper>
        `
      })}
      <fhir-codeable-reference
          label="code"
          .data=${data.code}
          .mode=${BaseElementMode.display}
          ?showError=${this.showError}
          ?verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-codeable-reference>
      <fhir-primitive label="expiry" value=${data.expiry} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-quantity
          label="quantity"
          .data=${data.quantity}
          .mode=${BaseElementMode.display}
          ?showError=${this.showError}
          ?verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-quantity>
      ${map(data.ingredient, (ing, idx) => html`
        <fhir-wrapper label="ingredient [${idx}]" ?open="${this.open}">
          <fhir-substance-ingredient
              label="ingredient"
              .data=${ing}
              .mode=${BaseElementMode.display}
              ?showError=${this.showError}
              ?verbose=${this.verbose}
              ?open=${this.open}
          ></fhir-substance-ingredient>
        </fhir-wrapper>
      `)}
    `
  }


  protected renderStructure(data: SubstanceData): TemplateResult {

    return html`
      <fhir-primitive label="id" value=${data.id} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-identifier
          .label="identifier"
          .data=${data.identifier}
          .mode=${BaseElementMode.structure}
          ?showError=${this.showError}
          ?open=${this.open}
          ?verbose=${this.verbose}
      ></fhir-identifier>
      <fhir-primitive label="instance" value=${data.instance} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-stucture-wrapper label="categories" ?open="${this.open}">
        ${map(data.category, (c) => {
          return html`
            <fhir-codeable-concept
                label="category"
                .data=${c}
                .mode=${BaseElementMode.structure}
                ?showError=${this.showError}
                ?open=${this.open}
                ?verbose=${this.verbose}
            ></fhir-codeable-concept>
          `
        })}
      </fhir-stucture-wrapper>
      <fhir-codeable-reference
          label="code"
          .data=${data.code}
          .mode=${BaseElementMode.structure}
          ?showError=${this.showError}
          ?verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-codeable-reference>
      <fhir-primitive label="description" .value=${data.description} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="expiry" value=${data.expiry} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-quantity
          label="quantity"
          .data=${data.quantity}
          ?showError=${this.showError}
          ?open=${this.open}
          .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
      ></fhir-quantity>
      <fhir-stucture-wrapper label="ingredients" ?open="${this.open}">
        ${map(data.ingredient, (ing) => html`
          <fhir-substance-ingredient
              label="ingredient"
              .data=${ing}
              .mode=${BaseElementMode.structure}
              .showError=${this.showError}
          .verbose=${this.verbose}
              .open=${this.open}
          ></fhir-substance-ingredient>
        `)}
      </fhir-stucture-wrapper>

    `
  }


  protected convertData(data: SubstanceData): SubstanceData {
    console.log(data)
    return super.convertData(data)
  }
}
