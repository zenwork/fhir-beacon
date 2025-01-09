import {html, TemplateResult}                from 'lit'
import {customElement}                       from 'lit/decorators.js'
import {BaseElement, Decorated, Validations} from '../../../internal'
import {DisplayConfig}                       from '../../../types'
import {RangeData}                           from './range.data'



@customElement('fhir-range')
export class Range extends BaseElement<RangeData> {
  constructor() {super('Range')}


  public renderDisplay(config: DisplayConfig,
                       data: Decorated<RangeData>,
                       validations: Validations): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<RangeData>,
                         validations: Validations): TemplateResult[] {
    return this.renderAny(config, data)
  }

  private renderAny(config: DisplayConfig, data: Decorated<RangeData>): TemplateResult[] {
    return [
      html`
          <fhir-quantity key="low" .data=${data.low} simple></fhir-quantity>
          <fhir-quantity key="high" .data=${data.high} simple></fhir-quantity>
      `
    ]
  }
}
