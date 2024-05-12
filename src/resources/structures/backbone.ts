import {BaseData}                                    from '../../BaseData'
import {CodeableConceptData, QuantityData}           from '../../data/structures/complex'
import {CodeableReferenceData, Extension, Ratiodata} from './index'

export type BackboneElement = BaseData & {
  modifierExtension: Extension[]
}

export type Ingredient = BackboneElement & {
  item: CodeableReferenceData,
  isActive?: boolean
} & {
  strengthRatio?: Ratiodata
} | {
  strengthCodeableConcept?: CodeableConceptData
} | {
  strengthQuantity?: QuantityData
}
