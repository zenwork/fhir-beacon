import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'

import {Backbone, Decorated}  from '../../../../internal'
import {strap, wrap}          from '../../../../shell'
import {DisplayConfig}        from '../../../../types'
import {PrimitiveType}        from '../../../primitive'
import {AccountProcedureData} from '../account.data'

const { datetime, positiveInt } = PrimitiveType

@customElement('fhir-account-procedure')
export class Procedure extends Backbone<AccountProcedureData> {
  constructor() {super('AccountProcedure')}

  public renderDisplay(config: DisplayConfig, data: Decorated<AccountProcedureData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="sequence" .value=${data.sequence} .type=${positiveInt}></fhir-primitive>
          <fhir-codeable-concept key="code" .data=${data.code}></fhir-codeable-concept>
          <fhir-primitive key="dateOfService"
                          .value=${data.dateOfService}
                          .type=${datetime}
          ></fhir-primitive>
          ${wrap({ key: 'type', collection: data.type, generator: 'fhir-codeable-concept', config })}
          ${wrap({ key: 'packageCode', collection: data.packageCode, generator: 'fhir-codeable-concept', config })}
          ${wrap({ key: 'device', collection: data.device, generator: 'fhir-reference', config })}
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<AccountProcedureData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="sequence" .value=${data.sequence} .type=${positiveInt}></fhir-primitive>
          <fhir-codeable-concept key="code" .data=${data.code}></fhir-codeable-concept>
          <fhir-primitive key="dateOfService"
                          .value=${data.dateOfService}
                          .type=${datetime}
          ></fhir-primitive>
          ${strap({ key: 'type', collection: data.type, generator: 'fhir-codeable-concept', config })}
          ${strap({ key: 'packageCode', collection: data.packageCode, generator: 'fhir-codeable-concept', config })}
          ${strap({ key: 'device', collection: data.device, generator: 'fhir-reference', config })}
      `
    ]
  }
}
