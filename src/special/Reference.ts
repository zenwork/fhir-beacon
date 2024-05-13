import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../BaseElement'
import {PrimitiveType}        from '../data/primitive/converters'
import {ReferenceData}        from './structures'
import '../data/primitive/Primitve'

@customElement('fhir-reference')
export class Reference extends BaseElement<ReferenceData> {

  //TODO: I think an extra attribute to describe the reference of what is needed here as a lot of examples rely on the key this is
  // assigned to rather than defining the `type` property

  protected renderDisplay(data: ReferenceData): TemplateResult | TemplateResult[] {
    return [
      html`
          <fhir-primitive label="type" type=${PrimitiveType.type} .value=${data.type}></fhir-primitive>`
    ]
  }


}
