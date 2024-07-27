import {consume, ContextRoot}              from '@lit/context'
import {PropertyValues}                    from 'lit'
import {property}                          from 'lit/decorators.js'
import {contextData, displayConfigContext} from '../contexts/context'
import {DisplayConfig}                     from '../contexts/context.data'
import {FhirDataContext}                   from '../contexts/FhirContextData'
import {BaseElement}                       from './base-element'
import {BaseElementData, DisplayMode}      from './base-element.data'

//TODO: adding this context root to the document.body is a bit of a hack and may or may not work when there are multiple shells in one document.
(function init() {
  // console.debug('adding a context root to the body')
  new ContextRoot().attach(document.body)
})()

export abstract class BaseElementContextConsumer<T extends BaseElementData> extends BaseElement<T> {

  @consume({context: displayConfigContext, subscribe: true})
  declare displayConfig: DisplayConfig

  @consume({ context: contextData, subscribe: true })
  declare contextData: FhirDataContext

  @property({ type: String, attribute: 'data-path' })
  declare dataPath: string


  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (!_changedProperties.has('mode')
        && !_changedProperties.has('verbose')
        && !_changedProperties.has('open')
        && !_changedProperties.has('showerror')
        && this.displayConfig) {


      // console.log(this.type, this.displayConfig)
      // TODO: make this better. this is implicit behaviour
      this.mode = (this.dataPath || this.displayConfig.mode === DisplayMode.override) ? this.mode : this.displayConfig.mode
      this.verbose = this.displayConfig.verbose
      this.open = this.displayConfig.open
      this.showerror = this.displayConfig.showerror
    }

    if (_changedProperties.has('dataPath') && this.contextData) {
      this.data = this.contextData.getAt(this.dataPath)
    }

  }
}
