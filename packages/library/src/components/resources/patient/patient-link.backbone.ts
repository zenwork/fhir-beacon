import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {Backbone, Decorated}  from '../../../internal'
import {DisplayConfig}        from '../../../types'
import {PrimitiveType}        from '../../primitive'
import {PatientLinkData}      from './patient.data'

const { code } = PrimitiveType

@customElement('fhir-patient-link')
export class PatientLink extends Backbone<PatientLinkData> {
  constructor() {super('PatientLink')}


  public renderDisplay(_: DisplayConfig, data: Decorated<PatientLinkData>): TemplateResult[] {
    return this.generate(data)
  }

  public renderStructure(_: DisplayConfig,
                         data: Decorated<PatientLinkData>): TemplateResult[] {
    return this.generate(data)
  }

  private generate(data: Decorated<PatientLinkData>) {
    return [
      html`
          <fhir-reference key="other" label="other" .data=${data.other} required summary></fhir-reference>
          <fhir-primitive key="type" label="type" .value=${data.type} .type=${code} required summary></fhir-primitive>
      `
    ]
  }


}
