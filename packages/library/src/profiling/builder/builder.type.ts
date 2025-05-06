import {CodeIds}                from '../../codes'
import {Choice, Choices}        from '../../valuesets'
import {Context}                from '../definition'
import {DefConstraintAssertion} from '../definition/definition.type'
import {BindingStrength}        from '../util'



export type Builder<T> = {
  setCtx: (ctx: Context<T>) => void,
  build: () => void
}

export type  PropertyBuilder<T> = Builder<T> & {
  optional: () => PropertyBuilder<T>
  required: () => PropertyBuilder<T>
  hasMany: () => PropertyBuilder<T>
  boundBy: (binding: CodeIds | Choice[] | Choices, strength?: BindingStrength) => PropertyBuilder<T>
  constrainedBy: (constraints: DefConstraintAssertion<T>[]) => PropertyBuilder<T>
  mustSupport: () => PropertyBuilder<T>
  isModifier: () => PropertyBuilder<T>
  isSummary: () => PropertyBuilder<T>
}
