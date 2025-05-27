import {StructureDefinition}                         from '../definition'
import {DefConstraintAssertion, Name, NarrowableDef} from '../definition/definition.type'
import {Define}                                      from '../profile.type'
import {Example}                                     from '../util/BindingStrength'
import {Decorateable}                                from './builder.type'
import {definitionBuilder}                           from './definitionBuilder'
import {definitionProperty}                          from './definitionProperty'



export const define: Define = {

  oneOf: <T extends Decorateable>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '1..1', [], Example, [] as DefConstraintAssertion<T>[])),

  optionOf: <T extends Decorateable>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '0..1', [], Example, [] as DefConstraintAssertion<T>[])),


  choiceOf: <T extends Decorateable>(choice: string, k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '0..1', [], Example, [] as DefConstraintAssertion<T>[], choice)),

  minOneOf: <T extends Decorateable>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '1..*', [], Example, [] as DefConstraintAssertion<T>[])),

  listOf: <T extends Decorateable>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '1..*', [], Example, [] as DefConstraintAssertion<T>[])),

  optionalListOf: <T extends Decorateable>(k: string, t: Name, s: NarrowableDef[] = []) =>
    definitionBuilder(definitionProperty(k, t.value, s.map(v => v.value), '0..*', [], Example, [] as DefConstraintAssertion<T>[])),

  backboneOf: <T extends Decorateable>(key: string, def: StructureDefinition<T>) =>
    definitionBuilder(definitionProperty(key, def.type.value, [], '1..1', [], Example, [] as DefConstraintAssertion<T>[], undefined, def.props)),

  backboneListOf: <T extends Decorateable>(key: string, def: StructureDefinition<T>) =>
    definitionBuilder(definitionProperty(key, def.type.value, [], '1..*', [], Example, [] as DefConstraintAssertion<T>[], undefined, def.props))


}
