import {consume}                             from '@lit/context'
import {PropertyValues}                      from 'lit'
import {BaseData}                            from './BaseData'
import {BaseElement}                         from './BaseElement'
import {DisplayConfig, displayConfigContext} from './resources/context'

export class ConsumerBaseElement<T extends BaseData> extends BaseElement<T> {

  @consume({context: displayConfigContext, subscribe: true})
  declare displayConfig: DisplayConfig


  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    // console.log(this.type, _changedProperties, this.displayConfig)
    if (!_changedProperties.has('mode')
        && !_changedProperties.has('verbose')
        && !_changedProperties.has('open')
        && !_changedProperties.has('showerror')
        && this.displayConfig) {

      // console.log(this.type, this.displayConfig)

      this.mode = this.displayConfig.mode
      this.verbose = this.displayConfig.verbose
      this.open = this.displayConfig.open
      this.showerror = this.displayConfig.showerror
    }
  }
}