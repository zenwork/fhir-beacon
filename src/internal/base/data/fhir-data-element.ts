/* eslint-disable @typescript-eslint/no-unused-vars */
import {LitElement, PropertyValues}                                                             from 'lit'
import {property, state}                                                                        from 'lit/decorators.js'
import {DataContextConsumerController, FhirDataContext}                                         from '../../contexts'
import {DataHandling}                                                                           from '../DataHandling'
import {decorated, Decorated, Errors, FhirElementData, NoDataSet, Validations, ValidationsImpl} from '../Decorated'


export class BeaconDataError implements Error {
  name: string = 'BeaconDataError'

  message: string

  stack?: string | undefined

  constructor(msg: string) {
    this.message = msg
  }

}

/**
 * Abstract class representing a FHIR data element. It extends LitElement.
 *
 * @template T - The type of the base element data.
 */
export abstract class FhirDataElement<T extends FhirElementData> extends LitElement implements DataHandling<T> {

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
    // TODO: might be better to use data-fhir and comply with the data-* standard. see:
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
  @property({ type: Object, attribute: 'data' })
  public data: T = NoDataSet as T

  @property({ type: String, attribute: 'data-path' })
  public declare dataPath: string

  //------------------------------------------------//
  /**
   * The extendedData variable is used to store additional data of type T and an empty object type {}.
   * It can also hold a null value.
   *
   * @type {T & {} | null}
   */
  @state()
  public extendedData: Decorated<T> = decorated()

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
  @property({ reflect: false })
  public errors: Errors = {}

  @state()
  public declare dataContext: FhirDataContext

  /**
   * FHIR type.
   *
   * @type {string} MyString
   */
  @state()
  protected declare readonly type: string

  //------------------------------------------------//
  #fetched: boolean = false

  //------------------------------------------------//

  protected constructor(type: string) {
    super()
    this.type = type
    this.data = NoDataSet as T
    this.extendedData = decorated(this.data)
    new DataContextConsumerController(this)
  }

  public prepare() {
    return decorated(this.data)
  }

  public shouldFetch(changes: PropertyValues): boolean {
    return !!this.dataContext && !!this.dataPath
  }

  public fetch(dataPath: string): T {
    if (this.dataContext?.data) {
      return this.dataContext.getAt<T>(dataPath)
    }

    throw new BeaconDataError(`unable to fetch data for: ${dataPath}`)
  }

  public abstract validate(data: T, validations: Validations, fetched: boolean): void

  public abstract decorate(data: Decorated<T>, validations: Validations, fetched: boolean): void

  public abstract isPrepared(providedData: T, decoratedData: Decorated<T>): void

  public shouldPrepare() {
    return this.data && this.data !== NoDataSet
  }

  /**
   * Updates the component's state based on the changed properties.
   *
   * @param {PropertyValues} changes - The changed properties object.
   *
   * @return {void}
   */
  protected willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes)

    if (changes.has('errors')) {
      // if (this.type === 'CodeableConcept') console.log(this.key, this.type, this.errors)
      // if (this.type === 'Coding') console.log('coding')
    }

    if (changes.has('dataPath') && this.shouldFetch(changes)) {
      this.data = this.fetch(this.dataPath)
      this.#fetched = true
    }

    if (changes.has('data') && this.shouldPrepare()) {
      this.extendedData = this.prepare()
      const validations = new ValidationsImpl(this.extendedData)
      this.validate(this.extendedData, validations, this.#fetched)
      if (this.data !== NoDataSet) this.decorate(this.extendedData as Decorated<T>, validations, this.#fetched)
      this.isPrepared(this.data, this.extendedData)
    }

  }

}
