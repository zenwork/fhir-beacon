import {FhirDatatypeName}         from '../FhirDatatypeName'
import {FhirPrimitiveName}        from '../FhirPrimitiveName'
import {FhirResourceName}         from '../FhirResourceName'
import {BindingStrength, Example} from './BindingStrength'
import {Definition}               from './definition'
import {Prop}                     from './profiling.types'



export type PropType = FhirPrimitiveName | FhirDatatypeName | FhirResourceName | Definition
export type NarrowableNames = FhirDatatypeName | FhirResourceName
export function prop(key: string,
                     type: PropType,
                     typeNarrowing: NarrowableNames[] = [],
                     cardinality: string = '1..1',
                     bindings: string[] = [],
                     bindingStrength: BindingStrength = Example,
                     constraints: (() => { key: string, error: string })[] = [],
                     mustSupport: boolean | undefined = undefined,
                     isModifier: boolean | undefined = undefined,
                     isSummary: boolean | undefined = undefined): Prop {
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
