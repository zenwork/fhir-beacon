import {html, TemplateResult}          from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {Backbone, Decorated}           from '../../../internal'
import {DisplayConfig}                 from '../../../shell/types'
import {PrimitiveType}                 from '../../primitive'
import {AppointmentYearlyTemplateData} from './appointment.data'



@customElement('fhir-yearly-template')
export class AppointmentYearlyTemplate extends Backbone<AppointmentYearlyTemplateData> {
  constructor() {super('YearlyTemplate') }


  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AppointmentYearlyTemplateData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="yearInterval"
                          .value=${data.yearInterval}
                          .type=${PrimitiveType.positiveInt}
          ></fhir-primitive>

      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<AppointmentYearlyTemplateData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="yearInterval"
                          .value=${data.yearInterval}
                          .type=${PrimitiveType.positiveInt}
          ></fhir-primitive>

      `
    ]
  }
}
