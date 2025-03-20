import {Context}      from 'profiling/definition'
import {Action, Prop} from 'profiling/profiling.types'



export function actionWith(kv: Prop): Action {

  let context: Context | null = null
  let optional = false
  let many = false

  const action = {
    setCtx: (ctx) => {context = ctx},
    run: () => {
      kv.key = `${kv.key}`
      let min = kv.cardinality.split('..')[0]
      let max = kv.cardinality.split('..')[1]
      if (optional) min = '0'
      if (many) max = '*'
      const existing: Prop = context.def.get(kv.key)
      if (existing) {
        context.def.set({
                          key: kv.key,
                          type: kv.type ? kv.type : existing.type,
                          bindings: kv.bindings.length > 0 ? kv.bindings : existing.bindings,
                          constraints: kv.constraints.length > 0 ? kv.constraints : existing.constraints,
                          cardinality: min + '..' + max,
                          mustSupport: kv.mustSupport ? kv.mustSupport : existing.mustSupport,
                          isModifier: kv.isModifier ? kv.isModifier : existing.isModifier,
                          isSummary: kv.isSummary ? kv.isSummary : existing.isSummary
                        })
      } else {
        context.def.set({ ...kv, cardinality: min + '..' + max })
      }
    },
    optional: (): Action => {
      optional = true
      return action as unknown as Action
    },
    required: (): Action => {
      optional = false
      return action as unknown as Action
    },
    hasMany: (): Action => {
      many = true
      return action as unknown as Action
    },
    boundBy: (...binding: string[]): Action => {
      kv.bindings = binding
      return action as unknown as Action
    },
    constrainedBy: (constraints: (() => { key: string, error: string })[]): Action => {
      kv.constraints = constraints
      return action as unknown as Action
    },
    mustSupport: (): Action => {
      kv.mustSupport = true
      return action as unknown as Action
    },
    isModifier: (): Action => {
      kv.isModifier = true
      return action as unknown as Action
    },
    isSummary: (): Action => {
      kv.isSummary = true
      return action as unknown as Action
    }
  }

  return action as unknown as Action
}
