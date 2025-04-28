import {StructureDefinition}           from '../../profiling/index'
import {DomainResourceData}            from '../resource'
import {FhirElementData}               from './FhirElement.type'
import {Errors, errors, meta, profile} from './Validations.type'



export type MetaDecoration = { hide: boolean }
export type Decoration<T> = { [errors]: Errors, [meta]: MetaDecoration, [profile]?: StructureDefinition<T> }
/**
 * Represents a decorated data object that extends from `FhirElementData`.
 * The `DecoratedData` type adds additional properties to the base `T` object using the index signature.
 * The additional properties can be of any type.
 *
 * @typeparam T - The base data object that extends `FhirElementData`.
 */
export type Decorated<T extends FhirElementData | DomainResourceData> = T & Decoration<T>
