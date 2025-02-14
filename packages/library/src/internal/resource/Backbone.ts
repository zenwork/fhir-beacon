import {html, PropertyValues}   from 'lit'
import {DisplayConfig}          from '../../shell/types'
import {Decorated, EmptyResult} from '../base'
import {BaseElement}            from '../BaseElement'
import {BackboneElementData}    from './backbone.data'



export abstract class Backbone<D extends BackboneElementData> extends BaseElement<D> {

  protected willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes)

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

    this.templateGenerators.structure.header.push(
      (config: DisplayConfig, data: Decorated<D>) => {
        return (data.modifierExtension || config.verbose)
               ? result
               : EmptyResult
      })
  }
}
