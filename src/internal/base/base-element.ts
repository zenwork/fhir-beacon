/* eslint-disable @typescript-eslint/no-unused-vars */
import {PropertyValues, TemplateResult}    from 'lit'
import {DisplayConfig}                     from '../../types'
import {FhirElementData, ValidationErrors} from './data/fhir-data-element.data'

import {Decorated}              from './Decorated'
import {EmptyResult}            from './presentable'
import {FhirPresentableElement} from './presentable/fhir-presentable-element'

/**
 * Represents a base element in the FHIR data model. This is the class to extend when creating components.
 *
 * @param {string} type - The type of the instance being created. Should be one of the canonical FHIR names
 * @typeparam T - The type of data associated with the base element.
 */
export class BaseElement<T extends FhirElementData> extends FhirPresentableElement<T> {


  /**
   * validate data to find complex errors not covered by primitive types. Errors can be accessed through `this.errors`.
   * it is recommended to call
   * `super.validate(T)` as well.
   * @param data data to validate
   * @return errors found
   * @protected
   */
  public validate(data: T): ValidationErrors {
    return this.errors
  }

  /**
   * Override to extend the given data with some useful context
   *
   * @param data - The data to be converted.
   * @param errors
   * @param fetched
   * @return The converted data of the same type as the input data.
   */
  public decorate(data: T, errors: ValidationErrors, fetched: boolean): Decorated<T> {
    return data as Decorated<T>
  }

  /**
   * This method is used to indicate that the data is ready.
   *
   * @param {T} providedData - The provided data.
   * @param {(T & Decorated) | null} decoratedData - The decorated data.
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
  public isPrepared(providedData: T, decoratedData: Decorated<T>): void {
    // override to add logic
  }

  /**
   * Determines if the component will render based on the given parameters.
   *
   * @param {DisplayConfig} config - The configuration for displaying the component.
   * @param {Decorated<T> | null} data - The extended data to be rendered, or null if none.
   * @param {PropertyValues} changes - The Lit changed properties passed during `.willUpdate(changes)`
   *
   * @return {void} - This method does not return anything.
   */
  public willRender(config: DisplayConfig,
                    data: Decorated<T> | null,
                    changes: PropertyValues): void {
    // override to add logic
  }

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param config
   * @param data
   * @param errors
   */
  public renderDisplay(config: DisplayConfig,
                       data: Decorated<T>,
                       errors: ValidationErrors): TemplateResult[] {
    return EmptyResult
  }

  /**
   *
   * @param config
   * @param data
   * @param errors
   * @protected
   */
  public renderNarrative(config: DisplayConfig,
                         data: Decorated<T>,
                         errors: ValidationErrors): TemplateResult[] {
    return EmptyResult
  }

  /**
   * Convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param config
   * @param data
   * @param errors
   */
  public renderStructure(config: DisplayConfig,
                         data: Decorated<T>,
                         errors: ValidationErrors): TemplateResult[] {
    return EmptyResult
  }

  /**
   * Called after the component has rendered.
   *
   * @description
   * This method can be overridden in child classes to add additional logic
   * that should be executed when the component has finished rendering.
   *
   * @param config
   * @param data
   * @param {PropertyValues} haveChanged - The Lit changed properties passed during `.updated(changes)` which is
   * called after `.render()`
   * @return {void}
   *
   */
  public hasRendered(config: DisplayConfig,
                     data: Decorated<T> | null,
                     haveChanged: PropertyValues): void {
    // override to add logic
  }

}
