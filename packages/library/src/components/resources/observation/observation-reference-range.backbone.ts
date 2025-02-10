import {html, TemplateResult}          from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {Backbone, Decorated}           from '../../../internal'
import {wrap}                          from '../../../shell'
import {DisplayConfig}                 from '../../../shell/types'
import {PrimitiveType}                 from '../../primitive'
import {ObservationReferenceRangeData} from './observation.data'



@customElement('fhir-observation-reference-range')
export class ObservationReferenceRange extends Backbone<ObservationReferenceRangeData> {
  constructor() {
    super('ObservationReferenceRange')
  }

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<ObservationReferenceRangeData>): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<ObservationReferenceRangeData>): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderAny(config: DisplayConfig,
                   data: Decorated<ObservationReferenceRangeData>): TemplateResult[] {
    return [
      html`
          <fhir-quantity key="low" .data=${data.low} simple></fhir-quantity>
          <fhir-quantity key="high" .data=${data.high} simple></fhir-quantity>
          <fhir-codeable-concept key="normalValue" .data=${data.normalValue}></fhir-codeable-concept>
          <fhir-codeable-concept key="type" .data=${data.type}></fhir-codeable-concept>
          ${wrap({
                     key: 'appliesTo',
                     collection: data.appliesTo ?? [],
                     generator: (d, l, k) => html`
                         <fhir-codeable-concept key=${k} label=${l} .data=${d}></fhir-codeable-concept>`,
                     config
                 }
          )}
          <fhir-range key="age" .data=${data.age}></fhir-range>
          <fhir-primitive key="text" .data=${data.text} .type=${PrimitiveType.markdown}></fhir-primitive>
      `
    ]
  }
}
