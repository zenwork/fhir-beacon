import {DomainResourceData}   from '../resource'
import {FhirElementData}      from './FhirElement.type'
import {Errors, errors, meta} from './Validations.type'



export type MetaDecoration = { hide: boolean }
export type Decoration = { [errors]: Errors, [meta]: MetaDecoration }
/**
 * Represents a decorated data object that extends from `FhirElementData`.
 * The `DecoratedData` type adds additional properties to the base `T` object using index signature.
 * The additional properties can be of any type.
 *
 * @typeparam T - The base data object that extends `FhirElementData`.
 */
export type Decorated<T extends FhirElementData | DomainResourceData> = T & Decoration
