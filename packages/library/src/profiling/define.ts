import {DefineBuilderProps, InternalBuilder} from './define.types'
import {Context, Definition}                 from './definition/definition'



/**
 * Creates or extends a FHIR resource definition with specified properties and constraints.
 *
 * @template T - The type parameter for the resource definition
 * @param {Object} params - The configuration parameters
 * @param {FhirResourceEnum} params.name - The name of the FHIR resource
 * @param {Definition<T>} [params.base] - Base definition to extend from (defaults to new Definition)
 * @param {ConstraintAssertion<T>[]} [params.constraints=[]] - Array of constraint functions
 * @param {Builder<T>[]} [params.props=[]] - Array of property builders to configure the definition
 * @returns {Definition<T>} The configured FHIR resource definition
 *
 * @example
 * const patientDef = define({
 *   name: FhirResourceEnum.Patient,
 *   constraints: [],
 *   props: [
 *     add.oneOf('name', FhirDatatypeNameEnum.HumanName)
 *       .required()
 *       .mustSupport()
 *   ]
 * });
 */
export function define<T>({
                            name,
                            base = new Definition<T>(name),
                            constraints = [],
                            props = []
                          }: DefineBuilderProps<T>): Definition<T> {

  if (base.name.value !== name.value) throw new Error(
    `Base name ${base.name.value} does not match name ${name.value}`
  )

  const def: Definition<T> = base.clone()
  def.name = name
  def.constraints = constraints

  const ctx: Context<T> = new Context<T>(def.name, def)

  props.forEach(f => {
    const action: InternalBuilder<T> = f as InternalBuilder<T>
    action.setCtx(ctx)
    action.run()
  })

  return def
}
