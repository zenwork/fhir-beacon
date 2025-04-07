import {BindingStrength, Context, InternalPropertyBuilder, PropertySliceDef, SetPropertyDef} from '../index'



export function setSlice<T>(def: PropertySliceDef<T>): InternalPropertyBuilder<T> {
  let context: Context<T> | null = null

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    run: () => {
      if (context) {
        const key: any = Array.isArray(def.key) ? def.key[0] : def.key
        const existingBase: SetPropertyDef<T> | null = context!.def.get(key, def.choice)
        if (!existingBase) throw new Error(`No property ${key} found`)

        const existing: SetPropertyDef<T> | null = context!.def.get(def.key, def.choice)

        if (existing) {
          existing.constraints = existing.constraints.concat(def.constraints)
          context.def.set(existing)
        } else {
          context.def.set({
                            ...def,
                            cardinality: '1..1',
                            bindings: [],
                            bindingStrength: BindingStrength.Example,
                            isModifier: undefined,
                            mustSupport: undefined,
                            isSummary: undefined,
                            subdefs: undefined
                          })
        }
      }
    }
  }

  return action
}
