import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {Backbone}             from '../../../internal'
import {DisplayConfig}        from '../../../types'
import {PrimitiveType}        from '../../primitive'
import {MedicationBatchData}  from './medication.data'

@customElement('fhir-medication-batch')
export class MedicationBatchBackbone extends Backbone<MedicationBatchData> {
  constructor() {super('Batch')}


  public renderDisplay(config: DisplayConfig, data: MedicationBatchData): TemplateResult[] {
    return [
      html`
              <fhir-primitive label="lot number" .value=${data.lotNumber} .type=${PrimitiveType.fhir_string}></fhir-primitive >
              <fhir-primitive label="expiration date" .value=${data.expirationDate} .type=${PrimitiveType.datetime}></fhir-primitive >
      `
    ]
  }


  public renderStructure(config: DisplayConfig, data: MedicationBatchData): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="lotNumber" .value=${data.lotNumber} .type=${PrimitiveType.fhir_string}></fhir-primitive >
          <fhir-primitive key="expirationDate" .value=${data.expirationDate} .type=${PrimitiveType.datetime}></fhir-primitive >
      `
    ]
  }
}
