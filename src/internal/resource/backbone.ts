import {html, TemplateResult} from 'lit'
import {mustRender}           from '../../components/mustRender'
import {DisplayMode}          from '../../types'
import {BaseElement}          from '../base'
import {BackboneElementData}  from './backbone.data'

export abstract class Backbone<D extends BackboneElementData> extends BaseElement<D> {
  protected constructor(type: string) {
    super(type)
    this.addStructureTemplateGenerator('backbone',
                                       (data) => (data.modifierExtension || this.verbose)
                                                 ? html`
                                                   <fhir-not-supported variant="no-impl" label="modifier extensions" description="not implemented"></fhir-not-supported > `
                                                 : html``)
  }


  protected render(): TemplateResult | TemplateResult[] {
    if (mustRender(this.convertedData, this.mode, this.verbose, this.summaryMode(), this.summary)) {
      switch (this.mode) {
        case DisplayMode.debug:
        case DisplayMode.narrative:
        case DisplayMode.override:
        case DisplayMode.structure:
        case DisplayMode.structure_summary:
          return super.render()
        case DisplayMode.display:
        case DisplayMode.display_summary:
          return html`
              <fhir-wrapper label="${this.getLabel()}" variant="primary" ?summary=${this.summary}>
                  ${super.render()}
              </fhir-wrapper >
          `
      }
    }

    return html``

  }
}
