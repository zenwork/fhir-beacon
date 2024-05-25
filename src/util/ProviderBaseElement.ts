import {provide}                                                   from '@lit/context'
import {PropertyValues}                                            from 'lit'
import {property}                                                  from 'lit/decorators/property.js'
import {BaseData}                                                  from '../BaseData'
import {BaseElement}                                               from '../BaseElement'
import {BaseElementMode}                                           from '../BaseElementMode'
import {defaultDisplayConfig, DisplayConfig, displayConfigContext} from '../resources/context'

export class ProviderBaseElement<T extends BaseData> extends BaseElement<T> {

  @property({type: BaseElementMode, converter})
  public mode: BaseElementMode = BaseElementMode.display

  @property({type: Boolean, reflect: true})
  declare open: boolean

  @property({type: Boolean, reflect: true})
  declare verbose: boolean

  @property({type: Boolean, reflect: true})
  declare showerror: boolean


  @provide({context: displayConfigContext})
  protected display: DisplayConfig = defaultDisplayConfig

  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)


    if (_changedProperties.has('mode')) {
      this.display.mode = this.mode
    }
    if (_changedProperties.has('showerror')) {
      this.display.showerror = this.showerror
    }
    if (_changedProperties.has('verbose')) {
      this.display.verbose = this.verbose
    }
    if (_changedProperties.has('open')) {
      this.display.open = this.open
    }
  }
}


function converter(value: string | null): BaseElementMode {
  return value ? <BaseElementMode>value : BaseElementMode.display
}
