export enum DisplayMode {
  combined = 'combined',
  debug = 'debug',
  display = 'display',
  display_summary = 'display_summary',
  narrative = 'narrative',
  override = 'override',
  structure = 'structure',
  structure_summary = 'structure_summary',
}

export type DisplayConfig = { mode: DisplayMode, showerror: boolean, verbose: boolean, open: boolean }
