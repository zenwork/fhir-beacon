import {createContext}   from '@lit/context'
import {DisplayConfig}   from '../../shell/types'
import {ResourceData}    from '../resource'
import {FhirDataContext} from './FhirContextData'



export const containedResourcesKey = Symbol('fhir-contained-data')
export const displayConfigKey = Symbol('fhir-display-config')
export const dataKey = Symbol('fhir-context-data')

export const containedResourcesContext = createContext<ResourceData[]>(containedResourcesKey)
export const displayConfigContext = createContext<DisplayConfig>(displayConfigKey)
export const dataContext = createContext<FhirDataContext>(dataKey)
