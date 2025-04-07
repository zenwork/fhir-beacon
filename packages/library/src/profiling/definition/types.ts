import {CodeIds}         from 'codes'
import {DatatypeName}    from 'DatatypeName'
import {PrimitiveName}   from 'PrimitiveName'
import {ResourceName}    from 'ResourceName'
import {BindingStrength} from '../definition/BindingStrength'



export type TypeName =
  PrimitiveName
  | DatatypeName
  | ResourceName
  | `${DatatypeName}${string}`
  | `${ResourceName}${string}`

export type NarrowableNames = DatatypeName | ResourceName | `${DatatypeName}${string}` | `${ResourceName}${string}`

export type DefConstraintAssertion<T> = (data: T) => ({ success: false, message?: string } | { success: true })

export type SetPropertyDef<T> = {
  choice: string | undefined,
  key: string | string[],
  type: PrimitiveName | DatatypeName | ResourceName | `${DatatypeName}${string}` | `${ResourceName}${string}`,
  typeNarrowing: NarrowableNames[]
  cardinality: string,
  bindings: CodeIds | string[],
  bindingStrength: BindingStrength,
  constraints: DefConstraintAssertion<T>[],
  mustSupport: boolean | undefined,
  isModifier: boolean | undefined,
  isSummary: boolean | undefined,
  subdefs: Map<string, SetPropertyDef<T>> | undefined
}

export type PropertySliceDef<T> = {
  choice: string | undefined,
  key: string | string[],
  type: PrimitiveName | DatatypeName | ResourceName | `${DatatypeName}${string}` | `${ResourceName}${string}`,
  typeNarrowing: NarrowableNames[],
  constraints: DefConstraintAssertion<T>[],

}
