import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {Decorated, DomainResource}     from '../../../internal'
import {strap, wrap}                   from '../../../shell'
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
          <fhir-identifier key="identifier" .data=${data.identifier} summary></fhir-identifier>
          <fhir-codeable-concept key="code" .data=${data.code} summary></fhir-codeable-concept>
          <fhir-primitive key="status" .type=${PrimitiveType.code} .value=${data.status} summary></fhir-primitive>
          <fhir-reference key="marketingAuthorizationHolder"
                          label="marketing authorization holder"
                          .data=${data.marketingAuthorizationHolder}
                          summary
          ></fhir-reference>
          <fhir-codeable-concept key="doseForm"
                                 label="dose form"
                                 .data=${data.doseForm}
          ></fhir-codeable-concept>
          <fhir-quantity key="totalVolume" label="total volume" .data=${data.totalVolume} summary></fhir-quantity>

          ${data.ingredient
            ? wrap({
                       key: 'ingredient',
                       pluralBase: 'ingredient',
                       collection: data.ingredient,
                       generator: (d, label, key) => html`
                           <fhir-medication-ingredient key="${key}"
                                                       .data=${d}
                                                       label=${label}
                           ></fhir-medication-ingredient>
                       `,
                       summary: false,
                       config
                   }
                  )
            : nothing}

          <fhir-medication-batch key="batch" .data=${data.batch}></fhir-medication-batch>
          <fhir-reference label="definition" .data=${data.definition}></fhir-reference>
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<MedicationData>): TemplateResult[] {
    return [
      html`
          <fhir-identifier key="identifier" .data=${data.identifier} summary></fhir-identifier>
          <fhir-codeable-concept key="code" .data=${data.code} summary></fhir-codeable-concept>
          <fhir-primitive key="status" .type=${PrimitiveType.code} .value=${data.status} summary></fhir-primitive>
          <fhir-reference key="marketingAuthorizationHolder"
                          .data=${data.marketingAuthorizationHolder}
                          summary
          ></fhir-reference>
          <fhir-codeable-concept key="doseForm" .data=${data.doseForm}></fhir-codeable-concept>
          <fhir-quantity key="totalVolume" .data=${data.totalVolume} summary></fhir-quantity>

          ${strap({
                      key: 'ingredient',
                      pluralBase: 'ingredient',
                      collection: data.ingredient!,
                      generator: (data, label, key) => html`
                          <fhir-medication-ingredient key="${key}"
                                                      .data=${data}
                                                      label="${label}"
                          ></fhir-medication-ingredient> `,
                      summary: false,
                      config: this.getDisplayConfig()
                  })}

          <fhir-medication-batch key="batch" .data=${data.batch}></fhir-medication-batch>
          <fhir-reference key="definition" .data=${data.definition}></fhir-reference>
      `
    ]
  }
}
