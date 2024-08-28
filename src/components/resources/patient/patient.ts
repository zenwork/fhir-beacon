import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {DomainResource}       from '../../../internal'

import {wrapc, wraps}      from '../../../shell/layout/wrapCollection'
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
          ${(wrapc('names', data.name, config.verbose, (i, x) => html`
        <fhir-human-name label="name${x}" .data=${i} summary></fhir-human-name >
        `))}

          ${(wrapc('identifiers', data.identifier, config.verbose, (i, x) => html`
            <fhir-identifier label='identifier${x}' .data=${i} summary></fhir-identifier >`))}
      <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean} summary></fhir-primitive >

          ${(wrapc('telecoms', data.telecom, config.verbose, (t, x) => html`
        <fhir-contact-point label="telecom${x}" .data=${t} summary></fhir-contact-point >
        `))}

          ${wrapc('addresses', data.address, config.verbose, (a, x) => html`
        <fhir-address label="address${x}" .data=${a} summary></fhir-address summary >
        `)}
      `
    ]
  }

  //TODO: how do we handle choices [x] in the strucutred view
  public renderStructure(config: DisplayConfig, data: PatientData): TemplateResult[] {
    return [
      html`
          ${(wraps('identifiers', data.identifier, config.verbose, (i, x) => html`
            <fhir-identifier label='identifier${x}' .data=${i} summary></fhir-identifier >`))}
        <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean} summary></fhir-primitive >

          ${(wraps('names', data.name, config.verbose, (i, x) => html`
            <fhir-human-name label="name${x}" .data=${i} summary></fhir-human-name >
        `))}

          ${(wraps('telecoms', data.telecom, config.verbose, (t, x) => html`
            <fhir-contact-point label="telecom${x}" .data=${t} summary></fhir-contact-point >
        `))}
        <fhir-primitive label="gender" .value=${data.gender} .type=${PrimitiveType.code} summary></fhir-primitive >
        <fhir-primitive label="birthDate" .value=${data.birthDate} .type=${PrimitiveType.date} summary></fhir-primitive >

        ${isDeceasedBoolean(data.deceased)
          ? html`
                    <fhir-primitive label="deceasedBoolean" .value=${data.deceased} .type=${PrimitiveType.boolean} summary></fhir-primitive >`
          : html`
                    <fhir-primitive label="deceasedDateTime" .value=${data.deceased} .type=${PrimitiveType.datetime} summary></fhir-primitive >`
        }

          ${wraps('addresses', data.address, config.verbose, (a, x) => html`
                    <fhir-address label="address${x}" .data=${a} summary></fhir-address >
                `
        )}
      `
    ]
  }


}
