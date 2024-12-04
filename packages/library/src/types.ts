export enum DisplayMode {
  debug = 'debug',
  display = 'display',
  narrative = 'narrative',
  override = 'override',
  structure = 'structure'
}

export type DisplayConfig = {
  mode: DisplayMode,
  summaryonly: boolean,
  showerror: boolean,
  verbose: boolean,
  open: boolean,
  input: boolean
}
