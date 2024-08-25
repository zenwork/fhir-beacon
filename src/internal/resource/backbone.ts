import {html}                     from 'lit'
import {BaseElement, EmptyResult} from '../base'
import {BackboneElementData}      from './backbone.data'

export abstract class Backbone<D extends BackboneElementData> extends BaseElement<D> {
  protected constructor(type: string) {
    super(type)

    // TODO: this case needs to be fixed somehow... should not be in the constructor
    const result = [
      html`
          <fhir-not-supported
                  variant="no-impl"
                  label="modifier extensions"
                  description="not implemented"
          >
          </fhir-not-supported > `
    ]

    this.templateGenerators.structure.header
      = (config, data) => (data.modifierExtension || config.verbose) ? result : EmptyResult
  }

}
