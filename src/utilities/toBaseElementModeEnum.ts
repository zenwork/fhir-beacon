import {DisplayMode} from '../types'

export function toBaseElementModeEnum(value: string | null): DisplayMode {
  return value ? <DisplayMode> value : DisplayMode.display
}
