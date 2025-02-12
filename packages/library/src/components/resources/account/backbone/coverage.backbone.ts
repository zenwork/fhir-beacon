import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {Backbone, Decorated}  from '../../../../internal'
import {DisplayConfig}        from '../../../../shell/types'
import {PrimitiveType}        from '../../../primitive'
import {AccountCoverageData}  from '../account.data'



@customElement('fhir-account-coverage')
export class Coverage extends Backbone<AccountCoverageData> {
  constructor() {super('AccountCoverage')}

  public renderDisplay(_: DisplayConfig, data: Decorated<AccountCoverageData>): TemplateResult[] {
    return this.renderAll(_, data)
  }

  public renderStructure(_: DisplayConfig, data: Decorated<AccountCoverageData>): TemplateResult[] {
    return this.renderAll(_, data)
  }

  public renderAll(_: DisplayConfig, data: Decorated<AccountCoverageData>): TemplateResult[] {
    return [
      html`
          <fhir-reference key="coverage" .data=${data.coverage}></fhir-reference>
          <fhir-primitive key="priority" .value=${data.priority} .type=${PrimitiveType.positiveInt}></fhir-primitive>
      `
    ]
  }
}
