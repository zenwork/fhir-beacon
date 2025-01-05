import {html, TemplateResult}              from 'lit'
import {customElement}                     from 'lit/decorators.js'
import {Backbone, Decorated}               from '../../../internal'
import {strap}                             from '../../../shell'
import {DisplayConfig}                     from '../../../types'
import {PrimitiveType}                     from '../../primitive'
import {AppointmentRecurrenceTemplateData} from './appointment.data'

@customElement('fhir-appointment-recurrence-template')
export class AppointmentRecurrenceTemplateBackbone extends Backbone<AppointmentRecurrenceTemplateData> {
  constructor() {super('RecurrenceTemplate')}


  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AppointmentRecurrenceTemplateData>): TemplateResult[] {
    return [
      html`
          <fhir-codeable-concept key="timezone" .data=${data.timezone}></fhir-codeable-concept>
          <fhir-codeable-concept key="recurrenceType" .data=${data.recurrenceType}></fhir-codeable-concept>
          <fhir-primitive key="lastOccurrenceDate"
                          .value=${data.lastOccurrenceDate}
                          .type=${PrimitiveType.date}
          ></fhir-primitive>
          <fhir-weekly-template key="weeklyTemplate" .data=${data.weeklyTemplate}></fhir-weekly-template>
          <fhir-monthly-template key="monthlyTemplate" .data=${data.monthlyTemplate}></fhir-monthly-template>
          <fhir-yearly-template key="yearlyTemplate" .data=${data.yearlyTemplate}></fhir-yearly-template>
          <fhir-primitive key="excludingDate"
                          .value=${data.excludingDate}
                          .type=${PrimitiveType.date}
          ></fhir-primitive>
          <fhir-primitive key="excludingRecurrenceId"
                          .value=${data.excludingRecurrenceId}
                          .type=${PrimitiveType.date}
          ></fhir-primitive>
      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<AppointmentRecurrenceTemplateData>): TemplateResult[] {
    return [
      html`
          <fhir-codeable-concept key="timezone" .data=${data.timezone}></fhir-codeable-concept>
          <fhir-codeable-concept key="recurrenceType" .data=${data.recurrenceType}></fhir-codeable-concept>
          <fhir-primitive key="lastOccurrenceDate"
                          .value=${data.lastOccurrenceDate}
                          .type=${PrimitiveType.date}
          ></fhir-primitive>
          <fhir-weekly-template key="weeklyTemplate" .data=${data.weeklyTemplate}></fhir-weekly-template>
          <fhir-monthly-template key="monthlyTemplate" .data=${data.monthlyTemplate}></fhir-monthly-template>
          <fhir-yearly-template key="yearlyTemplate" .data=${data.yearlyTemplate}></fhir-yearly-template>
          ${strap({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             key: 'excludingData',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             collection: data.excludingDate,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             generator: (data,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         label,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         key) => html`
                          <fhir-primitive key=${key}
                                          .value=${data}
                                          .type=${PrimitiveType.date}
                          ></fhir-primitive>
                      `,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             summary: false,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             config
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           })}

          <fhir-primitive key="excludingRecurrenceId"
                          .value=${data.excludingRecurrenceId}
                          .type=${PrimitiveType.date}
          ></fhir-primitive>
      `
    ]
  }
}
