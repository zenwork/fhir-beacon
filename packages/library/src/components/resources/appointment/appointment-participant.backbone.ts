import {html, TemplateResult}       from 'lit'
import {customElement}              from 'lit/decorators.js'
import {Backbone, Decorated}        from '../../../internal'
import {strap, wrap}                from '../../../shell'
import {DisplayConfig}              from '../../../shell/types'
import {PrimitiveType}              from '../../primitive'
import {AppointmentParticipantData} from './appointment.data'



@customElement('fhir-appointment-participant')
export class AppointmentParticipantBackbone extends Backbone<AppointmentParticipantData> {
  constructor() {super('Participant')}

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AppointmentParticipantData>): TemplateResult[] {

    return [
      html`
          ${wrap({
                     key: 'type',
                     collection: data.type,
                     generator: 'fhir-codeable-concept',
                     config
                 })}
          <fhir-period key="period" .data=${data.period}></fhir-period>
          <fhir-reference key="actor" .data=${data.actor} summary></fhir-reference>
          <fhir-primitive key="required" .value=${data.required} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="status" .value=${data.status} .type=${PrimitiveType.code}></fhir-primitive>


      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<AppointmentParticipantData>): TemplateResult[] {
    return [
      html`
          ${strap({
                      key: 'type',
                      collection: data.type,
                      generator: 'fhir-codeable-concept',
                      config
                  })}
          <fhir-period key="period" .data=${data.period}></fhir-period>
          <fhir-reference key="actor" .data=${data.actor} summary></fhir-reference>
          <fhir-primitive key="required" .value=${data.required} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="status" .value=${data.status} .type=${PrimitiveType.code}></fhir-primitive>


      `
    ]
  }
}
