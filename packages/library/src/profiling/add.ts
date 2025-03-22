import {FhirDatatypeNameEnum}  from '../FhirDatatypeEnum'
import {FhirPrimitiveNameEnum} from '../FhirPrimitiveEnum'

import {FhirResourceNameEnum} from '../FhirResourceNameEnum'
import {Definition}           from './definition'
import {prop}                 from './prop'
import {set}                  from './set'



export type Name = FhirPrimitiveNameEnum | FhirDatatypeNameEnum | FhirResourceNameEnum
export type Narrowable = FhirDatatypeNameEnum | FhirResourceNameEnum


export const add = {
  /**
   * @deprecated
   */
  prop: (k, t, s = []) => set(prop(k, t, s)),
  /**
   * @deprecated
   */
  listOf: (k, t) => set(prop(k, t, [], '1..*', [], 'example', [])),
  one: (k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value))),
  minOneOf: (k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '1..*', [], 'example', [])),
  zeroToN: (k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '0..*', [], 'example', [])),
  backboneOf: (props: Definition) =>
    set(prop(props.name, props, [], '1..*', [], 'example', []))
}
