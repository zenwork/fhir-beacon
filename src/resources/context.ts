import {createContext} from '@lit/context'

import {BaseElementMode} from '../BaseElementMode'
import {ResourceData}    from './structures'

export const containedDataContext = createContext<ResourceData[]>(Symbol('fhir-contained-data'))
export type DisplayConfig = { mode: BaseElementMode, showerror: boolean, verbose: boolean, open: boolean }
export const defaultDisplayConfig = {mode: BaseElementMode.display, showerror: true, verbose: false, open: true}
export const displayConfigContext = createContext<DisplayConfig>(Symbol('fhir-display-context'))
