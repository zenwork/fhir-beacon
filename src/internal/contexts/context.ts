import {createContext}              from '@lit/context'
import {DisplayConfig, DisplayMode} from '../../types'
import {ResourceData}               from '../resource'
import {FhirDataContext}            from './FhirContextData'

export const containedDataKey = Symbol('fhir-contained-data')
export const displayConfigKey = Symbol('fhir-display-config')
export const contextDataKey = Symbol('fhir-context-data')
export const elementLineageKey = Symbol('fhir-element-lineage-key')

//TODO: rename these to be more consistent
export const containedDataContext = createContext<ResourceData[]>(containedDataKey)
export const displayConfigContext = createContext<DisplayConfig>(displayConfigKey)
export const contextData = createContext<FhirDataContext>(contextDataKey)
export type Lineage = { labels: string[]; types: string[] };
export const elementLineageCtx = createContext<Lineage>(elementLineageKey)

export const defaultDisplayConfig = { mode: DisplayMode.display, showerror: true, verbose: false, open: true }
