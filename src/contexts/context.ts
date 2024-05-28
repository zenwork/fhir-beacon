import {createContext} from '@lit/context'
import {ResourceData}  from '../components/resources'


import {BaseElementMode} from '../internal/base/BaseElementMode'

export const containedDataContext = createContext<ResourceData[]>(Symbol('fhir-contained-data'))
export type DisplayConfig = { mode: BaseElementMode, showerror: boolean, verbose: boolean, open: boolean }
export const defaultDisplayConfig = {mode: BaseElementMode.display, showerror: true, verbose: false, open: true}
export const displayConfigContext = createContext<DisplayConfig>(Symbol('fhir-display-context'))
