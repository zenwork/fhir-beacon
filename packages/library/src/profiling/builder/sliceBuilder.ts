import {Builder, Decorateable}                                                                from '../builder/builder.type'
import {Context, Defs, flattenKey, isDefWithChildren, isDefWithConstraints, PropertySliceDef} from '../index'



export function sliceBuilder<T extends Decorateable>(def: PropertySliceDef<T>): Builder<T> {
  let context: Context<T> | null = null

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    build: () => {
      if (context) {

        let ref: Defs<T> | null = null
        if (Array.isArray(def.key)) {
          ref = def.key.reduce((prev, key, index) => {
            if (index == 0 || isDefWithChildren(prev)) {

              let value: Defs<T> | null = null

              if (index === 0) {
                value = prev && prev.subdefs ? prev.subdefs.get(flattenKey(key, def.choice)) || null : context!.def.get(key, def.choice)
                if (!value) throw new Error(`No property ${key} found`)
              } else {
                value = prev && prev.subdefs ? prev.subdefs.get(flattenKey(key)) || null : context!.def.get(key)
              }

              if (value) return value
            }

            return prev
          }, null as unknown as Defs<T>)
        }

        if (ref && isDefWithConstraints(ref) && isDefWithConstraints(def)) {
          ref.constraints = ref.constraints.concat(def.constraints)

        } else {
          throw new Error(`slice must be set on existing property. None found for: ${def.choice}${def.key}`)
        }
      }
    }
  }

  return action
}
