import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {map}                  from 'lit/directives/map.js'
import {BaseElementMode}      from '../BaseElement'
import {PrimitiveType}        from '../data/primitive/converters'
import {DomainResource}       from './DomainResource'
import {MedicationData}       from './structures'
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
          <fhir-wrapper label="ingredient [${idx}]" ?open="${this.open}">
            <fhir-codeable-reference label="item"
                                     .data=${i.item}
                                     .mode=${BaseElementMode.display}
                                     .showError=${this.showError}
                                     .verbose=${this.verbose}
                                     .open=${this.open}
          <fhir-primitive
              .type=${PrimitiveType.none} label="is Active" .value=${i.isActive}

          ></fhir-primitive>
            <fhir-ratio
                label="ratio"
                .data=${i.strengthRatio}
                .mode=${BaseElementMode.display}
                .showError=${this.showError}
                .verbose=${this.verbose}
                .open=${this.open}
            ></fhir-ratio>
          <fhir-codeable-concept
              .data=${i.strengthCodeableConcept}

          ></fhir-codeable-concept>
          <fhir-quantity .data=${i.strengthQuantity!}></fhir-quantity>

          </fhir-wrapper>
        `)}
      </fhir-wrapper>
      <fhir-primitive label="batch details" value="n/a" context="not implemented yet"></fhir-primitive>
      <fhir-reference label="definition" .data=${data.definition}></fhir-reference>

    `
  }

  protected renderStructure(data: MedicationData): TemplateResult | TemplateResult[] {

    return html`
      <fhir-identifier
          label="identifier"
          .data=${data.identifier}
          .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-identifier>
      <fhir-codeable-concept
          label="code"
          .data=${data.code}
          .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-codeable-concept>
      <fhir-primitive label="status" .type=${PrimitiveType.code} .value=${data.status} .verbose=${this.verbose}></fhir-primitive>
      <fhir-reference
          label="marketing authorization holder"
          .data=${data.marketingAuthorisationHolder}
          .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
      ></fhir-reference>
      <fhir-codeable-concept
          label="dose form"
          .data=${data.doseForm}
          .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-codeable-concept>
      <fhir-quantity
          label="total volume"
          .data=${data.totalVolume}
          .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-quantity>
      <fhir-structure-wrapper label="ingredients" ?open=${this.open}>
        ${map(data.ingredient, (i, idx) => html`
          <fhir-structure-wrapper label="ingredient [${idx}]" ?open=${this.open}>
            <fhir-codeable-reference
                label="item"
                .data=${i.item}
                .mode=${BaseElementMode.structure}
                .showError=${this.showError}
                .verbose=${this.verbose}
                .open=${this.open}
            ></fhir-codeable-reference>
            <fhir-primitive
                .type=${PrimitiveType.none}
                label="is Active"
                .value=${i.isActive}
                .verbose=${this.verbose}
            ></fhir-primitive>
            <fhir-ratio
                label="ratio" .data=${i.strengthRatio} .mode=${BaseElementMode.display}
                .showError=${this.showError}
                .verbose=${this.verbose}
                .open=${this.open}
            ></fhir-ratio>
            <fhir-codeable-concept
                .data=${i.strengthCodeableConcept} .mode=${BaseElementMode.structure}
                .verbose=${this.verbose}
                ?open=${this.open}
            ></fhir-codeable-concept>
            <fhir-quantity .data=${i.strengthQuantity!} .mode=${BaseElementMode.structure} .verbose=${this.verbose} ?open=${this.open}></fhir-quantity>

          </fhir-structure-wrapper>
        `)}
      </fhir-structure-wrapper>
      <fhir-structure-wrapper label="batch" ?open=${this.open}>
        <fhir-primitive label="batch details" value="not implemented yet" type=${PrimitiveType.forced_error}></fhir-primitive>
      </fhir-structure-wrapper>
      <fhir-reference
          label="definition" .data=${data.definition} .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
          ?open=${this.open}
      ></fhir-reference>


    `
  }
}
