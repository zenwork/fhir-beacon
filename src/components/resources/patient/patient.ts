import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElementContextProvider}  from '../../../internal/base/base-element-context-provider'
import {wrapc, wraps}         from '../../../shell/layout/wrapCollection'
import {isDeceasedBoolean}    from '../../complex/quantity/quantity.type-guards'
import {PrimitiveType}        from '../../primitive/type-converters'
import {PatientData}          from './patient.data'
import '../../complex/human-name/human-name'
import '../../../shell/layout/structure-wrapper/structure-wrapper'
import '../../../shell/layout/empty-set'
import '../../complex/contact-point/contact-point'
import '../../complex/'

@customElement('fhir-patient')
export class Patient extends BaseElementContextProvider<PatientData> {

  constructor() {
    super('Patient')
    this.summary = true
  }

  protected renderDisplay(data: PatientData): TemplateResult | TemplateResult[] {
    return html`
      ${(wrapc('names', data.name, this.verbose, (i, x) => html`
        <fhir-human-name label="name${x}" .data=${i} summary></fhir-human-name >
      `))}
      ${(wrapc('identifiers', data.identifier, this.verbose, (i, x) => html`
        <fhir-identifier label='identifier${x}' .data=${i} summary></fhir-identifier >`))}
      <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean} summary></fhir-primitive >
      ${(wrapc('telecoms', data.telecom, this.verbose, (t, x) => html`
        <fhir-contact-point label="telecom${x}" .data=${t} summary></fhir-contact-point >
      `))}
      ${wrapc('addresses', data.address, this.verbose, (a, x) => html`
        <fhir-address label="address${x}" .data=${a} summary></fhir-address summary >
      `)}
    `
  }

  //TODO: how do we handle choices [x] in the strucutred view
  protected renderStructure(data: PatientData): TemplateResult | TemplateResult[] {
    return html`
      ${(wraps('identifiers', data.identifier, this.verbose, (i, x) => html`
        <fhir-identifier label='identifier${x}' .data=${i} summary></fhir-identifier >`))}
      <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean} summary></fhir-primitive >
      ${(wraps('names', data.name, this.verbose, (i, x) => html`
        <fhir-human-name label="name${x}" .data=${i} summary></fhir-human-name >
      `))}
      ${(wraps('telecoms', data.telecom, this.verbose, (t, x) => html`
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
      ${wraps('addresses', data.address, this.verbose, (a, x) => html`
        <fhir-address label="address${x}" .data=${a} summary></fhir-address >
      `)}
    `
  }


}
