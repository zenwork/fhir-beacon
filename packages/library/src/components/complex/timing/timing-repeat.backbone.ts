import {html, TemplateResult}                            from 'lit'
import {customElement}                                   from 'lit/decorators.js'
import {Backbone, choice, Decorated, oneOf, Validations} from '../../../internal'
import {DisplayConfig}                                   from '../../../types'
import {PrimitiveType}                                   from '../../primitive'
import {PeriodData}                                      from '../period'
import {QuantityData}                                    from '../quantity'
import {RangeData}                                       from '../range'
import {TimingRepeatData}                                from './timing.data'



@customElement('fhir-timing-repeat')
export class TimingRepeat extends Backbone<TimingRepeatData> {
  constructor() {super('TimingRepeat')}

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<TimingRepeatData>,
                       validations: Validations): TemplateResult[] {
    return this.renderAny(config, data, validations)
  }
  public renderStructure(config: DisplayConfig,
                         data: Decorated<TimingRepeatData>,
                         validations: Validations): TemplateResult[] {
    return this.renderAny(config, data, validations)
  }
  public renderAny(config: DisplayConfig,
                   data: Decorated<TimingRepeatData>,
                   validations: Validations): TemplateResult[] {
    return [
      html`
          ${oneOf(this,
                  'bounds[x]',
                  validations.msgFor('bound[x]'), [
                      choice(
                        data.boundsDuration,
                        (d:QuantityData)=>html`
                            <fhir-quantity key="bound[x]" label="boundDuration" .data=${d} summary></fhir-quantity>
                      `),
                      choice(
                              data.boundsRange,
                              (d:RangeData)=>html`
                            <fhir-range key="bounds[x]" label="boundRange" .data=${d} summary></fhir-range>
                      `),
                      choice(
                              data.boundsPeriod,
                              (d:PeriodData)=>html`
                            <fhir-period key="bounds[x]" label="boundPeriod" .data=${d} summary></fhir-period>
                      `),
                  ])}
          <fhir-primitive key="count" .value=${data.count} .type=${PrimitiveType.positiveInt} summary></fhir-primitive>
          <fhir-primitive key="countMax" .value=${data.countMax} .type=${PrimitiveType.positiveInt} summary></fhir-primitive>
          <fhir-primitive key="duration" .value=${data.duration} .type=${PrimitiveType.decimal} summary></fhir-primitive>
          <fhir-primitive key="durationMax" .value=${data.durationMax} .type=${PrimitiveType.decimal} summary></fhir-primitive>
          <fhir-primitive key="durationUnit" .value=${data.durationUnit} .type=${PrimitiveType.code} summary></fhir-primitive>
          <fhir-primitive key="frequency" .value=${data.frequency} .type=${PrimitiveType.positiveInt} summary></fhir-primitive>
          <fhir-primitive key="frequencyMax" .value=${data.frequencyMax} .type=${PrimitiveType.positiveInt} summary></fhir-primitive>
          <fhir-primitive key="period" .value=${data.period} .type=${PrimitiveType.decimal} summary></fhir-primitive>
          <fhir-primitive key="periodMax" .value=${data.periodMax} .type=${PrimitiveType.decimal} summary></fhir-primitive>
          <fhir-primitive key="periodUnit" .value=${data.periodUnit} .type=${PrimitiveType.code} summary></fhir-primitive>
          <fhir-primitive key="dayOfWeek" .value=${data.dayOfWeek} .type=${PrimitiveType.code} summary></fhir-primitive>
          <fhir-primitive key="timeOfDay" .value=${data.timeOfDay} .type=${PrimitiveType.time} summary></fhir-primitive>
          <fhir-primitive key="when" .value=${data.dayOfWeek} .type=${PrimitiveType.code} summary></fhir-primitive>
          <fhir-primitive key="offset" .value=${data.offset} .type=${PrimitiveType.unsigned_int} summary></fhir-primitive>
          
          
      `
    ]
  }
}
