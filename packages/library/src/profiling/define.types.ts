import {CodeIds}                from '../codes'
import {BindingStrength}        from './definition/BindingStrength'
import {Context}                from './definition/StructureDefinition'
import {DefConstraintAssertion} from './definition/types'



export type InternalPropertyBuilder<T> = {
  setCtx: (ctx: Context<T>) => void,
  run: () => void
}

export type  PropertyBuilder<T> = InternalPropertyBuilder<T> & {
  optional: () => PropertyBuilder<T>
  required: () => PropertyBuilder<T>
  hasMany: () => PropertyBuilder<T>
  boundBy: (binding: CodeIds | string[], strength?: BindingStrength) => PropertyBuilder<T>
  constrainedBy: (constraints: DefConstraintAssertion<T>[]) => PropertyBuilder<T>
  mustSupport: () => PropertyBuilder<T>
  isModifier: () => PropertyBuilder<T>
  isSummary: () => PropertyBuilder<T>
}
