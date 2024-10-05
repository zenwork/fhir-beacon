import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {DomainResource}       from '../../../internal'
import {strap} from '../../../shell/layout/structure-wrapper/strap'
import {wrap}  from '../../../shell/layout/wrapper/wrap'

import {DisplayConfig}     from '../../../types'
import {isDeceasedBoolean} from '../../complex/quantity/quantity.type-guards'
import {PrimitiveType}     from '../../primitive/type-converters/type-converters'
import {PatientData}       from './patient.data'

@customElement('fhir-patient')
export class Patient extends DomainResource<PatientData> {

  constructor() {
    super('Patient')
  }

  public renderDisplay(config: DisplayConfig, data: PatientData): TemplateResult[] {
    return [
      html`
          ${(wrap('names',
                  'name',
                  data.name,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-human-name key=${key} label=${label} .data=${data} summary></fhir-human-name > `,
                  this.summary,
                  this.summaryonly)
          )}

          ${(wrap('identifiers',
                  'identifier',
                  data.identifier,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-identifier key=${key} label='${label}' .data=${data} summary></fhir-identifier >`,
                  this.summary,
                  this.summaryonly
          ))}
          <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean} summary></fhir-primitive >

          ${(wrap('telecoms',
                  'telecom',
                  data.telecom,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-contact-point key=${key} label=${label} .data=${data} summary></fhir-contact-point >`,
                  this.summary,
                  this.summaryonly
          ))}

          ${wrap('addresses',
                 'address',
                 data.address,
                 config.verbose,
                 (data, label, key) => html`
                     <fhir-address key=${key} label=${label} .data=${data} summary></fhir-address summary > `,
                 this.summary,
                 this.summaryonly
          )}
      `
    ]
  }

  //TODO: how do we handle choices [x] in the strucutred view
  public renderStructure(config: DisplayConfig, data: PatientData): TemplateResult[] {
    return [
      html`
          ${(strap(
                  'identifiers',
                  'identifier',
                  data.identifier,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-identifier key=${key} label=${label} .data=${data} summary></fhir-identifier >`,
                  this.summary,
                  this.summaryonly
          ))}
          <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean} summary></fhir-primitive >

          ${(strap('names',
                   'name',
                   data.name,
                   config.verbose,
                   (data, label, key) => html`
                       <fhir-human-name key=${key} label=${label} .data=${data} summary></fhir-human-name >`,
                   this.summary,
                   this.summaryonly
          ))}

          ${(strap('telecoms',
                   'telecom',
                   data.telecom,
                   config.verbose,
                   (data, label, key) => html`
                       <fhir-contact-point key=${key} label="${label}" .data=${data} summary></fhir-contact-point > `,
                   this.summary,
                   this.summaryonly
          ))}
          <fhir-primitive label="gender" .value=${data.gender} .type=${PrimitiveType.code} summary></fhir-primitive >
          <fhir-primitive label="birthDate" .value=${data.birthDate} .type=${PrimitiveType.date} summary></fhir-primitive >

          ${isDeceasedBoolean(data.deceased)
            ? html`
                      <fhir-primitive label="deceasedBoolean" .value=${data.deceased} .type=${PrimitiveType.boolean} summary></fhir-primitive >`
            : html`
                      <fhir-primitive label="deceasedDateTime" .value=${data.deceased} .type=${PrimitiveType.datetime} summary></fhir-primitive >`
          }

          ${strap('addresses',
                  'address',
                  data.address,
                  config.verbose,
                  (data, label, key) => html`
                      <fhir-address key=${key} label=${label} .data=${data} summary></fhir-address > `,
                  this.summary,
                  this.summaryonly
          )}
      `
    ]
  }


}
