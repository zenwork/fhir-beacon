import {html, TemplateResult}          from 'lit'
import {map}                           from 'lit/directives/map.js'
import {DisplayMode}                   from '../../displayMode'
import {DisplayConfig}                 from '../../types'
import {hasMany, hasOnlyOne}           from '../directives'
import {pluralize}                     from '../pluralize'
import {Generators, generators, strap} from './strap'



type WrapConfig<T> = {
  key?: string,
  pluralBase?: string,
  collection: T[],
  generator: { (data: T, label: string, key: string, index: number): TemplateResult } | Generators,
  summary?: boolean,
  config: DisplayConfig
}

/**
 * Wraps a collection of items with a `<fhir-wrapper>` component.
 *
 * @param key - The key to use for generating labels.
 * @param pluralBase - The base string to pluralize for the label of the wrapper.
 * @param collection - The collection of items to wrap.
 * @param generator - The function to generate the content of each item in the wrapper.
 * @param summary - Whether to display a summary or detailed view of the items in the wrapper.
 * @param config
 * @returns The wrapped collection as a TemplateResult or any other value.
 */
export function wrap<T>({
                          key,
                          pluralBase,
                          collection,
                          generator,
                          summary = true,
                          config
                        }: WrapConfig<T>
): TemplateResult {


  if(config.mode === DisplayMode.structure) {
    return strap({key, pluralBase, collection, generator, summary, config})
  }

  if (!key && typeof generator === 'string') {
    key = generator.substring(5)
  }

  if (typeof generator === 'string') generator
    = generators[generator] as { (data: T, label: string, key: string): TemplateResult }

  if (key && typeof generator === 'function') {

    if (!config.summaryonly || config.summaryonly && summary) {
      const plural = pluralize(pluralBase || key)

      if (hasMany(collection)) {
        if (config.verbose) {
          return html`
              <fhir-wrapper label="${plural}" ?summary=${summary} ?summaryonly=${config.summaryonly}>
                  ${map(collection,
                        (data: T, idx) => html`
                            ${generator(data, `${pluralBase || key} ${idx + 1}`, key, idx)}
                        `)}
              </fhir-wrapper>
          `
        }

        return html`
            <fhir-wrapper label="${plural}" ?summary=${summary} ?summaryonly=${config.summaryonly}>
                ${map(collection,
                      (data: T, idx) => html`
                          ${generator(data, `${idx + 1}`, key, idx)}
                      `)}
            </fhir-wrapper>
        `
      }

      if (hasOnlyOne(collection)) {
        if (config.verbose) {
          return html` ${map(collection,
                             (data: T, index) => html` ${generator(data, pluralBase || key, key, index)} `)}`
        }

        return html`${map(collection, (data: T, index) => html` ${generator(data, pluralBase || key, key, index)} `)} `
      }

      if (config.verbose && config.mode === DisplayMode.display) {
        return html`
            <fhir-wrapper label="${pluralBase || key}" ?open=${config.open} ?summaryonly=${config.summaryonly}>
                <fhir-empty-list></fhir-empty-list>
            </fhir-wrapper>`
      }

    }
  }


  return html``
}
