import {BaseData}  from '../../internal/base/BaseData'
import {Extension} from './index'

export type BackboneElementData = BaseData & {
  modifierExtension: Extension[]
}
