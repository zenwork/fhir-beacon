import {CodeIds}                                                        from '../../codes/index'
import {Choice, Choices}                                                from '../../valuesets/index'
import {DefConstraintAssertion, NarrowableNames, PropertyDef, TypeName} from '../definition/definition.type'
import {BindingStrength, Example}                                       from '../util/BindingStrength'



export function definitionProperty<T>(key: string | string[],
                                      typeName: TypeName,
                                      typeNarrowing: NarrowableNames[] = [],
                                      cardinality: string = '1..1',
                                      bindings: CodeIds | Choice[] | Choices = [],
                                      bindingStrength: BindingStrength = Example,
                                      constraints: DefConstraintAssertion<T>[] = [],
                                      choice: string | undefined = undefined,
                                      subdefs: Map<string, PropertyDef<T>> | undefined = undefined,
                                      mustSupport: boolean | undefined = undefined,
                                      isModifier: boolean | undefined = undefined,
                                      isSummary: boolean | undefined = undefined
): PropertyDef<T> {

  // @ts-ignore
  constraints.forEach(c => c._constraintType = 'prop-constraint')

  return {
    defType: 'property',
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
