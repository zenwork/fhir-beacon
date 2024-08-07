import {LitElement, PropertyValues}            from 'lit'
import {property, state}                       from 'lit/decorators.js'
import {FhirDataContext}                       from '../contexts'
import {DataContextConsumerController}         from '../contexts/context-consumer-controller'
import {FhirDataElementData, ValidationErrors} from './fhir-data-element.data'

/**
 * Abstract class representing a FHIR data element. It extends LitElement.
 *
 * @template T - The type of the base element data.
 */
export abstract class FhirDataElement<T extends FhirDataElementData> extends LitElement {

  @property({ reflect: false })
  public declare readonly type: string

  // TODO: might be better to use data-fhir and comply with the data-* standard. see: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
  @property({ type: Object, attribute: 'data' })
  public declare data: T

  @property({ type: String, attribute: 'data-path' })
  public declare dataPath: string

  @state()
  public declare dataContext: FhirDataContext

  @state()
  public convertedData: T | null = null

  public errors: ValidationErrors = []

  protected constructor(type: string) {
    super()
    this.type = type
    new DataContextConsumerController(this)
  }

  /**
   * Validate data to find complex errors not covered by primitive types. Push errors to `this.errors`. it is
   * recommended to call `super.validate(T)` have higher level error validations computed.
   *
   * TODO: it's not clear if this is a good idea.
   *
   * @param data data to validate
   * @return errors found
   * @protected
   */
  protected abstract validate(data: T): ValidationErrors

  /**
   * implements `convertData()` to modify data before handing it to.
   *
   * @param data - The data to be converted.
   * @return The converted data.
   *
   * TODO: should be renamed to something like `prepare`.
   * TODO: providing T and returning T does not make sense. Something needs to be better designed to support converting of data to other types.
   * TODO: something is needed to store complex errors that depend on multiple prop validation. Maybe should be in a separate method.
   */
  protected abstract convertData(data: T): T

  /**
   * Updates the component's state based on the changed properties.
   *
   * @param {PropertyValues} _changedProperties - The changed properties object.
   *
   * @return {void}
   */
  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)

    // assign data received through context
    if (_changedProperties.has('dataPath') && this.dataContext) {
      this.data = this.dataContext.getAt(this.dataPath)
    }

    // validate anc convert data set as a property or set through context
    if (_changedProperties.has('data')) {
      const validationErrors = this.validate(this.data)
      this.errors.push(...validationErrors)
      this.convertedData = this.convertData(this.data)

    }

  }

}
