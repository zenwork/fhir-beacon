import {createContext} from '@lit/context'

import {ResourceData}                                       from '../resource/domain-resource.data'
import {DisplayConfig}                                      from './context.data'
import {containedDataKey, contextDataKey, displayConfigKey} from './contexts.keys'
import {FhirDataContext}                                    from './FhirContextData'


export const containedDataContext = createContext<ResourceData[]>(containedDataKey)
export const displayConfigContext = createContext<DisplayConfig>(displayConfigKey)
export const contextData = createContext<FhirDataContext>(contextDataKey)
