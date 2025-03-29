import {DefConstraintAssertion, DefProperty} from 'profiling/definition/types'
import {FhirDatatypeName}                    from '../../FhirDatatypeName'
import {FhirPrimitiveName}                   from '../../FhirPrimitiveName'
import {FhirResourceName}                    from '../../FhirResourceName'
import {BindingStrength, Example}            from '../definition/BindingStrength'
import {Definition}                          from '../definition/definition'



export type PropType<T> = FhirPrimitiveName | FhirDatatypeName | FhirResourceName | Definition<T>
export type NarrowableNames = FhirDatatypeName | FhirResourceName
export function prop<T>(key: string,
                        type: PropType<T>,
                     typeNarrowing: NarrowableNames[] = [],
                     cardinality: string = '1..1',
                     bindings: string[] = [],
                     bindingStrength: BindingStrength = Example,
                        constraints: DefConstraintAssertion<T>[] = [],
                     mustSupport: boolean | undefined = undefined,
                     isModifier: boolean | undefined = undefined,
                        isSummary: boolean | undefined = undefined): DefProperty<T> {
  return {
    key,
    type,
    typeNarrowing,
    cardinality,
    bindings,
    bindingStrength,
    constraints,
    mustSupport,
    isModifier,
    isSummary
  }
}
