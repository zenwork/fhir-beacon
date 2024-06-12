import {consume}                           from '@lit/context'
import {PropertyValues}                    from 'lit'
import {property}                          from 'lit/decorators.js'
import {contextData, displayConfigContext} from '../contexts/context'
import {DisplayConfig}                     from '../contexts/context.data'
import {FhirDataContext}                   from '../contexts/FhirContextData'
import {BaseElement}                       from './base-element'
import {BaseElementData}                   from './base-element.data'

export abstract class BaseElementContextConsumer<T extends BaseElementData> extends BaseElement<T> {

  @consume({context: displayConfigContext, subscribe: true})
  declare displayConfig: DisplayConfig

  @consume({ context: contextData, subscribe: true })
  declare contextData: FhirDataContext

  @property({ type: String, attribute: 'data-path' })
  declare dataPath: string

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

    if (_changedProperties.has('dataPath') && this.contextData) {
      this.data = this.contextData.getAt(this.dataPath)
    }
  }
}
