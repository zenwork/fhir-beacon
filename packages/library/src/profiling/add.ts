import {FhirDatatypeNameEnum}  from '../FhirDatatypeEnum'
import {FhirPrimitiveNameEnum} from '../FhirPrimitiveEnum'
import {FhirResourceEnum}      from '../FhirResourceEnum'
import {Example}               from './BindingStrength'
import {Definition}            from './definition'
import {prop}                  from './prop'
import {set}                   from './set'



export type Name = FhirPrimitiveNameEnum | FhirDatatypeNameEnum | FhirResourceEnum
export type Narrowable = FhirDatatypeNameEnum | FhirResourceEnum


export const add = {


  oneOf: (k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value))),
  minOneOf: (k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '1..*', [], Example, [])),
  listOf: (k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '0..*', [], Example, [])),
  backboneOf: (props: Definition) =>
    set(prop(String(props.name), props, [], '1..*', [], Example, []))
}
