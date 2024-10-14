import {html, TemplateResult} from 'lit'
import {map}                 from 'lit/directives/map.js'
import {DisplayConfig}       from '../../../types'
import {hasMany, hasOnlyOne} from '../directives'
import {pluralize}            from '../pluralize'

type WrapConfig<T> = {
  key: string,
  pluralBase: string,
  collection: T[],
  generator: { (data: T, label: string, key: string): TemplateResult },
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
  if (!config.summaryonly || config.summaryonly && summary) {
    const plural = pluralize(pluralBase)

    if (hasMany(collection)) {
      if (config.verbose) {
        return html`
            <fhir-wrapper-2 label="${plural}" ?summary=${summary} ?summaryonly=${config.summaryonly}>
                ${map(collection,
                      (data: T) => html`
                          ${generator(data, pluralBase, key)}
                      `)}
            </fhir-wrapper-2>
        `
      }

      return html`
          <fhir-wrapper-2 label="${plural}" ?summary=${summary} ?summaryonly=${config.summaryonly}>
              ${map(collection,
                    (data: T, idx) => html`

                        ${generator(data, `${idx + 1}`, key)}
                    `)}
          </fhir-wrapper-2>
      `
    }

    if (hasOnlyOne(collection)) {
      if (config.verbose) {
        return html`

            ${map(collection, (data: T) => html` ${generator(data, pluralBase, key)} `)}

        `
      }

      return html`

          ${map(collection, (data: T) => html` ${generator(data, pluralBase, key)} `)}

      `
    }

  }


  return html``
}
