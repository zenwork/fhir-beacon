import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElementConsumer}  from '../../../internal/base/base-element-consumer'
import {AddressData}          from '../../resources/patient/patient.data'

@customElement('fhir-address')
export class Address extends BaseElementConsumer<AddressData> {

  constructor() {super('Address')}

  protected renderDisplay(data: AddressData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-not-supported label='address' variant="no-impl"></fhir-not-supported >`
  }

  protected renderStructure(data: AddressData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-not-supported label='address' variant="no-impl"></fhir-not-supported >`
  }

}
