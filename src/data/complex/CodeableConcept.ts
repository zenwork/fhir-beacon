import {css, html, TemplateResult}    from 'lit'
import {repeat}                       from 'lit-html/directives/repeat.js'
import {customElement}                from 'lit/decorators.js'
import {BaseElement, BaseElementMode} from '../../BaseElement'
import {CodeableConceptData}          from './strucutures/complex'
import './Coding'

@customElement('fhir-codeable-concept')
export class CodeableConcept extends BaseElement<CodeableConceptData> {

  static styles = css`
      header {
          font-weight: bold;
      }
  `

  protected renderDisplay(data: CodeableConceptData): TemplateResult {
    let cnt = 0
    return html`
        <fhir-primitive label="text" .value=${data.text}></fhir-primitive>
        <header>Codings</header>
        ${repeat(data.coding, (c) => html`
            <header>coding ${++cnt}:</header>
            <bkn-coding .data=${c} .mode=${BaseElementMode.display}></bkn-coding>
        `)}
    `
  }

  protected renderStructure(data: CodeableConceptData): TemplateResult {
    let cnt = 0
    return html`
        <fhir-primitive label="text" .value=${data.text}></fhir-primitive>
        <header>Codings</header>
        ${repeat(data.coding, (c) => html`
            <header>coding ${++cnt}:</header>
            <bkn-coding .data=${c} .mode=${BaseElementMode.structure}></bkn-coding>
        `)}
    `
  }
}
