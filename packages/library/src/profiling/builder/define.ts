import {StructureDefinition}                         from '../definition'
import {DefConstraintAssertion, Name, NarrowableDef} from '../definition/definition.type'
import {Define}                                      from '../profile.type'
import {Example}                                     from '../util/BindingStrength'
import {definitionBuilder}                           from './definitionBuilder'
import {definitionProperty}                          from './definitionProperty'



export const define: Define = {

  oneOf: <T>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '1..1', [], Example, [] as DefConstraintAssertion<T>[])),

  optionOf: <T>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '0..1', [], Example, [] as DefConstraintAssertion<T>[])),


  choiceOf: <T>(choice: string, k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '0..1', [], Example, [] as DefConstraintAssertion<T>[], choice)),

  minOneOf: <T>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '1..*', [], Example, [] as DefConstraintAssertion<T>[])),

  listOf: <T>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '1..*', [], Example, [] as DefConstraintAssertion<T>[])),

  optionalListOf: <T>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '0..*', [], Example, [] as DefConstraintAssertion<T>[])),

  backboneOf: <T>(key: string, def: StructureDefinition<T>) =>
    definitionBuilder(definitionProperty(key, def.type.value, [], '1..1', [], Example, [] as DefConstraintAssertion<T>[], undefined, def.props)),

  backboneListOf: <T>(key: string, def: StructureDefinition<T>) =>
    definitionBuilder(definitionProperty(key, def.type.value, [], '1..*', [], Example, [] as DefConstraintAssertion<T>[], undefined, def.props))


}
