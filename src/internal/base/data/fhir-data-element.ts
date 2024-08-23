import {LitElement, PropertyValues}                   from 'lit'
import {property, state}                              from 'lit/decorators.js'
import {DataContextConsumerController}                from '../../contexts/context-consumer-controller'
import {FhirDataContext}                              from '../../contexts/FhirContextData'
import {FhirElementData, NoDataSet, ValidationErrors} from './fhir-data-element.data'

export type FhirDataDecoration = { [key: string | number | symbol]: any }

/**
 * Abstract class representing a FHIR data element. It extends LitElement.
 *
 * @template T - The type of the base element data.
 */
export abstract class FhirDataElement<T extends FhirElementData> extends LitElement {

  /**
   * The key the element is known as in its parent data strucuture
   *
   * @type {string}
   * @default ''
   */
  @property({ reflect: true })
  public key: string = ''
  /**
   * Element data
   */
  // TODO: might be better to use data-fhir and comply with the data-* standard. see: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
  @property({ type: Object, attribute: 'data' })
  public data: T = NoDataSet as T
  /**
   * FHIR type.
   *
   * @typedef {string} MyString
   */
  @state()
  protected declare readonly type: string
  //------------------------------------------------//
  /**
   * The extendedData variable is used to store additional data of type T and an empty object type {}.
   * It can also hold a null value.
   *
   * @type {T & {} | null}
   */
  @state()
  protected extendedData: T & FhirDataDecoration | null = null

  //------------------------------------------------//
  /**
   * Variable #errors represents an array of validation errors.
   * It is of type ValidationErrors, which is an alias for an array of objects representing validation errors.
   * Each validation error object should have properties with information about the error.
   *
   * Example validation error object properties:
   * - field: Represents the field name or identifier associated with the error.
   * - message: Represents the error message describing the validation error.
   * - code: Represents a unique error code associated with the validation error (optional).
   *
   * Usage:
   * const errors = [
   *   { id: 'username', err: 'Invalid username' },
   *   { id: 'password', err: 'Password is required', code: 'PASSWORD_REQUIRED' },
   *   { id: 'password', err: 'Password must be at least 8 characters long' }
   * ];
   *
   * @type {ValidationErrors} An array of objects representing validation errors.
   */
  #errors: ValidationErrors = []

  @property({ type: String, attribute: 'data-path' })
  public declare dataPath: string

  @state()
  private declare dataContext: FhirDataContext

  //------------------------------------------------//
  #fetched: boolean = false

  //------------------------------------------------//

  protected constructor(type: string) {
    super()
    this.type = type
    new DataContextConsumerController(this)
  }

  /**
   * Determines whether the given data is ready to be processed.
   *
   * @param data - The data to be checked.
   *
   * @return - This method does not return any value.
   */
  protected abstract willReady(): void

  /**
   * Determines whether fetching data is necessary. Override to fetch data from somewhere else.
   *
   * @return {boolean} Returns true if fetch should happen.
   */
  protected shouldFetch(): boolean {
    return !!this.dataContext && !!this.dataPath
  }

  /**
   * Retrieves data from the specified data path.
   *
   * @param dataPath - The path to the data to be retrieved.
   * @return The retrieved data.
   */
  protected fetch(dataPath: string): T {
    if (this.dataContext?.data) {
      return this.dataContext.getAt<T>(dataPath)
    }

    throw new BeaconDataError(`unable to fetch data for: ${dataPath}`)
  }

  /**
   * Validate data to find complex errors not covered by primitive types. Push errors to `this.errors`. it is
   * recommended to call `super.validate(T)` have higher level error validations computed.
   *
   * TODO: it's not clear if this is a good idea.
   *
   * @param data data to validate
   * @param fetched
   * @return errors found
   * @protected
   */
  protected abstract validate(data: T, fetched: boolean): ValidationErrors;

  /**
   * implements `convertData()` to modify data before handing it to.
   *
   * @param data - The data to be converted.
   * @param errors
   * @param fetched
   * @return The converted data.
   *
   * TODO: should be renamed to something like `prepare`.
   * TODO: providing T and returning T does not make sense. Something needs to be better designed to support converting
   *   of data to other types. TODO: something is needed to store complex errors that depend on multiple prop
   *   validation. Maybe should be in a separate method.
   */
  protected abstract extend(data: T, errors: ValidationErrors, fetched: boolean): T & FhirDataDecoration;

  /**
   * This method is a protected abstract method that is used to signal that the provided data is ready.
   *
   * @param providedData - The provided data that is ready.
   * @param decoratedData - The decorated data that is ready, which includes additional properties defined as keys with
   *   type 'string', 'number', or 'symbol'.
   */
  protected abstract ready(providedData: T, decoratedData: T & FhirDataDecoration | null): void

  /**
   * Updates the component's state based on the changed properties.
   *
   * @param {PropertyValues} changes - The changed properties object.
   *
   * @return {void}
   */
  protected willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes)


    if (changes.has('dataPath') && this.shouldFetch()) {
      this.data = this.fetch(this.dataPath)
      this.#fetched = true
    }

    if (changes.has('data') && this.dataDefined()) {
      this.willReady()
      const validationErrors = this.validate(this.data, this.#fetched)
      this.#errors.push(...validationErrors)
      this.extendedData = this.extend(this.data, this.#errors, this.#fetched)
      this.ready(this.data, this.extendedData)
    }

  }

  private dataDefined() {
    return this.data && this.data !== NoDataSet
  }

}

export class BeaconDataError implements Error {
  name: string = 'BeaconDataError'
  message: string
  stack?: string | undefined

  constructor(msg: string) {
    this.message = msg
  }

}
