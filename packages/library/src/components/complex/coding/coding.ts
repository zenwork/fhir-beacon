import {html, TemplateResult}                from 'lit'
import {customElement}                       from 'lit/decorators.js'
import {BaseElement, Decorated, Validations} from '../../../internal'
import {DisplayConfig}                       from '../../../types'
import {CodingData}                          from './coding.data'



@customElement('fhir-coding')
export class Coding extends BaseElement<CodingData> {

  constructor() {
    super('Coding')
  }

  private static computeDisplay = (data: Decorated<CodingData>) => {
    if (data.display) return data.display
    if (data.code) return data.code
  }

  private static computeContext(data: Decorated<CodingData>, validations: Validations): string | undefined {
    if (validations.has({ path: [{ node: 'code' }] })) return data.code
    if (validations.has({ path: [{ node: 'system' }] })) return data.system
    return data.display ? data.code : undefined
  }


  public override renderDisplay(_config: DisplayConfig,
                                data: Decorated<CodingData>,
                                validations: Validations): TemplateResult[] {

    return [
      html`
          <fhir-primitive
                  .label=${this.getLabel()}
                  .value=${Coding.computeDisplay(data)}
                  .context=${(Coding.computeContext(data, validations))}
                  .errormessage=${validations.msgFor({ path: [{ node: 'code' }] })}
                  summary
          ></fhir-primitive >
      `
    ]
  }


  public renderStructure(_config: DisplayConfig, data: Decorated<CodingData>,
                         validations: Validations): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="extension" .value=${data.extension} summary></fhir-primitive>
          <fhir-primitive label="version" .value=${data.version} summary></fhir-primitive>
          <fhir-primitive label="system"
                          .value=${data.system}
                          type="url"
                          .errormessage=${validations.msgFor({ path: [{ node: 'system' }] })}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="code"
                          .value=${data.code}
                          type="code"
                          .errormessage=${validations.msgFor({ path: [{ node: 'code' }] })}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="display" .value=${data.display} summary></fhir-primitive>
      `
    ]
  }


}
