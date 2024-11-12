import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {Backbone, Decorated}  from '../../../../internal'
import {DisplayConfig}        from '../../../../types'
import {PrimitiveType}        from '../../../primitive'
import {AccountGuarantorData} from '../account.data'

@customElement('fhir-account-guarantor')
export class Guarantor extends Backbone<AccountGuarantorData> {
  constructor() {super('AccountGuarantor')}

  public renderDisplay(_: DisplayConfig, data: Decorated<AccountGuarantorData>): TemplateResult[] {
    return this.renderAll(_, data)
  }

  public renderStructure(_: DisplayConfig, data: Decorated<AccountGuarantorData>): TemplateResult[] {
    return this.renderAll(_, data)
  }

  public renderAll(_: DisplayConfig, data: Decorated<AccountGuarantorData>): TemplateResult[] {
    return [
      html`
          <fhir-reference key="party" .data=${data.party}></fhir-reference>
          <fhir-primitive key="onHold" .value=${data.onHold} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-period key="period" .data=${data.period}></fhir-period>
      `
    ]
  }
}
