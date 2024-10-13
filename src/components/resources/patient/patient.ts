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
          ${(wrap('name',
                  'name',
                  data.name,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-human-name key=${key} label=${label} .data=${data} summary></fhir-human-name> `,
                  this.summary,
                  this.summaryonly)
          )}

          ${(wrap('identifier',
                  'identifier',
                  data.identifier,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-identifier key=${key} label='${label}' .data=${data} summary></fhir-identifier>`,
                  this.summary,
                  this.summaryonly
          ))}
          <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean} summary></fhir-primitive>

          ${(wrap('telecom',
                  'telecom',
                  data.telecom,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-contact-point key=${key} label=${label} .data=${data} summary></fhir-contact-point>`,
                  this.summary,
                  this.summaryonly
          ))}

          ${wrap('address',
                 'address',
                 data.address,
                 config.verbose,
                 (data, label, key) => html`
                     <fhir-address key=${key} label=${label} .data=${data} summary></fhir-address> `,
                 this.summary,
                 this.summaryonly,
                 true
          )}
          <fhir-attachment key="photo" label="photo" .data=${data.photo}></fhir-attachment>
          ${wrap('contact',
                 'contact',
                 data.contact,
                 config.verbose,
                 (data, label, key) => html`
                     <fhir-patient-contact key=${key}
                                           label=${label}
                                           .data=${data}
                                           summary
                     ></fhir-patient-contact summary> `,
                 this.summary,
                 this.summaryonly,
                 true
          )}
          ${wrap('communication',
                 'communication',
                 data.communication,
                 config.verbose,
                 (data, label, key) => html`
                     <fhir-patient-communication key=${key}
                                                 label=${label}
                                                 .data=${data}
                                                 summary
                     ></fhir-patient-communication summary> `,
                 this.summary,
                 this.summaryonly,
                 true
          )}
          ${wrap('generalPractitioner',
                 'generalPractitioner',
                 data.generalPractitioner,
                 config.verbose,
                 (data, label, key) => html`
                     <fhir-reference key=${key}
                                     label=${label}
                                     .data=${data}
                     ></fhir-reference> `,
                 this.summary,
                 this.summaryonly
          )}
          <fhir-reference key="managingOrganization"
                          label="managingOrganization"
                          .data=${data.managingOrganization}
                          summary
          ></fhir-reference>
          ${wrap('link',
                 'link',
                 data.link,
                 config.verbose,
                 (data, label, key) => html`
                     <fhir-patient-link key=${key}
                                        label=${label}
                                        .data=${data}
                     ></fhir-patient-link> `,
                 this.summary,
                 this.summaryonly
          )}
      `
    ]
  }


  public renderStructure(config: DisplayConfig, data: PatientData, validations: Validations): TemplateResult[] {
    const { code, datetime, date, boolean, integer } = PrimitiveType

    return [
      html`
          ${(strap(
                  'identifier',
                  'identifier',
                  data.identifier,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-identifier key=${key} label=${label} .data=${data} summary></fhir-identifier>`,
                  this.summary,
                  this.summaryonly
          ))}
          <fhir-primitive label="active" .value=${data.active} .type=${boolean} summary></fhir-primitive>

          ${(strap('name',
                   'name',
                   data.name,
                   config.verbose,
                   (data, label, key) => html`
                       <fhir-human-name key=${key} label=${label} .data=${data} summary></fhir-human-name>`,
                   this.summary,
                   this.summaryonly
          ))}

          ${(strap('telecom',
                   'telecom',
                   data.telecom,
                   config.verbose,
                   (data, label, key) => html`
                       <fhir-contact-point key=${key} label="${label}" .data=${data} summary></fhir-contact-point> `,
                   this.summary,
                   this.summaryonly
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

          ${strap('address',
                  'address',
                  data.address,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-address key=${key} label=${label} .data=${data} summary></fhir-address> `,
                  this.summary,
                  this.summaryonly
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
          ${strap('contact',
                  'contact',
                  data.contact,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-patient-contact key=${key}
                                            label=${label}
                                            .data=${data}
                      ></fhir-patient-contact> `,
                  this.summary,
                  this.summaryonly
          )}
          ${strap('communication',
                  'communication',
                  data.communication,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-patient-communication key=${key}
                                                  label=${label}
                                                  .data=${data}

                      ></fhir-patient-communication> `,
                  this.summary,
                  this.summaryonly
          )}
          ${strap('generalPractitioner',
                  'generalPractitioner',
                  data.generalPractitioner,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-reference key=${key}
                                      label=${label}
                                      .data=${data}
                      ></fhir-reference> `,
                  this.summary,
                  this.summaryonly
          )}
          <fhir-reference key="managingOrganisation"
                          label="managingOrganisation"
                          .data=${data.managingOrganization}
                          summary
          ></fhir-reference>
          ${strap('link',
                  'link',
                  data.link,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-patient-link key=${key}
                                         label=${label}
                                         .data=${data}
                      ></fhir-patient-link> `,
                  this.summary,
                  this.summaryonly
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
