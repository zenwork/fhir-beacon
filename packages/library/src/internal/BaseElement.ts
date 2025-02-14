/* eslint-disable @typescript-eslint/no-unused-vars */
import {PropertyValues, TemplateResult} from 'lit'
import {DisplayConfig}                  from '../shell/types'
import {Decorated, FhirElementData}     from './base'

import {FhirPresentableElement} from './base/presentable/fhir-presentable-element'
import {EmptyResult}            from './base/presentable/fhir-presentable-element.data'
import {Validations}            from './base/Validations.type'


// import {FhirPresentableElement} from './base/presentable/fhir-presentable-element'

/**
 * Represents a base element in the FHIR data model. This is the class to extend when creating components.
 *
 * @param {string} type - The type of the instance being created. Should be one of the canonical FHIR names
 * @typeparam T - The type of data associated with the base element.
 */
export class BaseElement<D extends FhirElementData> extends FhirPresentableElement<D> {


  /**
   * validate data to find complex errors not covered by primitive types. Errors can be accessed through `this.errors`.
   * it is recommended to call
   * `super.validate(T)` as well.
   * @param data data to validate
   * @param fetched
   * @param validations
   * @return errors found
   * @protected
   */
  public validate(_data: D, _validations: Validations, _fetched: boolean): void {
    // override to add validations
  }

  /**
   * Override to extend the given data with some useful context
   *
   * @param data - The data to be converted.
   * @param validations
   * @param fetched
   * @return The converted data of the same type as the input data.
   */
  public decorate(_data: Decorated<D>, _validations: Validations, _fetched: boolean): void {
    // override to add logigic
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
  public isPrepared(_providedData: D, _decoratedData: Decorated<D>): void {
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
  public willRender(_config: DisplayConfig,
                    _data: Decorated<D> | null,
                    _changes: PropertyValues): void {
    // override to add logic
  }

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param config
   * @param data
   * @param validations
   */
  public renderDisplay(_config: DisplayConfig,
                       _data: Decorated<D>,
                       _validations: Validations): TemplateResult[] {
    return EmptyResult
  }

  /**
   *
   * @param config
   * @param data
   * @param validations
   * @protected
   */
  public renderNarrative(_config: DisplayConfig,
                         _data: Decorated<D>,
                         _validations: Validations): TemplateResult[] {
    return EmptyResult
  }

  /**
   * Convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param config
   * @param data
   * @param validations
   */
  public renderStructure(_config: DisplayConfig,
                         _data: Decorated<D>,
                         _validations: Validations): TemplateResult[] {
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
  public hasRendered(_config: DisplayConfig,
                     _data: Decorated<D> | null,
                     _haveChanged: PropertyValues): void {
    // override to add logic
  }

}
