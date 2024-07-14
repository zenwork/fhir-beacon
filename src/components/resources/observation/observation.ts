import {html, TemplateResult}       from 'lit'
import {customElement}              from 'lit/decorators.js'
import {BaseElementContextProvider} from '../../../internal/base/base-element-context-provider'
import {ObservationData}            from './observation.data'

@customElement('fhir-observation')
export class Observation extends BaseElementContextProvider<ObservationData> {

  constructor() {super('Observation')}

  protected renderDisplay(): TemplateResult | TemplateResult[] {
    return html``
  }

  protected renderStructure(): TemplateResult | TemplateResult[] {
    return html``
  }

}
