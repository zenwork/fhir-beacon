import {html, LitElement, TemplateResult} from 'lit'
import {property}                         from 'lit/decorators.js'
import {choose}                           from 'lit/directives/choose.js'
import {join}                             from 'lit/directives/join.js'
import {BaseElementData}                  from './data/Structures'
import './util/Debug'

export enum Mode {
  display = 'display',
  structure = 'structure',
  combined = 'combined'
}

export class BaseElement<T> extends LitElement {

  @property({type: Mode, converter})
  public mode: Mode = Mode.display

  @property({type: Boolean})
  declare showError: boolean

  @property({type: Object, attribute: 'data'})
  declare data: BaseElementData & { [key: string]: any }

  protected render(): TemplateResult {
    let data = this.convertData(this.data)
    return html`${choose(this.mode, [
      [Mode.display, () => this.renderDisplay(data)],
      [Mode.structure, () => this.renderStructure(data)],
      [Mode.combined, () => this.renderCombined(data)],
    ])}`
  }

  /**
   * Empty implementation that should be overriden to render the displayable values in the data.
   *
   * @protected
   * @returns {TemplateResult} The rendered template result.
   */
  protected renderDisplay(validatedData: T): TemplateResult {
    return html`n/a`
  }

  protected renderStructure(validatedData: T): TemplateResult {
    return html`
        <bkn-debug .data=${validatedData}></bkn-debug>`
  }

  protected renderCombined(validatedData: T): TemplateResult {
    return html`${join([this.renderDisplay(validatedData), this.renderStructure(validatedData)], html``)}`
  }

  protected convertData(data: BaseElementData & { [key: string]: any }): T {
    let converted: T = data as T
    return converted
  }

}

function converter(value: string | null): Mode {
  return value ? <Mode>value : Mode.display
}
