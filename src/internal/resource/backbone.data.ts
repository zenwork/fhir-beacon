import {BaseElementData, Extension} from '../base/base-element.data'

export type BackboneElementData = BaseElementData & {
  modifierExtension: Extension[]
}
