import {html, TemplateResult}      from 'lit'
import {customElement}             from 'lit/decorators.js'
import {Backbone, Decorated}       from '../../../../internal'
import {DisplayConfig}             from '../../../../shell/types'
import {AccountRelatedAccountData} from '../account.data'



@customElement('fhir-account-related-account')
export class RelatedAccount extends Backbone<AccountRelatedAccountData> {
  constructor() {super('RelatedAccount')}

  public renderDisplay(_: DisplayConfig, data: Decorated<AccountRelatedAccountData>): TemplateResult[] {
    return this.renderAll(_, data)
  }

  public renderStructure(_: DisplayConfig, data: Decorated<AccountRelatedAccountData>): TemplateResult[] {
    return this.renderAll(_, data)
  }

  public renderAll(_: DisplayConfig, data: Decorated<AccountRelatedAccountData>): TemplateResult[] {
    return [
      html`
          <fhir-codeable-concept key="relationship" .data=${data.relationship}></fhir-codeable-concept>
          <fhir-reference key="account" .data=${data.account}></fhir-reference>
      `
    ]
  }

}
