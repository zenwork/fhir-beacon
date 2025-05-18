import {CodeIds}                                                      from '../codes'
import {URI}                                                          from '../components'
import {DatatypeName}                                                 from '../DatatypeName'
import {DomainResourceData}                                           from '../internal'
import {PrimitiveName}                                                from '../PrimitiveName'
import {Choice, Choices}                                              from '../valuesets'
import {Builder, PropertyBuilder}                                     from './builder/builder.type'
import {DefConstraintAssertion, Name, NarrowableDef, NarrowableNames} from './definition/definition.type'
import {StructureDefinition}                                          from './definition/StructureDefinition'
import {BindingStrength}                                              from './util'



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

export type Extension = {
  key?: string,
  url: URI,
  valueType: PrimitiveName | DatatypeName,
  valueTypeNarrowing?: NarrowableNames[],
  bindings?: CodeIds | Choice[] | Choices,
  bindingStrength?: BindingStrength,
  constraints?: DefConstraintAssertion<DomainResourceData>[]
}

export type Extensions = { url: URI, extensions: Extension[] }

export interface Extend {

  withOne: <T>(key: string, extension: Extension) => Builder<T>
  withComplex: <T>(key: string, extensions: Extensions) => Builder<T>
  primitive: <T>(primtiveKey: string, url: string, extension: Extension[]) => Builder<T>
}

export interface Slice {

  oneFor: <T>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValue?: unknown[], choice?: string) => Builder<T>
  constraint: <T>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValue?: unknown[], choice?: string) => Builder<T>
}
