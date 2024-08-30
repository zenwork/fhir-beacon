import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {Decorated, DomainResource}     from '../../../internal'
import {strap, wrapBB}                 from '../../../shell'
import {DisplayConfig}                 from '../../../types'
import {PrimitiveType}                 from '../../primitive'
import {MedicationData}                from './medication.data'

@customElement('fhir-medication')
export class Medication extends DomainResource<MedicationData> {
  constructor() {
    super('Medication')
  }

  public renderDisplay(config: DisplayConfig, data: Decorated<MedicationData>): TemplateResult[] {
    return [
      html`
          <fhir-identifier key="identifier" .data=${data.identifier} summary></fhir-identifier >
          <fhir-codeable-concept key="code" .data=${data.code} summary></fhir-codeable-concept >
          <fhir-primitive key="status" .type=${PrimitiveType.code} .value=${data.status} summary></fhir-primitive >
          <fhir-reference key="marketingAuthorizationHolder" .data=${data.marketingAuthorizationHolder} summary></fhir-reference >
          <fhir-codeable-concept key="doseForm" .data=${data.doseForm}></fhir-codeable-concept >
          <fhir-quantity key="totalVolume" .data=${data.totalVolume} summary></fhir-quantity >

          ${data.ingredient
            ? wrapBB('ingredient',
                     'ingredient',
                     data.ingredient,
                     config.verbose,
                     (data, label, key) => html`
                         <fhir-medication-ingredient key="${key}" .data=${data} label="${label}"></fhir-medication-ingredient >
                     `,
                     false
                  )
            : nothing}

          <fhir-medication-batch key="batch" .data=${data.batch}></fhir-medication-batch >
          <fhir-reference label="definition" .data=${data.definition}></fhir-reference >
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<MedicationData>): TemplateResult[] {
    return [
      html`
          <fhir-identifier key="identifier" .data=${data.identifier} summary></fhir-identifier >
          <fhir-codeable-concept key="code" .data=${data.code} summary></fhir-codeable-concept >
          <fhir-primitive key="status" .type=${PrimitiveType.code} .value=${data.status} summary></fhir-primitive >
          <fhir-reference key="marketingAuthorizationHolder" .data=${data.marketingAuthorizationHolder} summary></fhir-reference >
          <fhir-codeable-concept key="doseForm" .data=${data.doseForm}></fhir-codeable-concept >
          <fhir-quantity key="totalVolume" .data=${data.totalVolume} summary></fhir-quantity >

          ${strap('ingredient',
                  'ingredient',
                  data.ingredient!,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-medication-ingredient key="${key}" .data=${data} label="${label}"></fhir-medication-ingredient > `,
                  false, this.summaryMode())}

          <fhir-medication-batch key="batch" .data=${data.batch}></fhir-medication-batch >
          <fhir-reference key="definition" .data=${data.definition}></fhir-reference >
      `
    ]
  }
}
