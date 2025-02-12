import {html, TemplateResult}           from 'lit'
import {customElement}                  from 'lit/decorators.js'
import {Backbone, Decorated}            from '../../../internal'
import {DisplayConfig}                  from '../../../shell/types'
import {PrimitiveType}                  from '../../primitive'
import {AppointmentMonthlyTemplateData} from './appointment.data'



@customElement('fhir-monthly-template')
export class AppointmentMonthlyTemplate extends Backbone<AppointmentMonthlyTemplateData> {
  constructor() {super('MonthlyTemplate') }


  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AppointmentMonthlyTemplateData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="dayOfMonth" .value=${data.dayOfWeek} .type=${PrimitiveType.positiveInt}></fhir-primitive>
          <fhir-coding key="nthWeekOfMonth" .data=${data.nthWeekOfMonth}></fhir-coding>
          <fhir-coding key="dayOfWeek" .data=${data.dayOfWeek}></fhir-coding>
          <fhir-primitive key="monthInterval"
                          .value=${data.monthInterval}
                          .type=${PrimitiveType.positiveInt}
          ></fhir-primitive>


      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<AppointmentMonthlyTemplateData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="dayOfMonth" .value=${data.dayOfWeek} .type=${PrimitiveType.positiveInt}></fhir-primitive>
          <fhir-coding key="nthWeekOfMonth" .data=${data.nthWeekOfMonth}></fhir-coding>
          <fhir-coding key="dayOfWeek" .data=${data.dayOfWeek}></fhir-coding>
          <fhir-primitive key="monthInterval"
                          .value=${data.monthInterval}
                          .type=${PrimitiveType.positiveInt}
          ></fhir-primitive>


      `
    ]
  }
}
