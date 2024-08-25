import {html, TemplateResult}      from 'lit'
import {customElement}             from 'lit/decorators.js'
import {DomainResource}            from '../../../internal/resource/domain-resource'
import {ObservationDefinitionData} from './observation-definition.data'

@customElement('fhir-observation-definition')
export class ObservationDefinition extends DomainResource<ObservationDefinitionData> {

  constructor() {
    super('ObservationDefinition')
  }

  public renderDisplay(): TemplateResult | TemplateResult[] {
    return html``
  }

  public renderStructure(): TemplateResult | TemplateResult[] {
    return html``
  }

}
