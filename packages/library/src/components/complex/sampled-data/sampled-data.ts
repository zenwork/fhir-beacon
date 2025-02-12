import {html, TemplateResult}   from 'lit'
import {customElement}          from 'lit/decorators.js'
import {BaseElement, Decorated} from '../../../internal'
import {DisplayConfig}          from '../../../shell/types'
import {PrimitiveType}          from '../../primitive'
import {SampledDataData}        from './sample-data.data'



@customElement('fhir-sampled-data')
export class SampledData extends BaseElement<SampledDataData> {

  constructor() {
    super('SampledData')
  }

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<SampledDataData>): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<SampledDataData>): TemplateResult[] {
    return this.renderAny(config, data)
  }

  public renderAny(config: DisplayConfig,
                   data: Decorated<SampledDataData>): TemplateResult[] {
    return [html`
        <fhir-quantity key="origin" .data=${data.origin} simple summary required></fhir-quantity>
        <fhir-primitive key="interval" .value=${data.interval} .type=${PrimitiveType.decimal} summary></fhir-primitive>
        <fhir-primitive key="intervalUnit" .value=${data.intervalUnit} .type=${PrimitiveType.code} summary required></fhir-primitive>
        <fhir-primitive key="factor" .value=${data.factor} .type=${PrimitiveType.decimal} summary></fhir-primitive>
        <fhir-primitive key="lowerLimit" .value=${data.lowerLimit} .type=${PrimitiveType.decimal} summary></fhir-primitive>
        <fhir-primitive key="upperLimit" .value=${data.upperLimit} .type=${PrimitiveType.decimal} summary></fhir-primitive>
        <fhir-primitive key="dimensions" .value=${data.dimensions} .type=${PrimitiveType.positiveInt} summary required></fhir-primitive>
        <fhir-primitive key="codeMap" .value=${data.codeMap} .type=${PrimitiveType.canonical}></fhir-primitive>
        <fhir-primitive key="offset" .value=${data.offset} .type=${PrimitiveType.fhir_string}></fhir-primitive>
        <fhir-primitive key="data" .value=${data.data} .type=${PrimitiveType.fhir_string}></fhir-primitive>
        
        
        
    `]
  }
}
