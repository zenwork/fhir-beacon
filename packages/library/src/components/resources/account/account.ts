import {html, TemplateResult}      from 'lit'
import {customElement}             from 'lit/decorators.js'
import {Decorated, DomainResource} from '../../../internal'
import {strap, wrap}               from '../../../shell'
import {DisplayConfig}             from '../../../types'
import {PrimitiveType}             from '../../primitive'
import {AccountData}               from './account.data'

@customElement('fhir-account')
export class Account extends DomainResource<AccountData> {

  public renderDisplay(config: DisplayConfig, data: Decorated<AccountData>): TemplateResult[] {
    return [
      html`
          ${wrap({ collection: data.identifier, generator: 'fhir-identifier', config })}
          <fhir-primitive key="status" .value=${data.status} summary></fhir-primitive>
          <fhir-codeable-concept key="billingStatus" .data=${data.billingStatus} summary></fhir-codeable-concept>
          <fhir-codeable-concept key="type" .data=${data.type} summary></fhir-codeable-concept>
          <fhir-primitive key="name" .value=${data.name} .type=${PrimitiveType.fhir_string} summary></fhir-primitive>
          ${wrap({ key: 'subject', collection: data.subject, generator: 'fhir-reference', config })}
          <fhir-period key="servicePeriod" .data=${data.servicePeriod}></fhir-period>
          ${wrap({
                     key: 'coverage',
                     collection: data.coverage,
                     generator: (d, l, k) => html`
                         <fhir-account-coverage key=${k}
                                                label=${l}
                                                .data=${d}
                         ></fhir-account-coverage> `,
                     config
                 })}
          <fhir-reference key="owner" .data=${data.owner}></fhir-reference>
          <fhir-primitive key="description"
                          .value=${data.description}
                          .type=${PrimitiveType.markdown}
                          summary
          ></fhir-primitive>
          ${wrap({
                     key: 'guarantor',
                     collection: data.guarantor,
                     generator: (d, l, k) => html`
                         <fhir-account-guarantor key=${k} label=${l} .data=${d}></fhir-account-guarantor> `,
                     config
                 })}
          ${wrap({
                     key: 'diagnosis',
                     collection: data.diagnosis,
                     generator: (d, l, k) => html`
                         <fhir-account-diagnosis key=${k} label=${l} .data=${d}></fhir-account-diagnosis> `,
                     config
                 })}
          <fhir-account-procedure key="procedure" .data=${data.procedure}></fhir-account-procedure>
          ${wrap({
                     key: 'relatedAccount',
                     collection: data.relatedAccount,
                     generator: (d, l, k) => html`
                         <fhir-account-related-account key=${k} label=${l} .data=${d}></fhir-account-related-account> `,
                     config
                 })}
          <fhir-codeable-concept key="currency" .data=${data.currency}></fhir-codeable-concept>
          ${wrap({
                     key: 'balance',
                     collection: data.balance,
                     generator: (d, l, k) => html`
                         <fhir-account-balance key=${k} label=${l} .data=${d}></fhir-account-balance> `,
                     config
                 })}


      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<AccountData>): TemplateResult[] {
    return [
      html`
          ${strap({ collection: data.identifier, generator: 'fhir-identifier', config })}
          <fhir-primitive key="status" .value=${data.status} summary></fhir-primitive>
          <fhir-codeable-concept key="billingStatus" .data=${data.billingStatus} summary></fhir-codeable-concept>
          <fhir-codeable-concept key="type" .data=${data.type} summary></fhir-codeable-concept>
          <fhir-primitive key="name" .value=${data.name} .type=${PrimitiveType.fhir_string} summary></fhir-primitive>
          ${strap({ key: 'subject', collection: data.subject, generator: 'fhir-reference', config })}
          <fhir-period key="servicePeriod" .data=${data.servicePeriod}></fhir-period>
          ${strap({
                      key: 'coverage',
                      collection: data.coverage,
                      generator: (d, l, k) => html`
                          <fhir-account-coverage key=${k}
                                                 label=${l}
                                                 .data=${d}
                          ></fhir-account-coverage> `,
                      config
                  })}
          <fhir-reference key="owner" .data=${data.owner}></fhir-reference>
          <fhir-primitive key="description"
                          .value=${data.description}
                          .type=${PrimitiveType.markdown}
                          summary
          ></fhir-primitive>
          ${strap({
                      key: 'guarantor',
                      collection: data.guarantor,
                      generator: (d, l, k) => html`
                          <fhir-account-guarantor key=${k} label=${l} .data=${d}></fhir-account-guarantor> `,
                      config
                  })}
          ${strap({
                      key: 'diagnosis',
                      collection: data.diagnosis,
                      generator: (d, l, k) => html`
                          <fhir-account-diagnosis key=${k} label=${l} .data=${d}></fhir-account-diagnosis> `,
                      config
                  })}
          <fhir-account-procedure key="procedure" .data=${data.procedure}></fhir-account-procedure>
          ${strap({
                      key: 'relatedAccount',
                      collection: data.relatedAccount,
                      generator: (d, l, k) => html`
                          <fhir-account-related-account key=${k}
                                                        label=${l}
                                                        .data=${d}
                          ></fhir-account-related-account> `,
                      config
                  })}
          <fhir-codeable-concept key="currency" .data=${data.currency}></fhir-codeable-concept>
          ${strap({
                      key: 'balance',
                      collection: data.balance,
                      generator: (d, l, k) => html`
                          <fhir-account-balance key=${k} label=${l} .data=${d}></fhir-account-balance> `,
                      config
                  })}

      `
    ]
  }
}
