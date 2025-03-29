import {DatatypeDef}                                          from '../../DatatypeDef'
import {PrimitiveDef}                                         from '../../PrimitiveDef'
import {ResourceDef}                                          from '../../ResourceDef'
import {Example}                                              from '../definition/BindingStrength'
import {Builder, DefConstraintAssertion, StructureDefinition} from '../index'
import {prop}                                                 from './prop'
import {set}                                                  from './set'



export type Name = PrimitiveDef | DatatypeDef | ResourceDef
export type BackboneName = ResourceDef
export type Narrowable = DatatypeDef | ResourceDef

export interface Add {
  oneOf: <T>(key: string, typeName: Name, narrowingTypes?: Narrowable[]) => Builder<T>;
  optionOf: <T>(key: string, typeName: Name, narrowingTypes?: Narrowable[]) => Builder<T>;
  choiceOf: <T>(choice: string, key: string, typeName: Name, narrowingTypes?: Narrowable[]) => Builder<T>;
  minOneOf: <T>(key: string, typeName: Name, narrowingTypes?: Narrowable[]) => Builder<T>;
  listOf: <T>(key: string, typeName: Name, narrowingTypes?: Narrowable[]) => Builder<T>;
  optionalListOf: <T>(key: string, typeName: Name, narrowingTypes?: Narrowable[]) => Builder<T>;
  backboneOf: <T>(key: string, props: StructureDefinition<T>) => Builder<T>;
  backboneListOf: <T>(key: string, props: StructureDefinition<T>) => Builder<T>;
}


export const add: Add = {

  oneOf: <T>(k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '1..1', [], Example, [] as DefConstraintAssertion<T>[])),

  optionOf: <T>(k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '0..1', [], Example, [] as DefConstraintAssertion<T>[])),


  choiceOf: <T>(choice: string, k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '0..1', [], Example, [] as DefConstraintAssertion<T>[], choice)),

  minOneOf: <T>(k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '1..*', [], Example, [] as DefConstraintAssertion<T>[])),

  listOf: <T>(k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '1..*', [], Example, [] as DefConstraintAssertion<T>[])),

  optionalListOf: <T>(k: string, t: Name, s: Narrowable[] = []) =>
    set(prop(k, t.value, s.map(v => v.value), '0..*', [], Example, [] as DefConstraintAssertion<T>[])),

  backboneOf: <T>(key: string, def: StructureDefinition<T>) =>
    set(prop(key, def.type.value, [], '1..1', [], Example, [] as DefConstraintAssertion<T>[], undefined, def.props)),

  backboneListOf: <T>(key: string, def: StructureDefinition<T>) =>
    set(prop(key, def.type.value, [], '1..*', [], Example, [] as DefConstraintAssertion<T>[], undefined, def.props))


}
