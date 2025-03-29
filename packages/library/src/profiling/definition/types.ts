import {FhirDatatypeName}  from 'FhirDatatypeName'
import {FhirPrimitiveName} from 'FhirPrimitiveName'
import {FhirResourceName}  from 'FhirResourceName'
import {CodeIds}           from 'codes'
import {NarrowableNames}   from 'profiling/builder/prop'
import {BindingStrength}   from 'profiling/definition/BindingStrength'
import {Definition}        from 'profiling/definition/definition'



export type DefConstraintAssertion<T> = (data: T) => ({ success: false, message?: string } | { success: true })

export type DefProperty<T> = {
  key: string,
  type: FhirPrimitiveName | FhirDatatypeName | FhirResourceName | Definition<T>,
  typeNarrowing: NarrowableNames[]
  cardinality: string,
  bindings: CodeIds | string[],
  bindingStrength: BindingStrength,
  constraints: DefConstraintAssertion<T>[],
  mustSupport: boolean | undefined,
  isModifier: boolean | undefined,
  isSummary: boolean | undefined,
}
