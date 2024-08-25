import {PropertyValues}                    from 'lit'
import {FhirElementData, ValidationErrors} from './fhir-data-element.data'

export interface DataElement<T extends FhirElementData> {
  /**
   * Determines whether fetching data is necessary. Override to fetch data from somewhere else.
   *
   * @return {boolean} Returns true if fetch should happen.
   */
  shouldFetch(changes: PropertyValues): boolean

  /**
   * Retrieves data from the specified data path.
   *
   * @param dataPath - The path to the data to be retrieved.
   * @return The retrieved data.
   */
  fetch(dataPath: string): T

  /**
   * Checks if the system should prepare dats.
   *
   * @return {boolean} - True if the system should prepare, false otherwise.
   */
  shouldPrepare(): boolean

  /**
   * Prepares data
   *
   * @description
   * Called before all data preparation steps are executed
   */
  prepare(): void

  /**
   * Validates the given data.
   *
   * @param {T} data - The data to be validated.
   * @param {boolean} fetched - Flag indicating whether the data was fetched in the `fetch()` call.
   *
   * @return {ValidationErrors} - The validation errors, if any.
   */
  validate(data: T, fetched: boolean): ValidationErrors;

  /**
   * Decorates the given data.
   *
   * @param {T} data - The data to be decorated.
   * @param {ValidationErrors} errors - The validation errors to be included in the decoration.
   * @param {boolean} fetched - Indicates whether the data was fetched.
   * @return {Decorated<T>} - The decorated data object.
   */
  decorate(data: T, errors: ValidationErrors, fetched: boolean): Decorated<T>;

  /**
   * Called after all data preparation steps have completed
   *
   * @param {T} providedData - The data to be checked if it has been prepared.
   * @param {Decorated<T>} decoratedData - The decorated data to be checked.
   *
   * @return {void}
   */
  isPrepared(providedData: T, decoratedData: Decorated<T>): void

}

/**
 * Represents a decorated data object that extends from `FhirElementData`.
 * The `DecoratedData` type adds additional properties to the base `T` object using index signature.
 * The additional properties can be of any type.
 *
 * @typeparam T - The base data object that extends `FhirElementData`.
 */
export type Decorated<T extends FhirElementData> = T & { [key: string | number | symbol]: any }
