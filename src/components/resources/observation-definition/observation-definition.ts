import {TemplateResult}            from 'lit'
import {customElement}             from 'lit/decorators.js'
import {EmptyResult}               from '../../../internal'
import {DomainResource}            from '../../../internal/resource/domain-resource'
import {ObservationDefinitionData} from './observation-definition.data'

@customElement('fhir-observation-definition')
export class ObservationDefinition extends DomainResource<ObservationDefinitionData> {

  constructor() {
    super('ObservationDefinition')
  }

  public renderDisplay(): TemplateResult[] {
    return EmptyResult
  }

  public renderStructure(): TemplateResult[] {
    return EmptyResult
  }

}
