import {FhirElementData} from './data/fhir-data-element.data'

/**
 * Represents a decorated data object that extends from `FhirElementData`.
 * The `DecoratedData` type adds additional properties to the base `T` object using index signature.
 * The additional properties can be of any type.
 *
 * @typeparam T - The base data object that extends `FhirElementData`.
 */
export type Decorated<T extends FhirElementData> = T & { [key: string | number | symbol]: any }
