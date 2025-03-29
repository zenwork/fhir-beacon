import {ResourceDef}                  from '../ResourceDef'
import {CodeIds}                      from '../codes'
import {BindingStrength}              from './definition/BindingStrength'
import {Context, StructureDefinition} from './definition/StructureDefinition'
import {DefConstraintAssertion}       from './definition/types'



export type  Builder<T> = {
  optional: () => Builder<T>
  required: () => Builder<T>
  hasMany: () => Builder<T>
  boundBy: (binding: CodeIds | string[], strength?: BindingStrength) => Builder<T>
  constrainedBy: (constraints: DefConstraintAssertion<T>[]) => Builder<T>
  mustSupport: () => Builder<T>
  isModifier: () => Builder<T>
  isSummary: () => Builder<T>
}

export type InternalBuilder<T> = Builder<T> & {
  setCtx: (ctx: Context<T>) => void,
  run: () => void
}

export type DefineBuilderProps<T> = {
  type: ResourceDef,
  base?: StructureDefinition<T>,
  constraints?: DefConstraintAssertion<T>[],
  props?: Builder<T>[]
}
