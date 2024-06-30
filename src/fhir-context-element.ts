import {consume}                                            from '@lit/context'
import {html, LitElement, PropertyValueMap, TemplateResult} from 'lit'
import {property, state}                                    from 'lit/decorators.js'
import {contextData}                                        from './internal/contexts/context'
import {FhirDataContext}                                    from './internal/contexts/FhirContextData'


export abstract class FhirContextElement extends LitElement {

  /**
   * Request data context from parent element
   */
  @consume({ context: contextData, subscribe: true })
  declare context: FhirDataContext

  /**
   * define json path to be requested from parent data. Lookup corresponding FHIR model of parent.
   */
  @property({ attribute: 'data-path', reflect: true })
  declare dataPath: null | string

  /**
   * value retrieved from context for `dataPath` property, based on the `data-path` attribute or as a constructor argument.
   * @private
   */
  @state()
  protected declare value: string

  constructor(dataPath: string | null) {
    super()
    this.dataPath = dataPath
  }

  /**
   * attribute update handling
   * @param _changedProperties
   * @protected
   */
  protected updated(_changedProperties: PropertyValueMap<any>) {
    super.updated(_changedProperties)
    if (this.context && this.dataPath) {
      this.value = this.context.getAt(this.dataPath)
    }
  }

  /**
   * Override this method to render something useful after the context value has been retrieved
   * @protected
   */
  protected render(): TemplateResult {
    return html`${this.value}`
  }

}
