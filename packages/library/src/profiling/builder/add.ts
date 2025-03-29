import {FhirDatatypeNameEnum}   from '../../FhirDatatypeEnum'
import {FhirPrimitiveNameEnum}  from '../../FhirPrimitiveEnum'
import {FhirResourceEnum}       from '../../FhirResourceEnum'
import {Example}                from '../definition/BindingStrength'
import {Definition}             from '../definition/definition'
import {DefConstraintAssertion} from '../index'
import {prop}                   from './prop'
import {set}                    from './set'



export type Name = FhirPrimitiveNameEnum | FhirDatatypeNameEnum | FhirResourceEnum
export type Narrowable = FhirDatatypeNameEnum | FhirResourceEnum


export const add = {

  oneOf: <T>(k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '1..1', [], Example, [] as DefConstraintAssertion<T>[])),
  minOneOf: (k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '1..*', [], Example, [])),
  listOf: <T>(k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '0..*', [], Example, [] as DefConstraintAssertion<T>[])),
  backboneOf: <T>(props: Definition<T>) =>
    set(prop(String(props.name), props, [], '1..*', [], Example, []))
}
