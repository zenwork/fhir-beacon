import {DisplayMode} from '../types'

export function toDisplayMode(value: string | null): DisplayMode {
  return value ? <DisplayMode> value : DisplayMode.display
}

export function toDisplayOrStructure(value: string | null): DisplayMode {
  const mode = value ? <DisplayMode> value : DisplayMode.display
  if (mode !== DisplayMode.display && mode !== DisplayMode.structure) return DisplayMode.display
  return mode
}
