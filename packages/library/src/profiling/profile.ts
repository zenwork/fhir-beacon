import {DatatypeDef}                  from '../DatatypeDef'
import {ResourceDef}                  from '../ResourceDef'
import {Builder, Decorateable}        from './builder/builder.type'
import {DefConstraintAssertion}       from './definition/definition.type'
import {Context, StructureDefinition} from './definition/StructureDefinition'



export type ProfileArgs<T extends Decorateable> = {
  type: ResourceDef | DatatypeDef,
  base?: StructureDefinition<T>,
  constraints?: DefConstraintAssertion<T>[],
  props?: Builder<T>[]
}


/**
 * DSL for creating FHIR profiles
 */
export function profile<T extends Decorateable>({
                            type,
                            base = new StructureDefinition<T>(type),
                            constraints = [],
                            props = []
                           }: ProfileArgs<T>): StructureDefinition<T> {

  if (base.type.value !== type.value) throw new Error(
    `Base name ${base.type.value} does not match name ${type.value}`
  )

  const def: StructureDefinition<T> = base.clone()
  def.type = type
  def.constraints = constraints

  const ctx: Context<T> = new Context<T>(def.type, def)

  props.forEach(f => {
    const action: Builder<T> = f as Builder<T>
    action.setCtx(ctx)
    action.build()
  })

  return def
}
