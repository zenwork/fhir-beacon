import {BindingStrength, Example}                                          from '../definition/BindingStrength'
import {DefConstraintAssertion, NarrowableNames, SetPropertyDef, TypeName} from '../definition/types'



export function prop<T>(key: string | string[],
                        typeName: TypeName,
                        typeNarrowing: NarrowableNames[] = [],
                        cardinality: string = '1..1',
                        bindings: string[] = [],
                        bindingStrength: BindingStrength = Example,
                        constraints: DefConstraintAssertion<T>[] = [],
                        choice: string | undefined = undefined,
                        subdefs: Map<string, SetPropertyDef<T>> | undefined = undefined,
                        mustSupport: boolean | undefined = undefined,
                        isModifier: boolean | undefined = undefined,
                        isSummary: boolean | undefined = undefined
): SetPropertyDef<T> {

  // @ts-ignore
  constraints.forEach(c => c._constraintType = 'prop-constraint')

  return {
    key,
    type: typeName,
    typeNarrowing,
    cardinality,
    bindings,
    bindingStrength,
    constraints,
    choice,
    mustSupport,
    isModifier,
    isSummary,
    subdefs
  }

}
