import {consume}                             from '@lit/context'
import {PropertyValues}                      from 'lit'
import {DisplayConfig, displayConfigContext} from '../contexts/context'
import {BaseElement}                         from './base-element'
import {BaseElementData}                     from './base-element.data'

export class BaseElementConsumer<T extends BaseElementData> extends BaseElement<T> {

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
