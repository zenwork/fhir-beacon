import {consume}                                                   from '@lit/context'
import {BaseData}                                                  from '../BaseData'
import {BaseElement}                                               from '../BaseElement'
import {defaultDisplayConfig, DisplayConfig, displayConfigContext} from '../resources/context'

export class ConsumerBaseElement<T extends BaseData> extends BaseElement<T> {

  @consume({context: displayConfigContext, subscribe: true})
  protected displayConfig: DisplayConfig = defaultDisplayConfig
}
