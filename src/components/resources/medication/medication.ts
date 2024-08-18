import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {DomainResource}                from '../../../internal'
import {strap, wrap}                   from '../../../shell'
import {PrimitiveType}                 from '../../primitive'
import {MedicationData}                from './medication.data'

@customElement('fhir-medication')
export class Medication extends DomainResource<MedicationData> {
  constructor() {
    super('Medication')
  }

  protected renderDisplay(data: MedicationData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-identifier key="identifier" .data=${data.identifier} summary></fhir-identifier >
        <fhir-codeable-concept key="code" .data=${data.code} summary></fhir-codeable-concept >
        <fhir-primitive key="status" .type=${PrimitiveType.code} .value=${data.status} summary></fhir-primitive >
        <fhir-reference key="marketingAuthorisationHolder" .data=${data.marketingAuthorisationHolder} summary></fhir-reference >
        <fhir-codeable-concept key="doseForm" .data=${data.doseForm}></fhir-codeable-concept >
        <fhir-quantity key="totalVolume" .data=${data.totalVolume} summary></fhir-quantity >

        ${data.ingredient
          ? wrap('',
                 'ingredient',
                 data.ingredient,
                 this.verbose,
                 (data, label, key) => html`
                     <fhir-medication-ingredient key="${key}" .data=${data} label="${label}"></fhir-medication-ingredient >
                 `
                )
          : nothing}

        ${data.batch || this.verbose ? html`
                                         <fhir-wrapper label="batch" variant="primary">
                                             <fhir-primitive label="lot number" .value=${data.batch?.lotNumber} .type=${PrimitiveType.fhir_string}></fhir-primitive >
                                             <fhir-primitive label="expiration date" .value=${data.batch?.expirationDate} .type=${PrimitiveType.datetime}></fhir-primitive >
                                         </fhir-wrapper >
                                     `
                                     : nothing}
        <fhir-reference label="definition" .data=${data.definition}></fhir-reference >
    `
  }

  protected renderStructure(data: MedicationData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-identifier key="identifier" .data=${data.identifier} summary></fhir-identifier >
        <fhir-codeable-concept key="code" .data=${data.code} summary></fhir-codeable-concept >
        <fhir-primitive key="status" .type=${PrimitiveType.code} .value=${data.status} summary></fhir-primitive >
        <fhir-reference key="marketingAuthorizationHolder" .data=${data.marketingAuthorisationHolder} summary></fhir-reference >
        <fhir-codeable-concept key="doseForm" .data=${data.doseForm}></fhir-codeable-concept >
        <fhir-quantity key="totalVolume" .data=${data.totalVolume} summary></fhir-quantity >

        ${strap('ingredient',
                'ingredient',
                data.ingredient!,
                this.verbose,
                (data, label, key) => html`
                    <fhir-medication-ingredient key="${key}" .data=${data} label="${label}"></fhir-medication-ingredient > `)}
        ${data.batch || this.verbose
          ? html`
                    <fhir-structure-wrapper label="batch">
                        <fhir-primitive key="lotNumber" .value=${data.batch?.lotNumber} .type=${PrimitiveType.fhir_string}></fhir-primitive >
                        <fhir-primitive key="expirationDate" .value=${data.batch?.expirationDate} .type=${PrimitiveType.datetime}></fhir-primitive >
                    </fhir-structure-wrapper >
                `
          : nothing}
        <fhir-reference key="definition" .data=${data.definition}></fhir-reference >
    `
  }
}
