import {html, TemplateResult}      from 'lit'
import {customElement}             from 'lit/decorators.js'
import {Decorated, DomainResource} from '../../../internal'
import {strap, wrap}               from '../../../shell'
import {DisplayConfig}             from '../../../types'
import {PrimitiveType}             from '../../primitive'
import {AppointmentData}           from './appointment.data'

const { code, datetime, positiveInt, instant, fhir_string, boolean } = PrimitiveType

@customElement('fhir-appointment')
export class Appointment extends DomainResource<AppointmentData> {

  constructor() {super('Appointment')}

  public renderDisplay(config: DisplayConfig, data: Decorated<AppointmentData>): TemplateResult[] {

    return [
      html`
          ${wrap({ key: 'identifier', collection: data.identifier, generator: 'fhir-identifier', config })}
          <fhir-primitive key="status" .value=${data.status} type=${code} required summary></fhir-primitive>
          <fhir-codeable-concept key="cancellationReason"
                                 .data=${data.cancellationReason}
                                 summary
          ></fhir-codeable-concept>
          ${wrap({ key: 'class', collection: data.class, generator: 'fhir-codeable-concept', config })}
          ${wrap({
                     key: 'serviceCategory',
                     collection: data.serviceCategory,
                     generator: 'fhir-codeable-concept',
                     config
                 })}
          ${wrap({ key: 'serviceType', collection: data.serviceType, generator: 'fhir-codeable-reference', config })}
          ${wrap({ key: 'speciality', collection: data.specialty, generator: 'fhir-codeable-concept', config })}
          ${wrap({
                     key: 'appointmentType',
                     collection: data.appointmentType,
                     generator: 'fhir-codeable-concept',
                     config
                 })}
          ${wrap({ key: 'reason', collection: data.reason, generator: 'fhir-codeable-reference', config })}
          <fhir-codeable-concept key="priority" .data=${data.priority}></fhir-codeable-concept>
          <fhir-primitive key="description" .value=${data.description} .type=${fhir_string}></fhir-primitive>
          ${wrap({ key: 'replaces', collection: data.replaces, generator: 'fhir-reference', summary: false, config })}
          ${wrap({
                     key: 'supportingInformation',
                     collection: data.supportingInformation,
                     generator: 'fhir-reference',
                     summary: false,
                     config
                 })}
          <fhir-reference key="originationAppointment" .data=${data.originationAppointment}></fhir-reference>
          <fhir-primitive key="start" .value=${data.start} .type=${instant} summary></fhir-primitive>
          <fhir-primitive key="end" .value=${data.end} .type=${instant} summary></fhir-primitive>
          <fhir-primitive key="minuteDuration" .value=${data.minutesDuration} .type=${positiveInt}></fhir-primitive>
          ${wrap({ key: 'slot', collection: data.slot, generator: 'fhir-reference', summary: false, config })}
          ${wrap({ key: 'account', collection: data.account, generator: 'fhir-reference', summary: false, config })}
          <fhir-primitive key="created" .value=${data.created} .type=${datetime}></fhir-primitive>
          <fhir-primitive key="cancellationDate" .value=${data.cancellationReason} .type=${datetime}></fhir-primitive>
          <fhir-annotation key="note" .data=${data.note}></fhir-annotation>
          ${wrap({
                     key: 'patientInstruction',
                     collection: data.patientInstruction,
                     generator: 'fhir-codeable-reference',
                     summary: false,
                     config
                 })}
          ${wrap({ key: 'basedOn', collection: data.basedOn, generator: 'fhir-reference', summary: false, config })}
          <fhir-reference key="subject" .data=${data.subject}></fhir-reference>
          ${wrap({
                     key: 'participant',
                     collection: data.participant,
                     generator: (data, label, key) => html`
                         <fhir-appointment-participant key=${key}
                                                       label=${label}
                                                       .data=${data}
                         ></fhir-appointment-participant> `,
                     summary: false,
                     config
                 })}
          <fhir-primitive key="recurrenceId" .value=${data.recurrenceId} .type=${positiveInt}></fhir-primitive>
          <fhir-primitive key="occurrenceChanged" .value=${data.occurrenceChanged} .type=${boolean}></fhir-primitive>
          <fhir-appointment-recurrence-template key="recurrenceTemplate"
                                                .data=${data.recurrenceTemplate}
          ></fhir-appointment-recurrence-template>
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<AppointmentData>): TemplateResult[] {

    return [
      html`
          ${strap({ key: 'identifier', collection: data.identifier, generator: 'fhir-identifier', config })}
          <fhir-primitive key="status" .value=${data.status} type=${code} required summary></fhir-primitive>
          <fhir-codeable-concept key="cancellationReason"
                                 .data=${data.cancellationReason}
                                 summary
          ></fhir-codeable-concept>
          ${strap({ key: 'class', collection: data.class, generator: 'fhir-codeable-concept', config })}
          ${strap({
                      key: 'serviceCategory',
                      collection: data.serviceCategory,
                      generator: 'fhir-codeable-concept',
                      config
                  })}
          ${strap({ key: 'serviceType', collection: data.serviceType, generator: 'fhir-codeable-reference', config })}
          ${strap({ key: 'speciality', collection: data.specialty, generator: 'fhir-codeable-concept', config })}
          ${strap({
                      key: 'appointmentType',
                      collection: data.appointmentType,
                      generator: 'fhir-codeable-concept',
                      config
                  })}
          ${strap({ key: 'reason', collection: data.reason, generator: 'fhir-codeable-reference', config })}
          <fhir-codeable-concept key="priority" .data=${data.priority}></fhir-codeable-concept>
          <fhir-primitive key="description" .value=${data.description} .type=${fhir_string}></fhir-primitive>
          ${strap({ key: 'replaces', collection: data.replaces, generator: 'fhir-reference', summary: false, config })}
          ${strap({
                      key: 'supportingInformation',
                      collection: data.supportingInformation,
                      generator: 'fhir-reference',
                      summary: false,
                      config
                  })}
          <fhir-reference key="originationAppointment" .data=${data.originationAppointment}></fhir-reference>
          <fhir-primitive key="start" .value=${data.start} .type=${instant} summary></fhir-primitive>
          <fhir-primitive key="end" .value=${data.end} .type=${instant} summary></fhir-primitive>
          <fhir-primitive key="minuteDuration" .value=${data.minutesDuration} .type=${positiveInt}></fhir-primitive>
          ${strap({ key: 'slot', collection: data.slot, generator: 'fhir-reference', summary: false, config })}
          ${strap({ key: 'account', collection: data.account, generator: 'fhir-reference', summary: false, config })}
          <fhir-primitive key="created" .value=${data.created} .type=${datetime}></fhir-primitive>
          <fhir-primitive key="cancellationDate" .value=${data.cancellationReason} .type=${datetime}></fhir-primitive>
          <fhir-annotation key="note" .data=${data.note}></fhir-annotation>
          ${strap({
                      key: 'patientInstruction',
                      collection: data.patientInstruction,
                      generator: 'fhir-codeable-reference',
                      summary: false,
                      config
                  })}
          ${strap({ key: 'basedOn', collection: data.basedOn, generator: 'fhir-reference', summary: false, config })}
          <fhir-reference key="subject" .data=${data.subject}></fhir-reference>
          ${strap({
                      key: 'participant',
                      collection: data.participant,
                      generator: (data, label, key) => html`
                          <fhir-appointment-participant key=${key}
                                                        label=${label}
                                                        .data=${data}
                          ></fhir-appointment-participant> `,
                      summary: false,
                      config
                  })}
          <fhir-primitive key="recurrenceId" .value=${data.recurrenceId} .type=${positiveInt}></fhir-primitive>
          <fhir-primitive key="occurrenceChanged" .value=${data.occurrenceChanged} .type=${boolean}></fhir-primitive>
          <fhir-appointment-recurrence-template key="recurrenceTemplate"
                                                .data=${data.recurrenceTemplate}
          ></fhir-appointment-recurrence-template>
      `
    ]
  }
}
