import {html, TemplateResult}       from 'lit'
import {customElement}              from 'lit/decorators.js'
import {Backbone, Decorated}        from '../../../internal'
import {DisplayConfig}              from '../../../shell/types'
import {PrimitiveType}              from '../../primitive'
import {ObservationTriggeredByData} from './observation.data'



@customElement('fhir-observation-triggered-by')
export class ObservationTriggeredBy extends Backbone<ObservationTriggeredByData> {
  constructor() {
    super('ObservationTriggeredBy')
  }

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<ObservationTriggeredByData>): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<ObservationTriggeredByData>): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderAny(config: DisplayConfig,
                         data: Decorated<ObservationTriggeredByData>): TemplateResult[] {
    return [html`
        <fhir-reference key="observation" .data=${data.observation} required summary></fhir-reference>
        <fhir-primitive key="type" .value=${data.type} .type=${PrimitiveType.code} required summary></fhir-primitive>
        <fhir-primitive key="reason" .value=${data.reason} .type=${PrimitiveType.fhir_string}></fhir-primitive>
    `]
  }

}
