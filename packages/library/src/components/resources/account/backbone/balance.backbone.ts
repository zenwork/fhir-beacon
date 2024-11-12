import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {Backbone, Decorated}  from '../../../../internal'
import {DisplayConfig}        from '../../../../types'
import {PrimitiveType}        from '../../../primitive'
import {AccountBalanceData}   from '../account.data'

@customElement('fhir-account-balance')
export class Balance extends Backbone<AccountBalanceData> {
  constructor() {super('AccountBalance')}

  public renderDisplay(_: DisplayConfig, data: Decorated<AccountBalanceData>): TemplateResult[] {
    return this.renderAll(_, data)
  }

  public renderStructure(_: DisplayConfig, data: Decorated<AccountBalanceData>): TemplateResult[] {
    return this.renderAll(_, data)
  }

  public renderAll(_: DisplayConfig, data: Decorated<AccountBalanceData>): TemplateResult[] {
    return [
      html`
          <fhir-codeable-concept key="aggregate" .data=${data.aggregate}></fhir-codeable-concept>
          <fhir-codeable-concept key="term" .data=${data.term}></fhir-codeable-concept>
          <fhir-primitive key="estimate" .value=${data.estimate} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-money key="amount" .data=${data.money}></fhir-money>
      `
    ]
  }
}
