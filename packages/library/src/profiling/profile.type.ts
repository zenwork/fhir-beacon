import {URI}                                         from '../components'
import {DatatypeName}                                from '../DatatypeName'
import {PrimitiveName}                               from '../PrimitiveName'
import {Builder, PropertyBuilder}                    from './builder/builder.type'
import {DefConstraintAssertion, Name, NarrowableDef} from './definition/definition.type'
import {StructureDefinition}                         from './definition/StructureDefinition'



export interface Define {
  oneOf: <T>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  optionOf: <T>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  choiceOf: <T>(choice: string, key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  minOneOf: <T>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  listOf: <T>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  optionalListOf: <T>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  backboneOf: <T>(key: string, props: StructureDefinition<T>) => PropertyBuilder<T>
  backboneListOf: <T>(key: string, props: StructureDefinition<T>) => PropertyBuilder<T>
}

export interface Extend {
  withSimple: <T>(url: URI, valueType: PrimitiveName | DatatypeName) => Builder<T>
  withComplex: <T>(url: URI, extensions: StructureDefinition<T>) => Builder<T>
}

export interface Slice {

  oneFor: <T>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValue?: unknown[], choice?: string) => Builder<T>

  constraint: <T>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValue?: unknown[], choice?: string) => Builder<T>
}
