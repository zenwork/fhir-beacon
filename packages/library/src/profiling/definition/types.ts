import {DatatypeName}    from 'DatatypeName'
import {PrimitiveName}   from 'PrimitiveName'
import {ResourceName}    from 'ResourceName'
import {CodeIds}         from 'codes'
import {BindingStrength} from '../definition/BindingStrength'



export type TypeName =
  PrimitiveName
  | DatatypeName
  | ResourceName
  | `${DatatypeName}${string}`
  | `${ResourceName}${string}`

export type NarrowableNames = DatatypeName | ResourceName | `${DatatypeName}${string}` | `${ResourceName}${string}`

export type DefConstraintAssertion<T> = (data: T) => ({ success: false, message?: string } | { success: true })

export type PropertyDef<T> = {
  key: string,
  type: PrimitiveName | DatatypeName | ResourceName | `${DatatypeName}${string}` | `${ResourceName}${string}`,
  typeNarrowing: NarrowableNames[]
  cardinality: string,
  bindings: CodeIds | string[],
  bindingStrength: BindingStrength,
  constraints: DefConstraintAssertion<T>[],
  choice: string | undefined,
  mustSupport: boolean | undefined,
  isModifier: boolean | undefined,
  isSummary: boolean | undefined,
  subdefs: Map<string, PropertyDef<T>> | undefined
}
