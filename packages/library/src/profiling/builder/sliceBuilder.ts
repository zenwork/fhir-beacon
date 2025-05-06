import {Builder}                                            from '../builder/builder.type'
import {Context, flattenKey, PropertyDef, PropertySliceDef} from '../index'



export function sliceBuilder<T>(def: PropertySliceDef<T>): Builder<T> {
  let context: Context<T> | null = null

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    build: () => {
      if (context) {

        let ref: PropertyDef<T> | null = null
        if (Array.isArray(def.key)) {
          ref = def.key.reduce((prev, key, index) => {
            let value: PropertyDef<T> | null = null
            if (index === 0) {
              value = prev && prev.subdefs ? prev.subdefs.get(flattenKey(key, def.choice)) || null : context!.def.get(key, def.choice)
              if (!value) throw new Error(`No property ${key} found`)
            } else {
              value = prev && prev.subdefs ? prev.subdefs.get(flattenKey(key)) || null : context!.def.get(key)
            }

            if (value) return value
            return prev
          }, null as unknown as PropertyDef<T>)
        }

        if (ref) {
          ref.constraints = ref.constraints.concat(def.constraints)
          // context.def.set(ref)
        } else {
          throw new Error(`slice must be set on existing property. None found for: ${def.choice}${def.key}`)
        }
      }
    }
  }

  return action
}
