import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {BaseElement}          from '../../BaseElement'
import {CodingData}           from '../structures'

@customElement('bkn-coding')
export class Coding extends BaseElement<CodingData> {

  override renderDisplay(data: CodingData): TemplateResult {
    return html`
        <bkn-primitive label="display" .value=${data.display ? data.display : 'n/a'} ?showError=${this.showError}></bkn-primitive>`
  }

  protected renderStructure(validatedData: CodingData): TemplateResult {
    return html`
        <div style="border-radius: 0.2rem; border: solid 0.1rem #0c2d6b; padding:0.2rem;background: #fcfcfc;">
            <bkn-primitive label="id" .value=${validatedData.id} ?showError=${this.showError}></bkn-primitive>
            <bkn-primitive label="extension" .value=${validatedData.extension} ?showError=${this.showError}></bkn-primitive>
            <bkn-primitive label="version" .value=${validatedData.version} ?showError=${this.showError}></bkn-primitive>
            <bkn-primitive label="system" type="url" .value=${validatedData.system} ?showError=${this.showError}></bkn-primitive>
            <bkn-primitive label="code" type="code" .value=${validatedData.code} ?showError=${this.showError}></bkn-primitive>
            <bkn-primitive label="display" .value=${validatedData.display} ?showError=${this.showError}></bkn-primitive>
        </div>
    `
  }

}
