import {DefConstraintAssertion}       from 'profiling/definition/index'
import {ResourceDef}                  from 'ResourceDef'
import {InternalPropertyBuilder}      from './define.types'
import {Context, StructureDefinition} from './definition/StructureDefinition'



export type DefineArgs<T> = {
  type: ResourceDef,
  base?: StructureDefinition<T>,
  constraints?: DefConstraintAssertion<T>[],
  props?: InternalPropertyBuilder<T>[]
}


/**
 * Creates or extends a FHIR resource definition with specified properties and constraints.
 *
 * @template T - The type parameter for the resource definition
 * @param {Object} params - The configuration parameters
 * @param {FhirResourceEnum} params.name - The name of the FHIR resource
 * @param {StructureDefinition<T>} [params.base] - Base definition to extend from (defaults to new Definition)
 * @param {ConstraintAssertion<T>[]} [params.constraints=[]] - Array of constraint functions
 * @param {Builder<T>[]} [params.props=[]] - Array of property builders to configure the definition
 * @returns {StructureDefinition<T>} The configured FHIR resource definition
 *
 * @example
 * const patientDef = define({
 *   name: ResourceDef.Patient,
 *   constraints: [],
 *   props: [
 *     add.oneOf('name', FhirDatatypeNameEnum.HumanName)
 *       .required()
 *       .mustSupport()
 *   ]
 * });
 */
export function define<T>({
                            type,
                            base = new StructureDefinition<T>(type),
                            constraints = [],
                            props = []
                          }: DefineArgs<T>): StructureDefinition<T> {

  if (base.type.value !== type.value) throw new Error(
    `Base name ${base.type.value} does not match name ${type.value}`
  )

  const def: StructureDefinition<T> = base.clone()
  def.type = type
  def.constraints = constraints

  const ctx: Context<T> = new Context<T>(def.type, def)

  props.forEach(f => {
    const action: InternalPropertyBuilder<T> = f as InternalPropertyBuilder<T>
    action.setCtx(ctx)
    action.run()
  })

  return def
}
