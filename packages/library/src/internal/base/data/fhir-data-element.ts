/* eslint-disable @typescript-eslint/no-unused-vars */
import {FhirDatatypeName}                                                from 'FhirDatatypeName'
import {FhirResourceName}                                                from 'FhirResourceName'
import {PropertyValues}                                                  from 'lit'
import {property, state}                                                 from 'lit/decorators.js'
import {PrimitiveInputEvent, PrimitiveInvalidEvent, PrimitiveValidEvent} from '../../../components/primitive'
import {DataContextConsumerController, FhirDataContext}                  from '../../contexts'
import {BeaconDataError}                                                 from '../../errors/beacon-data-error'
import {
  ConfigurableElement
}                                                                        from '../configurable/fhir-configurable-element'
import {DataHandling}                                                    from '../DataHandling'
import {decorate, NoDataObject}                                          from '../Decorate'
import {Decorated}                                                       from '../Decorate.types'
import {FqkMap}                                                          from '../DeepKeyMap'
import {FhirElementData}                                                 from '../FhirElement.type'
import {ValidationsImpl}                                                 from '../Validations.impl'
import {FullyQualifiedKey, Validations}                                  from '../Validations.type'



/**
 * Abstract class representing a FHIR data element. It extends LitElement.
 *
 * @template T - The type of the base element data.
 */
export abstract class FhirDataElement<T extends FhirElementData> extends ConfigurableElement
  implements DataHandling<T> {

  /**
   * The key the element is known as in its parent data structure
   *
   * @type {string}
   * @default ''
   */
  @property({ reflect: true })
  public key: string = 'nokey'

  /**
   * Element data
   */
    // TODO: might be better to use data-fhir and comply with the data-* standard. see:
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
  @property({ type: Object, attribute: 'data' })
  public data: T = NoDataObject as T

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
  public declare extendedData: Decorated<T>

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
  @property({ reflect: false, attribute: false, type: FqkMap })
  public errors: FqkMap = new FqkMap()

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

  private invalids: Set<FullyQualifiedKey> = new Set()

  protected constructor(type: FhirDatatypeName | FhirResourceName | string) {
    super()
    this.type = type
    this.data = NoDataObject as T
    this.extendedData = decorate(this.key, this.data, this.errors)
    new DataContextConsumerController(this)

    this.addEventListener('bkn-input', (e) => {
      const event = e as PrimitiveInputEvent
      event.stopImmediatePropagation()
      if (event.key && this.data) {
        this.edited(this.data, event.key, event.oldValue, event.newValue)
        this.requestUpdate('data')
      }
    })

    this.addEventListener('bkn-invalid', (e) => {
      const event = e as PrimitiveInvalidEvent
      event.stopImmediatePropagation()
      this.invalids.add(event.key)
    })

    this.addEventListener('bkn-valid', (e) => {
      const event = e as PrimitiveValidEvent
      event.stopImmediatePropagation()
      this.invalids.delete({ path: [{ node: event.key }] })
      // console.log(this.type, 'removed invalids', this.invalids)
    })
  }

  public prepare() {
    this.invalids.clear()
    return decorate(this.key, this.data, this.errors)
  }

  public shouldFetch(_changes: PropertyValues): boolean {
    return !!this.dataContext && !!this.dataPath
  }

  public fetch(dataPath: string): T {
    if (this.dataContext?.data) {
      return this.dataContext.getAt<T>(dataPath)
    }

    throw new BeaconDataError(`unable to fetch data for: ${dataPath}`)
  }

  public abstract validate(data: T, validations: ValidationsImpl<T>, fetched: boolean): void

  public abstract decorate(data: Decorated<T>, validations: Validations, fetched: boolean): void

  public abstract isPrepared(providedData: T, decoratedData: Decorated<T>): void

  public shouldPrepare() {
    return this.data && this.data !== NoDataObject
  }

  /**
   * This method is called on every {@link PrimitiveInputEvent} captured from children elements. Modify the data object
   * at the corresponding key with the new value in the provided data structure.
   *
   * Do any other side effects required by overriding this method.
   *
   * The base implementation assigns values to the contained data object. If the key does not exist then the
   * corresponding key is added.
   *
   * @param data contained data structure that can be edited
   * @param key identity of changed data
   * @param _oldValue old value
   * @param newValue new value
   * @protected
   */
  protected edited(data: T, key: string, _oldValue: unknown, newValue: unknown) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (data as Record<string, any>)[key] = newValue
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
      const validations = new ValidationsImpl<T>(this.extendedData)
      this.validate(this.extendedData, validations, this.#fetched)
      if (this.data !== NoDataObject) this.decorate(this.extendedData as Decorated<T>,
                                                    validations,
                                                    this.#fetched)
      this.isPrepared(this.data, this.extendedData)
    }

  }

}
