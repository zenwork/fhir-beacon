import {html, TemplateResult}      from 'lit'
import {customElement}             from 'lit/decorators.js'
import {useSystem}                 from '../../../codes/use-system'
import {Decorated, DomainResource} from '../../../internal'
import {strap, wrap}               from '../../../shell'
import {DisplayConfig}             from '../../../types'
import {Choices}                   from '../../../valuesets/ValueSet.data'
import {PrimitiveType}             from '../../primitive'
import {SlotData}                  from './slot.data'



const statuses: Choices = useSystem('http://hl7.org/fhir/slotstatus')

@customElement('fhir-slot')
export class Slot extends DomainResource<SlotData> {
  constructor() {super('Slot')}


  public renderDisplay(config: DisplayConfig, data: Decorated<SlotData>): TemplateResult[] {
    return [
      html`
          ${wrap({
                     key: 'identifier',
                     collection: data.identifier,
                     generator: 'fhir-identifier',
                     config
                 })}
          ${wrap({
                     key: 'serviceCategory',
                     collection: data.serviceCategory,
                     generator: 'fhir-codeable-concept',
                     config
                 })}
          ${strap({
                      key: 'serviceType',
                      collection: data.serviceType,
                      generator: 'fhir-codeable-reference',
                      config
                  })}
          ${wrap({
                     key: 'speciality',
                     collection: data.specialty,
                     generator: 'fhir-codeable-concept',
                     config
                 })}
          ${wrap({
                     key: 'appointmentType',
                     collection: data.appointmentType,
                     generator: 'fhir-codeable-concept',
                     config
                 })}

          <fhir-reference key="schedule" .data=${data.schedule} summary required></fhir-reference>
          <fhir-primitive key="status"
                          .value=${data.status}
                          type=${PrimitiveType.code}"
                          summary
                          required
                          .choices=${statuses.choices}
          ></fhir-primitive>
          <fhir-primitive key="start"
                          .value=${data.start}
                          type=${PrimitiveType.instant}
                          summary
                          required
          ></fhir-primitive>
          <fhir-primitive key="end" .value=${data.end} type=${PrimitiveType.instant} summary required></fhir-primitive>
          <fhir-primitive key="overbooked" .value=${data.overbooked} type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="comment" .value=${data.comment} type=${PrimitiveType.fhir_string}></fhir-primitive>

      `
    ]

  }


  public renderStructure(config: DisplayConfig, data: Decorated<SlotData>): TemplateResult[] {
    return [
      html`
          ${strap({
                      key: 'identifier',
                      collection: data.identifier,
                      generator: 'fhir-identifier',
                      config
                  })}
          ${strap({
                      key: 'serviceCategory',
                      collection: data.serviceCategory,
                      generator: 'fhir-codeable-concept',
                      config
                  })}
          ${strap({
                      key: 'serviceType',
                      collection: data.serviceType,
                      generator: 'fhir-codeable-reference',
                      config
                  })}
          ${strap({
                      key: 'speciality',
                      collection: data.specialty,
                      generator: 'fhir-codeable-concept',
                      config
                  })}
          ${strap({
                      key: 'appointmentType',
                      collection: data.appointmentType,
                      generator: 'fhir-codeable-concept',
                      config
                  })}

          <fhir-reference key="schedule" .data=${data.schedule} summary required></fhir-reference>
          <fhir-primitive key="status"
                          .value=${data.status}
                          type=${PrimitiveType.code}"
                          summary
                          required
          ></fhir-primitive>
          <fhir-primitive key="start"
                          .value=${data.start}
                          type=${PrimitiveType.instant}
                          summary
                          required
          ></fhir-primitive>
          <fhir-primitive key="end" .value=${data.end} type=${PrimitiveType.instant} summary required></fhir-primitive>
          <fhir-primitive key="overbooked" .value=${data.overbooked} type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="comment" .value=${data.comment} type=${PrimitiveType.fhir_string}></fhir-primitive>

      `
    ]
  }

  public renderEditableDisplay(config: DisplayConfig,
                               data: Decorated<SlotData>): TemplateResult[] {

    return [
      html`
          ${strap({
                      key: 'identifier',
                      collection: data.identifier,
                      generator: 'fhir-identifier',
                      config
                  })}
          ${strap({
                      key: 'serviceCategory',
                      collection: data.serviceCategory,
                      generator: 'fhir-codeable-concept',
                      config
                  })}
          ${strap({
                      key: 'serviceType',
                      collection: data.serviceType,
                      generator: 'fhir-codeable-reference',
                      config
                  })}
          ${strap({
                      key: 'speciality',
                      collection: data.specialty,
                      generator: 'fhir-codeable-concept',
                      config
                  })}
          ${strap({
                      key: 'appointmentType',
                      collection: data.appointmentType,
                      generator: 'fhir-codeable-concept',
                      config
                  })}

          <fhir-reference key="schedule" .data=${data.schedule} summary required></fhir-reference>
          <fhir-primitive key="status"
                          .value=${data.status}
                          type=${PrimitiveType.code}"
                          summary
                          required
          ></fhir-primitive>
          <fhir-primitive key="start"
                          .value=${data.start}
                          type=${PrimitiveType.instant}
                          summary
                          required
          ></fhir-primitive>
          <fhir-primitive key="end" .value=${data.end} type=${PrimitiveType.instant} summary required></fhir-primitive>
          <fhir-primitive key="overbooked" .value=${data.overbooked} type=${PrimitiveType.boolean}></fhir-primitive>
          <fhir-primitive key="comment" .value=${data.comment} type=${PrimitiveType.fhir_string}></fhir-primitive>

      `
    ]
  }

}
