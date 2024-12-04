import {PropertyValues}                          from 'lit'
import {Decorated, FhirElementData, Validations} from './Decorate'

export interface DataHandling<D extends FhirElementData> {
  /**
   * Determines whether the given data is ready to be processed.
   *
   * @description
   * Called before all data preparation steps are executed
   */
  prepare(): Decorated<D>

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
  fetch(dataPath: string): D

  /**
   * Checks if the system should prepare dats.
   *
   * @return {boolean} - True if the system should prepare, false otherwise.
   */
  shouldPrepare(): boolean

  /**
   * Validate element data.
   *
   * @description
   * Validate data to find complex errors not covered by primitive types. Push errors to `this.errors`. it is
   * recommended to call `super.validate(T)` to in add errors to other inherited errors.
   *
   * @param {D} data - The data to be validated.
   * @param {boolean} fetched - Flag indicating whether the data was fetched in the `fetch()` call.
   *
   * @param validations
   * @return {ValidationErrors} - The validation errors, if any.
   */
  validate(data: D, validations: Validations, fetched: boolean): void

  /**
   * implements `convertData()` to modify data before handing rendering. Add data values locally relevant for
   * rendering is probably better than replacing raw data.
   *
   * @param {D} data - The data to be decorated.
   * @param validations
   * @param {boolean} fetched - Indicates whether the data was fetched.
   * @return {Decorated<D>} - The decorated data object.
   */
  decorate(data: Decorated<D>, validations: Validations, fetched: boolean): void

  /**
   * Hook called after all data preparation steps have completed
   *
   * @param {D} providedData - The original data.
   * @param {Decorated<D>} decoratedData - The decorated data to be checked.
   *
   * @return {void}
   */
  isPrepared(providedData: D, decoratedData: Decorated<D>): void

}
