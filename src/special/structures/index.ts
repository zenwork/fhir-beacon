import {BaseData}         from '../../BaseData'
import {IdentifierData}   from '../../data/complex/strucutures/complex'
import {Code, URI, XHTML} from '../../data/primitive/structures'

export type ReferenceData = BaseData & {
  reference?: string
  type?: URI
  identifier?: IdentifierData
  display?: string
}
export type NarrativeData = BaseData & {
  status: Code
  div: XHTML
}
