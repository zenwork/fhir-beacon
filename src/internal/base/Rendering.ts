import {PropertyValues} from 'lit'
import {DisplayConfig}  from '../../types'

import {Decorated, FhirElementData} from './Decorated'

/**
 * Represents an element that can be presented in a user interface.
 *
 * The `PresentableElement` interface extends `Templating` and introduces additional methods for
 * rendering life-cycle.
 *
 * @typeparam T - The type of FhirElementData for the PresentableElement.
 *
 * @interface
 */
export interface Rendering<T extends FhirElementData> {
  /**
   * Should return false if rendering should be interrupted.
   *
   * @return {boolean} Indicates whether rendering is permitted.
   */
  mustRender(): boolean

  /**
   * Invoked before rendering will occur.
   *
   * @param {DisplayConfig} displayConfig - The configuration settings that define display properties.
   * @param {Decorated<T>} extendedData - An object containing decorated data that may affect rendering.
   * @param {PropertyValues} changes - A map of properties and their respective changes.
   * @return {void}
   */
  willRender(displayConfig: DisplayConfig, extendedData: Decorated<T>, changes: PropertyValues): void
  override(): boolean
  hasRendered(displayConfig: DisplayConfig, extendedData: Decorated<T>, haveChanged: PropertyValues): void
}
