import {html, PropertyValues, TemplateResult} from 'lit'
import {customElement, property}              from 'lit/decorators.js'
import {unsafeHTML}                           from 'lit/directives/unsafe-html.js'
import {BaseElement, NoDataObject}            from '../../../internal'
import {DisplayConfig}                        from '../../../types'

import {NarrativeData} from './narrative.data'



@customElement('fhir-narrative')
export class Narrative extends BaseElement<NarrativeData> {

  @property({ reflect: true })
  declare status: string

  constructor() {
    super('Narrative')
  }

  public renderNarrative(config: DisplayConfig, data: NarrativeData): TemplateResult[] {
    return [
      html`
          <div id="formatted-narrative" part="narrative-styling">
              <div part="narrative">${unsafeHTML(data.div)}</div>
          </div>
      `
    ]
  }

  public renderDisplay(config: DisplayConfig, data: NarrativeData): TemplateResult[] {
    return [
      html`
          <fhir-wrapper label="${config.verbose ? `summary (status:${data.status})` : 'summary'}"
                          ?summaryonly=${this.getDisplayConfig().summaryonly}
          >
          <div id="formatted-narrative" part="narrative-styling">
              <div part="narrative">${unsafeHTML(data.div)}</div >
          </div>
          </fhir-wrapper>
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: NarrativeData): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="status" .value=${data.status}></fhir-primitive >
          <fhir-wrapper label="div" variant="details" ?summaryonly=${this.getDisplayConfig().summaryonly}>
              <fhir-primitive .value=${data.div}></fhir-primitive >
          </fhir-wrapper>
      `
    ]
  }

  // protected createRenderRoot() {
  //   return this
  // }
  public async connectedCallback() {
    super.connectedCallback()

    // Find the <style> element by its ID
    const styleElement = document.getElementById('fhir-beacon-narrative') as HTMLStyleElement

    // Check if the <style> element exists and has valid text content
    if (styleElement && styleElement.sheet && (styleElement.sheet as CSSStyleSheet).cssRules) {
      // Access the stylesheet's rules
      const styleSheet = styleElement.sheet as CSSStyleSheet

      // Create a new Constructable StyleSheet
      const constructableSheet = new CSSStyleSheet()
      Array.from(styleSheet.cssRules).forEach(rule => {
        constructableSheet.insertRule(rule.cssText) // Copy each rule
      })

      // Attach to shadowRoot's adoptedStyleSheets
      this.shadowRoot!.adoptedStyleSheets = [...this.shadowRoot!.adoptedStyleSheets, constructableSheet]
    }
  }
  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (_changedProperties.has('data') && this.data !== NoDataObject) {
      if (this.data?.status) this.status = this.data.status
    }
  }
}
