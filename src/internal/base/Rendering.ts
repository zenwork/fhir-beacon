import {PropertyValues}  from 'lit'
import {DisplayConfig}   from '../../types'
import {FhirElementData} from './data'

import {Decorated} from './Decorated'

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
  canRender(): boolean
  willRender(displayConfig: DisplayConfig, extendedData: Decorated<T>, changes: PropertyValues): void
  override(): boolean
  hasRendered(displayConfig: DisplayConfig, extendedData: Decorated<T>, haveChanged: PropertyValues): void
}
