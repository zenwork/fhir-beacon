import {createContext} from '@lit/context'

import {ResourceData}                       from '../resource/domain-resource.data'
import {DisplayConfig}                      from './context.data'
import {containedDataKey, displayConfigKey} from './contexts.keys'


export const containedDataContext = createContext<ResourceData[]>(containedDataKey)
export const displayConfigContext = createContext<DisplayConfig>(displayConfigKey)
