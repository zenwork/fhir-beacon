import {BaseData}                                    from '../../BaseData'
import {CodeableConceptData, QuantityData}           from '../../data/complex/strucutures/complex'
import {ReferenceData}                               from '../../special/structures'
import {CodeableReferenceData, Extension, Ratiodata} from './index'

export type BackboneElement = BaseData & {
  modifierExtension: Extension[]
}

export type MedicationIngredientData = BackboneElement & {
  item: CodeableReferenceData,
  isActive?: boolean
  strengthRatio?: Ratiodata
  strengthCodeableConcept?: CodeableConceptData
  strengthQuantity?: QuantityData
}

export type SubstanceIngredientData = BackboneElement & {
  quantity?: Ratiodata
  substance: CodeableReferenceData | ReferenceData  // substance resource reference
}
