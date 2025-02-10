import {html, TemplateResult}     from 'lit'
import {customElement}            from 'lit/decorators.js'
import {Backbone, Decorated}      from '../../../internal'
import {DisplayConfig}            from '../../../shell/types'
import {PrimitiveType}            from '../../primitive'
import {PatientCommunicationData} from './patient.data'



const { boolean } = PrimitiveType

@customElement('fhir-patient-communication')
export class PatientCommunicationBackbone extends Backbone<PatientCommunicationData> {

  constructor() {super('PatientCommunication')}

  public renderDisplay(_: DisplayConfig,
                       data: Decorated<PatientCommunicationData>): TemplateResult[] {
    return [
      html`
          <fhir-codeable-concept key="language"
                                 label="language"
                                 .data=${data.language}
                                 required
          ></fhir-codeable-concept>
          <fhir-primitive key="preferred" label="preferred" .value=${data.preferred} .type=${boolean}></fhir-primitive>
      `
    ]
  }

  public renderStructure(_: DisplayConfig,
                         data: Decorated<PatientCommunicationData>): TemplateResult[] {
    return [
      html`
          <fhir-codeable-concept key="language"
                                 label="language"
                                 .data=${data.language}
                                 required
          ></fhir-codeable-concept>
          <fhir-primitive key="preferred" label="preferred" .value=${data.preferred} .type=${boolean}></fhir-primitive>
      `
    ]
  }
}
