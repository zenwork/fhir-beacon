import {Context, Definition}         from './definition'
import {DefineProps, InternalAction} from './profiling.types'



export function define({ name, base = new Definition(name, name), props = [] }: DefineProps): Definition {
  const def: Definition = base.clone()
  def.name = name
  const ctx: Context = new Context(name, def.name, def)

  props.forEach(f => {
    const action: InternalAction = f as InternalAction
    action.setCtx(ctx)
    action.run()
  })

  return def
}
