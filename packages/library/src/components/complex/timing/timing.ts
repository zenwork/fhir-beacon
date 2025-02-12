import {html, TemplateResult}   from 'lit'
import {customElement}          from 'lit/decorators.js'
import {BaseElement, Decorated} from '../../../internal'
import {wrap}                   from '../../../shell'
import {DisplayConfig}          from '../../../shell/types'
import {PrimitiveType}          from '../../primitive'

import {TimingData} from './timing.data'



@customElement('fhir-timing')
export class Timing extends BaseElement<TimingData> {
  constructor() {
    super('Timing')
  }


  public renderDisplay(config: DisplayConfig,
                       data: Decorated<TimingData>): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<TimingData>): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderAny(config: DisplayConfig,
                   data: Decorated<TimingData>): TemplateResult[] {
    return [
      html`
          ${wrap({
                     key: 'event',
                     collection: data.event ?? [],
                     generator: (d, l, k) => html`
                         <fhir-primitive key=${k}
                                         label=${l}
                                         .value=${d}
                                         .type=${PrimitiveType.datetime}
                                         summary
                         ></fhir-primitive>`,
                     config
                 })}
          <fhir-timing-repeat key="repeat" .data=${data.repeat}></fhir-timing-repeat>
          <fhir-codeable-concept key="code" .data=${data.code} summary></fhir-codeable-concept>

      `
    ]
  }
}
