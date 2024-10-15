import {html, TemplateResult}                                  from 'lit'
import {customElement}                                         from 'lit/decorators.js'
import {choiceOf, choiceValidate, DomainResource, Validations} from '../../../internal'
import {strap}                                                 from '../../../shell/layout/structure-wrapper/strap'
import {wrap}                                                  from '../../../shell/layout/wrapper/wrap'

import {DisplayConfig} from '../../../types'
import {PrimitiveType} from '../../primitive/type-converters/type-converters'
import {PatientData}   from './patient.data'

@customElement('fhir-patient')
export class Patient extends DomainResource<PatientData> {

  constructor() {
    super('Patient')
  }

  public renderDisplay(config: DisplayConfig, data: PatientData): TemplateResult[] {
    console.log(data.managingOrganization)
    return [
      html`
          ${(wrap({
                      key: 'name',
                      pluralBase: 'name',
                      collection: data.name,
                      generator: (data, label, key) => html`
                      <fhir-human-name key=${key} label=${label} .data=${data} summary></fhir-human-name> `,
                      summary: this.summary,
                      config
                  })
          )}

          ${(wrap({
                      key: 'identifier',
                      pluralBase: 'identifier',
                      collection: data.identifier,
                      generator: (data, label, key) => html`
                      <fhir-identifier key=${key} label='${label}' .data=${data} summary></fhir-identifier>`,
                      summary: this.summary,
                      config
                  }
          ))}
          <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean} summary></fhir-primitive>

          ${(wrap({
                      key: 'telecom',
                      pluralBase: 'telecom',
                      collection: data.telecom,
                      generator: (data, label, key) => html`
                      <fhir-contact-point key=${key} label=${label} .data=${data} summary></fhir-contact-point>`,
                      summary: this.summary,
                      config
                  }
          ))}

          ${wrap({
                     key: 'address',
                     pluralBase: 'address',
                     collection: data.address,
                     generator: (data, label, key) => html`
                     <fhir-address key=${key} label=${label} .data=${data} summary></fhir-address> `,
                     summary: this.summary,
                     config
                 }
          )}
          <fhir-attachment key="photo" label="photo" .data=${data.photo}></fhir-attachment>
          ${wrap({
                     key: 'contact',
                     pluralBase: 'contact',
                     collection: data.contact,
                     generator: (data, label, key) => html`
                     <fhir-patient-contact key=${key}
                                           label=${label}
                                           .data=${data}
                                           summary
                     ></fhir-patient-contact summary> `,
                     summary: this.summary,
                     config
                 }
          )}
          ${wrap({
                     key: 'communication',
                     pluralBase: 'communication',
                     collection: data.communication,
                     generator: (data, label, key) => html`
                     <fhir-patient-communication key=${key}
                                                 label=${label}
                                                 .data=${data}
                                                 summary
                     ></fhir-patient-communication summary> `,
                     summary: this.summary,
                     config
                 }
          )}
          ${wrap({
                     key: 'generalPractitioner',
                     pluralBase: 'generalPractitioner',
                     collection: data.generalPractitioner,
                     generator: (data, label, key) => html`
                     <fhir-reference key=${key}
                                     label=${label}
                                     .data=${data}
                     ></fhir-reference> `,
                     summary: this.summary,
                     config
                 }
          )}
          <fhir-reference key="managingOrganization"
                          label="managingOrganization"
                          .data=${data.managingOrganization}
                          summary
          ></fhir-reference>
          ${wrap({
                     key: 'link',
                     pluralBase: 'link',
                     collection: data.link,
                     generator: (data, label, key) => html`
                     <fhir-patient-link key=${key}
                                        label=${label}
                                        .data=${data}
                     ></fhir-patient-link> `,
                     summary: this.summary,
                     config
                 }
          )}
      `
    ]
  }


