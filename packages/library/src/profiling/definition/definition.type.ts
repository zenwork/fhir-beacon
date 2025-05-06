import {CodeIds}         from '../../codes'
import {DatatypeDef}     from '../../DatatypeDef'
import {DatatypeName}    from '../../DatatypeName'
import {PrimitiveDef}    from '../../PrimitiveDef'
import {PrimitiveName}   from '../../PrimitiveName'
import {ResourceDef}     from '../../ResourceDef'
import {ResourceName}    from '../../ResourceName'
import {Choice, Choices} from '../../valuesets'
import {BindingStrength} from '../util'



export type NarrowableDef = DatatypeDef | ResourceDef


export type TypeName =
  PrimitiveName
  | DatatypeName
  | ResourceName
  | `${DatatypeName}${string}`
  | `${ResourceName}${string}`

export type NarrowableNames = DatatypeName | ResourceName | `${DatatypeName}${string}` | `${ResourceName}${string}`

export type DefConstraintAssertion<T> = (data: T, fixedValue?: any) => ({ success: false, message?: string } | { success: true })

export type Name = PrimitiveDef | DatatypeDef | ResourceDef

export type BackboneName = ResourceDef

export type Defs<T> = PropertyDef<T> | PropertySliceDef<T> | ExtensionDef

export type Def = {
  defType: 'property' | 'extension' | 'property-slice'
  choice: string | undefined,
  key: string | string[],
  subdefs: Map<string, Defs<any>> | undefined
}

export type ExtensionDef = Def & {
  defType: 'extension',
  url: string | string[],
  valueType: PrimitiveName | DatatypeName,
  valueTypeNarrowing: NarrowableNames[]
  cardinality: string,
  isModifier: boolean | undefined,
  isSummary: boolean | undefined
}

// Type guard for ExtensionDef
export function isExtensionDef<T>(def: unknown): def is ExtensionDef {
  return (def as ExtensionDef).defType === 'extension'
}

export type PropertyDef<T> = Def & {
  defType: 'property',
  key: string | string[],
  type: PrimitiveName | DatatypeName | ResourceName | `${DatatypeName}${string}` | `${ResourceName}${string}`,
  typeNarrowing: NarrowableNames[]
  cardinality: string,
  bindings: CodeIds | Choice[] | Choices,
  bindingStrength: BindingStrength,
  constraints: DefConstraintAssertion<T>[],
  mustSupport: boolean | undefined,
  isModifier: boolean | undefined,
  isSummary: boolean | undefined
}

// Type guard for PropertyDef<T>
export function isPropertyDef<T>(def: unknown): def is PropertyDef<T> {
  return (def as PropertyDef<T>).defType === 'property'
}

export type PropertySliceDef<T> = Def & {
  defType: 'property-slice',
  constraints: DefConstraintAssertion<T>[]
}

// Type guard for PropertySliceDef<T>
export function isPropertySliceDef<T>(def: unknown): def is PropertySliceDef<T> {
  return (def as PropertySliceDef<T>).defType === 'property-slice'
}

export function isDefWithChildren<T>(def: unknown): def is { subdefs: Map<string, PropertyDef<T>> } {
  return !!(def as PropertySliceDef<T>).subdefs
}

export function isDefWithConstraints<T>(def: unknown): def is { constraints: DefConstraintAssertion<T>[] } {
  return !!(def as PropertySliceDef<T>).constraints
}
