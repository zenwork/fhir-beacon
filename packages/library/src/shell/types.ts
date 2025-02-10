import {DisplayMode} from './displayMode'



export type DisplayConfig = {
  source: 'unknown' | 'shell' | 'resource'
  mode: DisplayMode,
  summaryonly: boolean,
  showerror: boolean,
  verbose: boolean,
  open: boolean,
  input: boolean
}
