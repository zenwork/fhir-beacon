import {TemplateResult}                    from 'lit'
import {DisplayConfig}                     from '../../types'
import {FhirElementData, ValidationErrors} from './data'
import {Decorated}                         from './Decorated'

/**
 * The Templating interface provides methods for rendering different types of templates for a given
 * Element. This interface is generic and expects the type parameter T to extend FhirElementData.
 */
export interface Templating<T extends FhirElementData> {
  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param config
   * @param data
   * @param errors
   */
  renderDisplay(config: DisplayConfig, data: Decorated<T>, errors: ValidationErrors): TemplateResult[]

  /**
   * convenience method implemented by fhir model elements and resources. Internal and abstract classes should
   * contribute templateGenerators instead.
   * @param config
   * @param data
   * @param errors
   */
  renderStructure(config: DisplayConfig, data: Decorated<T>, errors: ValidationErrors): TemplateResult[]

  /**
   * Renders a narrative using the specified display configuration, data, and validation errors.
   *
   * @param {DisplayConfig} displayConfig - The configuration object for how to display the narrative.
   * @param {Decorated<T>} data - The decorated data object containing the narrative content.
   * @param {ValidationErrors} errors - The validation errors associated with the data object.
   *
   * @return {TemplateResult[]} - An array of template results representing the rendered narrative.
   */
  renderNarrative(displayConfig: DisplayConfig, data: Decorated<T>, errors: ValidationErrors): TemplateResult[]

  /**
   * Override all rendering modes with this renderer.
   *
   * @param {DisplayConfig} displayConfig - The display configuration object.
   * @param {Decorated<T>} data - The decorated data object.
   * @param {ValidationErrors} errors - The validation errors object.
   * @return {TemplateResult[]} - An array of TemplateResult objects.
   */
  renderOverride(displayConfig: DisplayConfig, data: Decorated<T>, errors: ValidationErrors): TemplateResult[]
}