  public renderStructure(config: DisplayConfig, data: PatientData, validations: Validations): TemplateResult[] {
    const { code, datetime, date, boolean, integer } = PrimitiveType

    return [
      html`
          ${(strap(
                  {
                      key: 'identifier',
                      pluralBase: 'identifier',
                      collection: data.identifier,
                      generator: (data, label, key) => html`
                      <fhir-identifier key=${key} label=${label} .data=${data} summary></fhir-identifier>`,
                      summary: this.summary,
                      config: this.getDisplayConfig()
                  }
          ))}
          <fhir-primitive label="active" .value=${data.active} .type=${boolean} summary></fhir-primitive>

          ${(strap({
                       key: 'name',
                       pluralBase: 'name',
                       collection: data.name,
                       generator: (data, label, key) => html`
                       <fhir-human-name key=${key} label=${label} .data=${data} summary></fhir-human-name>`,
                       summary: this.summary,
                       config: this.getDisplayConfig()
                   }
          ))}

          ${(strap({
                       key: 'telecom',
                       pluralBase: 'telecom',
                       collection: data.telecom,
                       generator: (data, label, key) => html`
                       <fhir-contact-point key=${key} label="${label}" .data=${data} summary></fhir-contact-point> `,
                       summary: this.summary,
                       config: this.getDisplayConfig()
                   }
          ))}
          <fhir-primitive label="gender" .value=${data.gender} .type=${code} summary></fhir-primitive>
          <fhir-primitive label="birthDate"
                          .value=${data.birthDate}
                          .type=${date}
                          summary
          ></fhir-primitive>
          ${choiceOf(this,
                     'deceased[x]',
                     validations.errFor('deceased[x]'),
                     [
                         {
                             data: data.deceasedBoolean,
                             html: (d, n, e) => {
                                 console.log('deceasedBoolean', d)
                                 return html`
                                     <fhir-primitive key="deceasedBoolean"
                                                     label=${n}
                                                     .value=${d}
                                                     .type=${boolean}
                                                     .errormessage=${e}
                                                     summary
                                     ></fhir-primitive>`
                             }
                         }, {
                         data: data.deceasedDateTime,
                         html: (d, n, e) => html`
                             <fhir-primitive key="deceasedDateTime"
                                             label=${n}
                                             .value=${d}
                                             .type=${datetime}
                                             .errormessage=${e}
                                             summary
                             ></fhir-primitive>`
                     }
                     ])
          }

          ${strap({
                      key: 'address',
                      pluralBase: 'address',
                      collection: data.address,
                      generator: (data, label, key) => html`
                      <fhir-address key=${key} label=${label} .data=${data} summary></fhir-address> `,
                      summary: this.summary,
                      config: this.getDisplayConfig()
                  }
          )}
          <fhir-codeable-concept key="maritalStatus" .data=${data.maritalStatus}></fhir-codeable-concept>

          ${choiceOf(this,
                     'multipleBirth[x]',
                     validations.errFor('multipleBirth[x]'),
                     [
                         {
                             data: data.multipleBirthBoolean,
                             html: (d, n, e) => html`
                                 <fhir-primitive key='multipleBirthBoolean'
                                                 label=${n}
                                                 .value=${d}
                                                 .type=${boolean}
                                                 .errormessage=${e}
                                 ></fhir-primitive>
                             `
                         },
                         {
                             data: data.multipleBirthInteger,
                             html: (d, n, e) => html`
                                 <fhir-primitive key='multipleBirthInteger'
                                                 label=${n}
                                                 .value=${d}
                                                 .type=${integer}
                                                 .errormessage=${e}
                                 ></fhir-primitive>
                             `
                         }
                     ])}

          <fhir-attachment key="photo" label="photo" .data=${data.photo}></fhir-attachment>
          ${strap({
                      key: 'contact',
                      pluralBase: 'contact',
                      collection: data.contact,
                      generator: (data, label, key) => html`
                      <fhir-patient-contact key=${key}
                                            label=${label}
                                            .data=${data}
                      ></fhir-patient-contact> `,
                      summary: this.summary,
                      config: this.getDisplayConfig()
                  }
          )}
          ${strap({
                      key: 'communication',
                      pluralBase: 'communication',
                      collection: data.communication,
                      generator: (data, label, key) => html`
                      <fhir-patient-communication key=${key}
                                                  label=${label}
                                                  .data=${data}
                      ></fhir-patient-communication> `,
                      summary: this.summary,
                      config: this.getDisplayConfig()
                  }
          )}
          ${strap({
                      key: 'generalPractitioner',
                      pluralBase: 'generalPractitioner',
                      collection: data.generalPractitioner,
                      generator: (data, label, key) => html`
                      <fhir-reference key=${key}
                                      label=${label}
                                      .data=${data}
                      ></fhir-reference> `,
                      summary: this.summary,
                      config: this.getDisplayConfig()
                  }
          )}
          <fhir-reference key="managingOrganisation"
                          label="managingOrganisation"
                          .data=${data.managingOrganization}
                          summary
          ></fhir-reference>
          ${strap({
                      key: 'link',
                      pluralBase: 'link',
                      collection: data.link,
                      generator: (data, label, key) => html`
                      <fhir-patient-link key=${key}
                                         label=${label}
                                         .data=${data}
                      ></fhir-patient-link> `,
                      summary: this.summary,
                      config: this.getDisplayConfig()
                  }
          )}

      `
    ]

  }


  public validate(data: PatientData, validations: Validations, fetched: boolean) {
    super.validate(data, validations, fetched)

    choiceValidate(data, validations, 'deceased[x]', ['deceasedBoolean', 'deceasedDateTime'])
    choiceValidate(data, validations, 'multipleBirth[x]', ['multipleBirthBoolean', 'multipleBirthInteger'])

  }
}
