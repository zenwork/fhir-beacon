import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {DomainResource}       from '../../../internal'

import {ObservationData} from './observation.data'

@customElement('fhir-observation')
export class Observation extends DomainResource<ObservationData> {

  constructor() {
    super('Observation')
  }

  protected renderDisplay(): TemplateResult | TemplateResult[] {
    return html``
  }

  protected renderStructure(): TemplateResult | TemplateResult[] {
    return html``
  }

}
