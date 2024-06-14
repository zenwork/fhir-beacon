import {consume}                            from '@lit/context'
import {html, LitElement, PropertyValueMap} from 'lit'
import {customElement, property, state}     from 'lit/decorators.js'
import {contextData}                        from '../../../src/internal/contexts/context'
import {FhirDataContext}                    from '../../../src/internal/contexts/FhirContextData'

@customElement('custom-lit-element')
export class CustomLitElement extends LitElement {

  @consume({ context: contextData, subscribe: true })
  declare context: FhirDataContext

  @property({ reflect: true })
  declare label: string

  @property({attribute:'data-path', reflect: true })
  declare dataPath: string

  @state()
  declare value: string

  protected updated(_changedProperties: PropertyValueMap<any>) {
    super.updated(_changedProperties)
    if (this.context && this.dataPath) {
      this.value = this.context.getAt(this.dataPath)
    }
  }


  protected render(): unknown {
    return html`${this.label}: ${this.value}`
  }
}
