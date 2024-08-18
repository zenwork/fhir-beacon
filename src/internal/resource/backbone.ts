import {html}                from 'lit'
import {BaseElement}         from '../base'
import {BackboneElementData} from './backbone.data'

export abstract class Backbone<D extends BackboneElementData> extends BaseElement<D> {
  protected constructor(type: string) {
    super(type)
    this.addStructureTemplateGenerator('backbone',
                                       (data) => (data.modifierExtension || this.verbose)
                                                 ? html`
                                                   <fhir-not-supported variant="no-impl" label="modifier extensions" description="not implemented"></fhir-not-supported > `
                                                 : html``)
  }

}
