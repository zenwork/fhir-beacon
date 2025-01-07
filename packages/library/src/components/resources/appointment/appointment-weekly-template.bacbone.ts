import {html, TemplateResult}          from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {Backbone, Decorated}           from '../../../internal'
import {DisplayConfig}                 from '../../../types'
import {PrimitiveType}                 from '../../primitive'
import {AppointmentWeeklyTemplateData} from './appointment.data'

@customElement('fhir-weekly-template')
export class AppointmentWeeklyTemplate extends Backbone<AppointmentWeeklyTemplateData> {
  constructor() {super('WeeklyTemplate') }


  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AppointmentWeeklyTemplateData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="monday" .value=${data.monday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="tuesday" .value=${data.tuesday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="wednesday" .value=${data.wednesday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="thursday" .value=${data.thursday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="friday" .value=${data.friday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="saturday" .value=${data.saturday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="sunday" .value=${data.sunday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="weekInterval"
                          .value=${data.weekInterval}
                          .type=${PrimitiveType.positiveInt}
          ></fhir-primitive>
      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<AppointmentWeeklyTemplateData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="monday" .value=${data.monday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="tuesday" .value=${data.tuesday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="wednesday" .value=${data.wednesday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="thursday" .value=${data.thursday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="friday" .value=${data.friday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="saturday" .value=${data.saturday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="sunday" .value=${data.sunday} .type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="weekInterval"
                          .value=${data.weekInterval}
                          .type=${PrimitiveType.positiveInt}
          ></fhir-primitive>
      `
    ]
  }
}
