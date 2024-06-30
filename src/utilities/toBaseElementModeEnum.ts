import {DisplayMode} from '../internal/base/base-element.data'

export function toBaseElementModeEnum(value: string | null): DisplayMode {
  return value ? <DisplayMode> value : DisplayMode.display
}
