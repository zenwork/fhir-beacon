import {CodeIds}                   from '../../codes/types'
import {Code, CodeableConceptData} from '../../components'
import {Choices}                   from '../../valuesets/ValueSet.data'
import {FqkMap}                    from './DeepKeyMap'



export const errors = Symbol('errors')
export const meta = Symbol('metadata')

export type KeyBase = string
export type KeyIndex = number

export type SingleKey = KeyBase
export type IndexedKey = `${KeyBase}::${KeyIndex}`

export type ErrorNodeKey = { node: '_root' | SingleKey | IndexedKey, index?: number }
export type ErrorMessage = { message: string }

export type FullyQualifiedKey = { path: ErrorNodeKey[], key?: SingleKey | IndexedKey, index?: number }
export type Errors = FqkMap

export type ValidationErrors = { [key: SingleKey | IndexedKey]: string }

export type KeyErrorPair = { fqk: FullyQualifiedKey } & ErrorMessage

export type CodeIdPair = { code: Code | Code[] | undefined, id: CodeIds }

export type CodeableConceptIdPair = {
  concept: CodeableConceptData | CodeableConceptData[] | undefined,
  bindingId: CodeIds
}

export interface Validations {

  msgFor(key: FullyQualifiedKey | string, delimiter?: string): string | undefined
  mapForAll(): FqkMap

  sliceForFQK(key: FullyQualifiedKey): FqkMap
  has(path: FullyQualifiedKey): boolean
  add(err: KeyErrorPair): void
  rm(key: FullyQualifiedKey): boolean
  rmAll(): boolean
  all(): KeyErrorPair[]

  inspectCode(props: { node: string } & CodeIdPair): boolean
  inspectCodeableConcept(props: { node: string } & CodeableConceptIdPair): void

  choices(id: CodeIds): Choices
}
