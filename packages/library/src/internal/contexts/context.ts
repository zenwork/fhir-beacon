import {createContext}              from '@lit/context'
import {DisplayConfig, DisplayMode} from '../../types'
import {ResourceData}               from '../resource'
import {FhirDataContext}            from './FhirContextData'

export const containedResourcesKey = Symbol('fhir-contained-data')
export const displayConfigKey = Symbol('fhir-display-config')
export const dataKey = Symbol('fhir-context-data')


export const containedResourcesContext = createContext<ResourceData[]>(containedResourcesKey)
export const displayConfigContext = createContext<DisplayConfig>(displayConfigKey)
export const dataContext = createContext<FhirDataContext>(dataKey)


export const defaultDisplayConfig = {
  mode: DisplayMode.display,
  showerror: true,
  verbose: false,
  open: true,
  summaryonly: false
}
