import {DefConstraintAssertion, PropertyDef} from 'profiling/definition/types'
import {CodeIds}                             from '../../codes'
import {Builder}                             from '../define.types'
import {BindingStrength, Example}            from '../definition/BindingStrength'
import {Context}                             from '../definition/StructureDefinition'



export function set<T>(def: PropertyDef<T>): Builder<T> {

  let context: Context<T> | null = null
  let optional = false
  let many = false

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    run: () => {
      def.key = `${def.key}`
      let min = def.cardinality.split('..')[0]
      let max = def.cardinality.split('..')[1]
      if (optional) min = '0'
      if (many) max = '*'
      const existing: PropertyDef<T> | null = context!.def.get(def.choice + def.key)
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
    optional: (): Builder<T> => {
      optional = true
      return action as unknown as Builder<T>
    },
    required: (): Builder<T> => {
      optional = false
      return action as unknown as Builder<T>
    },
    hasMany: (): Builder<T> => {
      many = true
      return action as unknown as Builder<T>
    },
    boundBy: (binding: CodeIds | string[], bindingStrength: BindingStrength = Example): Builder<T> => {
      def.bindings = binding
      def.bindingStrength = bindingStrength
      return action as unknown as Builder<T>
    },
    constrainedBy: (constraints: DefConstraintAssertion<T>[]): Builder<T> => {
      def.constraints = constraints
      return action as unknown as Builder<T>
    },
    mustSupport: (): Builder<T> => {
      def.mustSupport = true
      return action as unknown as Builder<T>
    },
    isModifier: (): Builder<T> => {
      def.isModifier = true
      return action as unknown as Builder<T>
    },
    isSummary: (): Builder<T> => {
      def.isSummary = true
      return action as unknown as Builder<T>
    }
  }

  return action as unknown as Builder<T>
}
