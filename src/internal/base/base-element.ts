import {html, TemplateResult}              from 'lit'
import {FhirElementData, ValidationErrors} from './fhir-data-element.data'
import {FhirPresentableElement}            from './fhir-presentable-element'


/**
 * Represents a base element in the FHIR data model. This is the class to extend when creating components.
 *
 * @param {string} type - The type of the instance being created. Should be one of the canonical FHIR names
 * @typeparam T - The type of data associated with the base element.
 */
export class BaseElement<T extends FhirElementData> extends FhirPresentableElement<T> {

  constructor(type: string) {
    super(type)
  }

  /**
   * Converts the given data to the specified type.
   *
   * @param data - The data to be converted.
   * @return The converted data of the same type as the input data.
   *
   * @deprecated This method should be renamed to something like `prepare`.
   *   The current design, where the method accepts a generic type (T) and returns the same generic type,
   *   does not make sense and might need to be reconsidered to better support data conversion to other types.
   *
   * TODO: should be renamed to something like `prepare`.
   * TODO: providing T and returning T does not make sense. Something needs to be better designed to support converting of data to other types.
   */
  protected convertData(data: T): T {
    return data as T
  }

  /**
   * validate data to find complex errors not covered by primitive types. Errors can be accessed through `this.errors`. it is recommended to call
   * `super.validate(T)` as well.
   * @param data data to validate
   * @return errors found
   * @protected
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected validate(data: T): ValidationErrors {
    return []
  }

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should contribute templateGenerators instead.
   * @param data
   */
  protected renderDisplay(data: T): TemplateResult | TemplateResult[] {
    return this.renderAll(data)
  }

  /**
   * Convenience method implemented by fhir model elements and resources. Internal and abstract classes should contribute templateGenerators instead.
   * @param data
   */
  protected renderStructure(data: T): TemplateResult | TemplateResult[] {
    return this.renderAll(data)
  }

  /**
   *  Override this implementation to handle display and structural rendering with same logic
   * @param data
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected renderAll(data: T): TemplateResult | TemplateResult[] {
    return html``
  }
}
