import {TemplateResult}              from 'lit'
import {customElement}               from 'lit/decorators.js'
import {DomainResource, EmptyResult} from '../../../internal'

import {ObservationData} from './observation.data'

@customElement('fhir-observation')
export class Observation extends DomainResource<ObservationData> {

  constructor() {
    super('Observation')
  }

  public renderDisplay(): TemplateResult[] {
    return EmptyResult
  }

  public renderStructure(): TemplateResult[] {
    return EmptyResult
  }

}
