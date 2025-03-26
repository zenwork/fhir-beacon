import {Context, Definition}         from './definition'
import {DefineProps, InternalAction} from './profiling.types'



export function define({ name, base = new Definition(name), props = [] }: DefineProps): Definition {
  if (base.name.value !== name.value) throw new Error(
    `Base name ${base.name.value} does not match name ${name.value}`
  )
  const def: Definition = base.clone()
  def.name = name
  const ctx: Context = new Context(def.name, def)

  props.forEach(f => {
    const action: InternalAction = f as InternalAction
    action.setCtx(ctx)
    action.run()
  })

  return def
}
