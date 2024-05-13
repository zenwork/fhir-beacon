import {html, LitElement, TemplateResult} from 'lit'
import {property}                         from 'lit/decorators.js'
import {choose}                           from 'lit/directives/choose.js'
import {join}                             from 'lit/directives/join.js'
import './util/Debug'
import {BaseData}                         from './BaseData'

export enum BaseElementMode {
  display = 'display',
  structure = 'structure',
  combined = 'combined',
  'narrative' = 'narrative'
}

export abstract class BaseElement<T extends BaseData> extends LitElement {

  @property({type: BaseElementMode, converter})
  public mode: BaseElementMode = BaseElementMode.display

  @property({type: Boolean})
  declare showError: boolean

  @property({type: Object, attribute: 'data'})
  declare data: BaseData & { [key: string]: any }

  protected render(): TemplateResult {
    let data = this.convertData(this.data)
    return html`${choose(this.mode, [
        [BaseElementMode.display, () => this.renderDisplay(data)],
        [
          BaseElementMode.structure,
          () => html`
              <fhir-wrapper>${this.renderStructure(data)}</fhir-wrapper>`
        ],
        [BaseElementMode.combined, () => this.renderCombined(data)],
      ],
      () => html`<h1>Error</h1>`)}`
  }

  /**
   * Empty implementation that should be overriden to render the displayable values in the data.
   *
   * @protected
   * @returns {TemplateResult} The rendered template result.
   */
  protected renderDisplay(data: T): TemplateResult | TemplateResult[] {
    return html`n/a`
  }

  protected renderStructure(data: T): TemplateResult | TemplateResult[] {
    return html`
        <bkn-debug .data=${data}></bkn-debug>`
  }

  protected renderCombined(data: T): TemplateResult {
    return html`${join([this.renderDisplay(data), this.renderStructure(data)], html``)}`
  }

  protected convertData(data: BaseData & { [key: string]: any }): T {
    return data as T
  }

}

function converter(value: string | null): BaseElementMode {
  return value ? <BaseElementMode>value : BaseElementMode.display
}
