import {createContext}   from '@lit/context'
import {BaseElementMode} from '../base/base-element.data'

import {ResourceData} from '../resource/domain-resource.data'


export const containedDataContext = createContext<ResourceData[]>(Symbol('fhir-contained-data'))
export type DisplayConfig = { mode: BaseElementMode, showerror: boolean, verbose: boolean, open: boolean }
export const defaultDisplayConfig = {mode: BaseElementMode.display, showerror: true, verbose: false, open: true}
export const displayConfigContext = createContext<DisplayConfig>(Symbol('fhir-display-context'))
