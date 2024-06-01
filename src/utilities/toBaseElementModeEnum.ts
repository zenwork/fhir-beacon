import {BaseElementMode} from '../internal/base/base-element.data'

export function toBaseElementModeEnum(value: string | null): BaseElementMode {
  return value ? <BaseElementMode>value : BaseElementMode.display
}
