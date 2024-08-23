/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Represents a base element in the FHIR data model. This is the class to extend when creating components.
 *
 * @param {string} type - The type of the instance being created. Should be one of the canonical FHIR names
 * @typeparam T - The type of data associated with the base element.
 */
import {html, TemplateResult}              from 'lit'
import {FhirDataDecoration}                from './data'
import {FhirElementData, ValidationErrors} from './data/fhir-data-element.data'
import {FhirPresentableElement}            from './presentable/fhir-presentable-element'

export class BaseElement<T extends FhirElementData> extends FhirPresentableElement<T> {

  /**
   * called before the data will be processed
   *
   * @return {void} This method does not return anything.
   */
  protected willReady(): void {
    //
  }

  /**
   * Override to extend the given data with some useful context
   *
   * @param data - The data to be converted.
   * @return The converted data of the same type as the input data.
   */
  protected extend(data: T): T & FhirDataDecoration {
    return data as T & FhirDataDecoration
  }

  /**
   * validate data to find complex errors not covered by primitive types. Errors can be accessed through `this.errors`.
   * it is recommended to call
   * `super.validate(T)` as well.
   * @param data data to validate
   * @return errors found
   * @protected
   */
  protected validate(data: T): ValidationErrors {
    return []
  }

  /**
   * This method is used to indicate that the data is ready.
   *
   * @param {T} providedData - The provided data.
   * @param {(T & FhirDataDecoration) | null} decoratedData - The decorated data.
   * @return {void}
   *
   * @remarks
   * This method is intended to be overridden in derived classes to perform specific actions when the data is ready.
   * It serves as a hook for custom logic that needs to be executed when the data becomes available.
   *
   * @example
   * // Override the ready method to handle data readiness
   * protected ready(providedData, decoratedData) {
   *   // Perform specific logic here when the data is ready
   * }
   */
  protected ready(providedData: T, decoratedData: (T & FhirDataDecoration) | null): void {
    // override this method to do something when data is ready
  }

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param data
   */
  protected renderDisplay(data: T): TemplateResult | TemplateResult[] {
    return this.renderAll(data)
  }

  /**
   * Convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param data
   */
  protected renderStructure(data: T): TemplateResult | TemplateResult[] {
    return this.renderAll(data)
  }

  /**
   *  Override this implementation to handle display and structural rendering with same logic
   * @param data
   */

  protected renderAll(data: T): TemplateResult | TemplateResult[] {
    return html``
  }
}
