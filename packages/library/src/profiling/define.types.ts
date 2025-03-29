import {DefConstraintAssertion} from 'profiling/definition/types'
import {FhirResourceEnum}       from '../FhirResourceEnum'
import {CodeIds}                from '../codes'
import {BindingStrength}        from './definition/BindingStrength'
import {Context, Definition}    from './definition/definition'



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
  name: FhirResourceEnum,
  base?: Definition<T>,
  constraints?: DefConstraintAssertion<T>[],
  props?: Builder<T>[]
}
