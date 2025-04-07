import {DefConstraintAssertion, SetPropertyDef} from 'profiling/definition/types'
import {CodeIds}                                from '../../codes'
import {PropertyBuilder}                        from '../define.types'
import {BindingStrength, Example}               from '../definition/BindingStrength'
import {Context}                                from '../definition/StructureDefinition'



export function set<T>(def: SetPropertyDef<T>): PropertyBuilder<T> {

  let context: Context<T> | null = null
  let optional = false
  let many = false

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    run: () => {
      let min = def.cardinality.split('..')[0]
      let max = def.cardinality.split('..')[1]
      if (optional) min = '0'
      if (many) max = '*'
      const existing: SetPropertyDef<T> | null = context!.def.get(def.key, def.choice)
      if (existing && context) {
        context.def.set({
                          key: def.key,
                          type: def.type ? def.type : existing.type,
                          bindings: (def.bindings && Array.isArray(def.bindings) && def.bindings.length > 0)
                                    || def.bindings
                                    ? def.bindings
                                    : existing.bindings,
                          bindingStrength: def.bindingStrength ? def.bindingStrength : existing.bindingStrength,
                          constraints: def.constraints.length > 0 ? def.constraints : existing.constraints,
                          choice: def.choice ? def.choice : existing.choice,
                          cardinality: min + '..' + max,
                          mustSupport: def.mustSupport ? def.mustSupport : existing.mustSupport,
                          isModifier: def.isModifier ? def.isModifier : existing.isModifier,
                          isSummary: def.isSummary ? def.isSummary : existing.isSummary,
                          typeNarrowing: def.typeNarrowing ? def.typeNarrowing : existing.typeNarrowing,
                          subdefs: def.subdefs ? def.subdefs : existing.subdefs
                        })
      } else if (context) {
        // console.log(def)
        context.def.set({ ...def, cardinality: min + '..' + max })
      }
    },
    optional: (): PropertyBuilder<T> => {
      optional = true
      return action as unknown as PropertyBuilder<T>
    },
    required: (): PropertyBuilder<T> => {
      optional = false
      return action as unknown as PropertyBuilder<T>
    },
    hasMany: (): PropertyBuilder<T> => {
      many = true
      return action as unknown as PropertyBuilder<T>
    },
    boundBy: (binding: CodeIds | string[], bindingStrength: BindingStrength = Example): PropertyBuilder<T> => {
      def.bindings = binding
      def.bindingStrength = bindingStrength
      return action as unknown as PropertyBuilder<T>
    },
    constrainedBy: (constraints: DefConstraintAssertion<T>[]): PropertyBuilder<T> => {
      // @ts-ignore
      constraints.forEach(c => c._constraintType = 'prop-constraint')
      def.constraints = constraints
      return action as unknown as PropertyBuilder<T>
    },
    mustSupport: (): PropertyBuilder<T> => {
      def.mustSupport = true
      return action as unknown as PropertyBuilder<T>
    },
    isModifier: (): PropertyBuilder<T> => {
      def.isModifier = true
      return action as unknown as PropertyBuilder<T>
    },
    isSummary: (): PropertyBuilder<T> => {
      def.isSummary = true
      return action as unknown as PropertyBuilder<T>
    }
  }

  return action as unknown as PropertyBuilder<T>
}
