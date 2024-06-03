import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElementProvider}  from '../../../internal/base/base-element-provider'
import {wrapc, wraps}         from '../../../shell/layout/wrapCollection'
import {PrimitiveType}        from '../../primitive/type-converters'
import {PatientData}          from './patient.data'
import '../../complex/human-name/human-name'
import '../../../shell/layout/structure-wrapper/structure-wrapper'
import '../../../shell/layout/empty-set'

@customElement('fhir-patient')
export class Patient extends BaseElementProvider<PatientData> {

  constructor() {super('Patient')}

  protected renderDisplay(data: PatientData): TemplateResult | TemplateResult[] {
    return html`
      ${(wrapc('names', data.name, this.verbose, (i, x) => html`
        <fhir-human-name label="name${x}" .data=${i}></fhir-human-name >
      `))}
      ${(wrapc('identifiers', data.identifier, this.verbose, (i, x) => html`
        <fhir-identifier label='identifier${x}' .data=${i}></fhir-identifier >`))}
      <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean}></fhir-primitive >
    `
  }

  protected renderStructure(data: PatientData): TemplateResult | TemplateResult[] {
    return html`
      ${(wraps('identifiers', data.identifier, this.verbose, (i, x) => html`
        <fhir-identifier label='identifier${x}' .data=${i}></fhir-identifier >`))}
      <fhir-primitive label="active" .value=${data.active} .type=${PrimitiveType.boolean}></fhir-primitive >
      ${(wraps('names', data.name, this.verbose, (i, x) => html`
        <fhir-human-name label="name${x}" .data=${i}></fhir-human-name >
      `))}
    `
  }


}
