import {ContextProvider}            from '@lit/context'
import {LitElement, PropertyValues} from 'lit'
import {customElement, property}    from 'lit/decorators.js'
import {displayConfigContext}       from '../internal'
import {DisplayMode}                from '../types'
import {toBaseElementModeEnum}      from '../utilities'

@customElement('fhir-shell')
export class Shell extends LitElement {

  @property({ type: DisplayMode, converter: toBaseElementModeEnum, reflect: true })
  public mode: DisplayMode = DisplayMode.display

  @property({ type: Boolean, reflect: true })
  public open: boolean = false

  @property({ type: Boolean, reflect: true })
  public verbose: boolean = false

  @property({ type: Boolean, reflect: true })
  public showerror: boolean = false

  protected display = new ContextProvider(this, { context: displayConfigContext })

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (_changedProperties.has('mode')) {
      this.display.setValue({ ...this.display.value, mode: this.mode })
    }

    if (_changedProperties.has('showerror')) {
      this.display.setValue({ ...this.display.value, showerror: this.showerror }, true)
    }

    if (_changedProperties.has('verbose')) {
      this.display.setValue({ ...this.display.value, verbose: this.verbose })
    }

    if (_changedProperties.has('open')) {
      this.display.setValue({ ...this.display.value, open: this.open })
    }
  }

  protected createRenderRoot() {
    return this
  }

}
