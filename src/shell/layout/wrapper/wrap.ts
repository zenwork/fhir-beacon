import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'
import {asReadable}           from '../../../components'
import {hasMany, hasOnlyOne}  from '../directives'
import {pluralize}            from '../pluralize'

/**
 * Wraps a collection of items with a `<fhir-wrapper>` component.
 *
 * @param key - The key to use for generating labels.
 * @param pluralBase - The base string to pluralize for the label of the wrapper.
 * @param collection - The collection of items to wrap.
 * @param verbose - Whether to include detailed information in the wrapper.
 * @param generator - The function to generate the content of each item in the wrapper.
 * @param summary - Whether to display a summary or detailed view of the items in the wrapper.
 *
 * @param summaryMode
 * @param force
 * @returns The wrapped collection as a TemplateResult or any other value.
 */
export function wrap<T>(key: string,
                        pluralBase: string,
                        collection: T[],
                        verbose: boolean,
                        generator: { (data: T, label: string, key: string): TemplateResult },
                        summary: boolean = true,
                        summaryMode: boolean = false,
                        force: boolean = false
): TemplateResult {
  if (!summaryMode || summaryMode && summary) {
    const k = asReadable(key, 'lower')
    let plural = pluralize(pluralBase)
    let label = pluralBase

    if (hasMany(collection)) {
      if (verbose) {
        plural = k + (k ? '/' : '') + plural
        return html`
            <fhir-wrapper-2 label="${plural}" ?summary=${summary} ?summaryonly=${summaryMode}>
                ${map(collection,
                      (data: T) => html`
                              ${generator(data, pluralBase, key)}
                      `)}
            </fhir-wrapper-2>
        `
      }

      return html`
          <fhir-wrapper-2 label="${plural}" ?summary=${summary} ?summaryonly=${summaryMode}>
              ${map(collection,
                    (data: T) => html`

                        ${generator(data, pluralBase, key)}
                    `)}
          </fhir-wrapper-2>
      `
    }

    if (hasOnlyOne(collection) && force) {
      if (verbose) {
        return html`
            <fhir-wrapper-2 label="${plural}" ?summary=${summary} ?summaryonly=${summaryMode}>
                ${map(collection, (data: T) => html` ${generator(data, pluralBase, key)} `)}
            </fhir-wrapper-2>
        `
      }

      return html`
          <fhir-wrapper-2 label="${plural}" ?summary=${summary} ?summaryonly=${summaryMode}>
              ${map(collection, (data: T) => html` ${generator(data, pluralBase, key)} `)}
          </fhir-wrapper-2>
      `
    }

    if (hasOnlyOne(collection)) {
      if (verbose) {
        label = k + (k ? '/' : '') + label
        return generator(collection[0], label, k)
      }

      return generator(collection[0], label, k)
    }
  }


  return html``
}
