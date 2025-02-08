import {html, TemplateResult}                               from 'lit'
import {customElement}                                      from 'lit/decorators.js'
import {choiceValidate, DomainResource, oneOf, Validations} from '../../../internal'
import {wrap}                                               from '../../../shell/layout/wrapper/wrap'

import {DisplayConfig} from '../../../types'
import {identifiers}   from '../../complex/identifier/identifiers'
import {PrimitiveType} from '../../primitive/type-converters/type-converters'
import {PatientData}   from './patient.data'



const { code, datetime, date, boolean, integer } = PrimitiveType

@customElement('fhir-patient')
export class Patient extends DomainResource<PatientData> {

  constructor() {
    super('Patient')
  }

  public renderDisplay(config: DisplayConfig, data: PatientData, validations: Validations): TemplateResult[] {
    return this.renderAny(config, data, validations)
  }


  public renderStructure(config: DisplayConfig, data: PatientData, validations: Validations): TemplateResult[] {
    return this.renderAny(config, data, validations)
  }

  public renderAny(config: DisplayConfig, data: PatientData, validations: Validations): TemplateResult[] {


    return [
      html`
          ${identifiers(data.identifier, config)}
          <fhir-primitive label="active" .value=${data.active} .type=${boolean} summary></fhir-primitive>

          ${(wrap({
                       key: 'name',
                       collection: data.name,
                       generator: (data, label, key) => html`
                       <fhir-human-name key=${key} label=${label} .data=${data} summary></fhir-human-name>`,
                       config
                   }
          ))}

          ${(wrap({
                       key: 'telecom',
                       collection: data.telecom,
                       generator: (data, label, key) => html`
                       <fhir-contact-point key=${key} label="${label}" .data=${data} summary></fhir-contact-point> `,
                       config
                   }
          ))}
          <fhir-primitive label="gender" .value=${data.gender} .type=${code} summary></fhir-primitive>
          <fhir-primitive label="birthDate"
                          .value=${data.birthDate}
                          .type=${date}
                          summary
          ></fhir-primitive>
          ${oneOf(this,
                  'deceased[x]',
                  validations.msgFor('deceased[x]'),
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
                         },
                         {
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

          ${wrap({
                      key: 'address',
                      collection: data.address,
                      generator: (data, label, key) => html`
                      <fhir-address key=${key} label=${label} .data=${data} summary></fhir-address> `,
                      config
                  }
          )}
          <fhir-codeable-concept key="maritalStatus" .data=${data.maritalStatus}></fhir-codeable-concept>

          ${oneOf(this,
                  'multipleBirth[x]',
                  validations.msgFor('multipleBirth[x]'),
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
          ${wrap({
                      key: 'contact',
                      collection: data.contact,
                      generator: (data, label, key) => html`
                      <fhir-patient-contact key=${key}
                                            label=${label}
                                            .data=${data}
                      ></fhir-patient-contact> `,
                      config
                  }
          )}
          ${wrap({
                      key: 'communication',
                      collection: data.communication,
                      generator: (data, label, key) => html`
                      <fhir-patient-communication key=${key}
                                                  label=${label}
                                                  .data=${data}
                      ></fhir-patient-communication> `,
                      config
                  }
          )}
          ${wrap({
                      key: 'generalPractitioner',
                      pluralBase: 'generalPractitioner',
                      collection: data.generalPractitioner,
                      generator: 'fhir-reference',
                      config
                  }
          )}
          <fhir-reference key="managingOrganisation"
                          label="managingOrganisation"
                          .data=${data.managingOrganization}
                          summary
          ></fhir-reference>
          ${wrap({
                      key: 'link',
                      collection: data.link,
                      generator: (data, label, key) => html`
                      <fhir-patient-link key=${key}
                                         label=${label}
                                         .data=${data}
                      ></fhir-patient-link> `,
                      config
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
