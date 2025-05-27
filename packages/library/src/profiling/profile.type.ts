import {CodeIds}                                                      from '../codes'
import {URI}                                                          from '../components'
import {DatatypeName}                                                 from '../DatatypeName'
import {DomainResourceData}                                           from '../internal'
import {PrimitiveName}                                                from '../PrimitiveName'
import {Choice, Choices}                                              from '../valuesets'
import {Builder, Decorateable, PropertyBuilder, RenderBuilder}        from './builder/builder.type'
import {DefConstraintAssertion, Name, NarrowableDef, NarrowableNames} from './definition/definition.type'
import {StructureDefinition}                                          from './definition/StructureDefinition'
import {BindingStrength}                                              from './util'



export interface Define {
  oneOf: <T extends Decorateable>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  optionOf: <T extends Decorateable>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  choiceOf: <T extends Decorateable>(choice: string, key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  minOneOf: <T extends Decorateable>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  listOf: <T extends Decorateable>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  optionalListOf: <T extends Decorateable>(key: string, typeName: Name, narrowingTypes?: NarrowableDef[]) => PropertyBuilder<T>
  backboneOf: <T extends Decorateable>(key: string, props: StructureDefinition<T>) => PropertyBuilder<T>
  backboneListOf: <T extends Decorateable>(key: string, props: StructureDefinition<T>) => PropertyBuilder<T>
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

  withOne: <T extends Decorateable>(key: string, extension: Extension) => RenderBuilder<T>
  withComplex: <T extends Decorateable>(key: string, extensions: Extensions) => RenderBuilder<T>
  primitive: <T extends Decorateable>(primtiveKey: string, url: string, extension: Extension[]) => RenderBuilder<T>

}

export interface Slice {

  oneFor: <T extends Decorateable>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValue?: unknown[], choice?: string) => Builder<T>
  constraint: <T extends Decorateable>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValue?: unknown[], choice?: string) => Builder<T>

}
