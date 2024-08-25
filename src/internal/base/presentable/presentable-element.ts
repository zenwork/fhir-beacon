import {PropertyValues, TemplateResult}    from 'lit'
import {DisplayConfig}                     from '../../../types'
import {FhirElementData, ValidationErrors} from '../data'
import {Decorated}                         from '../data/data-element'

/**
 * The TemplateGeneratorFactory interface provides methods for rendering different types of templates for a given
 * FhirElementData. This interface is generic and expects the type parameter T to extend FhirElementData.
 */
interface TemplateGeneratorFactory<T extends FhirElementData> {
  renderOverride(displayConfig: DisplayConfig, data: Decorated<T>, errors: ValidationErrors): TemplateResult[]
  renderDisplay(config: DisplayConfig, data: Decorated<T>, errors: ValidationErrors): TemplateResult[]
  renderNarrative(displayConfig: DisplayConfig, data: Decorated<T>, errors: ValidationErrors): TemplateResult[]
  renderStructure(config: DisplayConfig, data: Decorated<T>, errors: ValidationErrors): TemplateResult[]
}

/**
 * Represents an element that can be presented in a user interface.
 *
 * The `PresentableElement` interface extends `TemplateGeneratorFactory` and introduces additional methods for
 * rendering life-cycle.
 *
 * @typeparam T - The type of FhirElementData for the PresentableElement.
 *
 * @interface
 */
export interface PresentableElement<T extends FhirElementData> extends TemplateGeneratorFactory<T> {
  canRender(): boolean
  willRender(displayConfig: DisplayConfig, extendedData: Decorated<T>, changes: PropertyValues): void
  override(): boolean
  hasRendered(displayConfig: DisplayConfig, extendedData: Decorated<T>, haveChanged: PropertyValues): void
}
