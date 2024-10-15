import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {Backbone, Decorated}  from '../../../internal'
import {strap, wrap}          from '../../../shell'
import {DisplayConfig}        from '../../../types'
import {PrimitiveType}        from '../../primitive'
import {PatientContactData}   from './patient.data'

const { code } = PrimitiveType

@customElement('fhir-patient-contact')
export class PatientContactBackbone extends Backbone<PatientContactData> {
  constructor() {super('PatientContact')}

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<PatientContactData>): TemplateResult[] {
    return [
      html`
          ${
                  wrap({
                           key: 'relationships',
                           pluralBase: 'relationship',
                           collection: data.relationship,
                           generator: (d, l, k) => html`
                           <fhir-codeable-concept key=${k} label=${l} .data=${d}></fhir-codeable-concept>`,
                           summary: this.summary,
                           config
                       })
          }
          <fhir-human-name key="name" label="name" .data=${data.name}></fhir-human-name>
          ${
                  wrap({
                           key: 'telecoms',
                           pluralBase: 'telecom',
                           collection: data.telecom,
                           generator: (d, l, k) => html`
                           <fhir-contact-point key=${k} label=${l} .data=${d}></fhir-contact-point>`,
                           summary: this.summary,
                           config
                       })
          }

          <fhir-address key="address" label="address" .data=${data.address}></fhir-address>
          <fhir-primitive key="gender" label="gender" .value=${data.gender} .type=${code}></fhir-primitive>
          <fhir-reference key="organisation" label="organisation" .data=${data.reference}></fhir-reference>
          <fhir-period key="period" label="period" .data=${data.period}></fhir-period>

      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<PatientContactData>): TemplateResult[] {
    return [
      html`
          ${
                  strap({
                            key: 'relationship',
                            pluralBase: 'relationship',
                            collection: data.relationship,
                            generator: (d, l, k) => html`
                            <fhir-codeable-concept key=${k} label=${l} .data=${d}></fhir-codeable-concept>`,
                            summary: this.summary,
                            config: this.getDisplayConfig()
                        })
          }
          <fhir-human-name key="name" label="name" .data=${data.name}></fhir-human-name>
          ${
                  strap({
                            key: 'telecom',
                            pluralBase: 'telecom',
                            collection: data.telecom,
                            generator: (d, l, k) => html`
                            <fhir-contact-point key=${k} label=${l} .data=${d}></fhir-contact-point>`,
                            summary: this.summary,
                            config: this.getDisplayConfig()
                        })
          }

          <fhir-address key="address" label="address" .data=${data.address}></fhir-address>
          <fhir-primitive key="gender" label="gender" .value=${data.gender} .type=${code}></fhir-primitive>
          <fhir-reference key="organisation" label="organisation" .data=${data.reference}></fhir-reference>
          <fhir-period key="period" label="period" .data=${data.period}></fhir-period>


      `
    ]

  }
}
