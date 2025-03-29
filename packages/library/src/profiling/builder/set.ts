import {DefConstraintAssertion, DefProperty} from 'profiling/definition/types'
import {CodeIds}                             from '../../codes'
import {Builder}                             from '../define.types'
import {BindingStrength, Example}            from '../definition/BindingStrength'
import {Context}                             from '../definition/definition'



export function set<T>(kv: DefProperty<T>): Builder<T> {

  let context: Context<T> | null = null
  let optional = false
  let many = false

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    run: () => {
      kv.key = `${kv.key}`
      let min = kv.cardinality.split('..')[0]
      let max = kv.cardinality.split('..')[1]
      if (optional) min = '0'
      if (many) max = '*'
      const existing: DefProperty<T> | null = context!.def.get(kv.key)
      if (existing && context) {
        context.def.set({
                          key: kv.key,
                          type: kv.type ? kv.type : existing.type,
                          bindings: (kv.bindings && Array.isArray(kv.bindings) && kv.bindings.length > 0) || kv.bindings
                                    ? kv.bindings
                                    : existing.bindings,
                          bindingStrength: kv.bindingStrength ? kv.bindingStrength : existing.bindingStrength,
                          constraints: kv.constraints.length > 0 ? kv.constraints : existing.constraints,
                          cardinality: min + '..' + max,
                          mustSupport: kv.mustSupport ? kv.mustSupport : existing.mustSupport,
                          isModifier: kv.isModifier ? kv.isModifier : existing.isModifier,
                          isSummary: kv.isSummary ? kv.isSummary : existing.isSummary,
                          typeNarrowing: kv.typeNarrowing ? kv.typeNarrowing : existing.typeNarrowing
                        })
      } else if (context) {
        context.def.set({ ...kv, cardinality: min + '..' + max })
      }
    },
    optional: (): Builder<T> => {
      optional = true
      return action as unknown as Builder<T>
    },
    required: (): Builder<T> => {
      optional = false
      return action as unknown as Builder<T>
    },
    hasMany: (): Builder<T> => {
      many = true
      return action as unknown as Builder<T>
    },
    boundBy: (binding: CodeIds | string[], bindingStrength: BindingStrength = Example): Builder<T> => {
      kv.bindings = binding
      kv.bindingStrength = bindingStrength
      return action as unknown as Builder<T>
    },
    constrainedBy: (constraints: DefConstraintAssertion<T>[]): Builder<T> => {
      kv.constraints = constraints
      return action as unknown as Builder<T>
    },
    mustSupport: (): Builder<T> => {
      kv.mustSupport = true
      return action as unknown as Builder<T>
    },
    isModifier: (): Builder<T> => {
      kv.isModifier = true
      return action as unknown as Builder<T>
    },
    isSummary: (): Builder<T> => {
      kv.isSummary = true
      return action as unknown as Builder<T>
    }
  }

  return action as unknown as Builder<T>
}
