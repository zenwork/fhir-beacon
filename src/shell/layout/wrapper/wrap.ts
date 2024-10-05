import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'
import {asReadable}           from '../../../components'
import {hasMany, hasOnlyOne}  from '../directives'
import {pluralize}            from '../pluralize'
import {show}                 from '../show'

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
 * @returns The wrapped collection as a TemplateResult or any other value.
 */
export function wrap<T>(key: string,
                        pluralBase: string,
                        collection: T[],
                        verbose: boolean,
                        generator: { (data: T, label: string, key: string): TemplateResult },
                        summary: boolean = true,
                        summaryMode: boolean = false
): TemplateResult {
  if (!summaryMode || summaryMode && summary) {
    const k = asReadable(key, 'lower')
    let plural = pluralize(pluralBase)
    let label = pluralBase

    if (hasMany(collection)) {
      if (verbose) {
        plural = k + (k ? '/' : '') + plural
        return html`
            <fhir-wrapper label="${plural}" variant="primary" ?summary=${summary}>
                ${map(collection,
                      (data: T, index: number) => html`
                          <fhir-wrapper
                                  label="${label} ${show(index + 1)}"
                                  variant="primary"
                                  ?summary=${summary}
                          >
                              ${generator(data, pluralBase, key)}
                          </fhir-wrapper >
                      `)}
            </fhir-wrapper >
        `
      }

      return html`
          <fhir-wrapper label="${plural}" variant="primary" ?summary=${summary}>
              ${map(collection,
                    (data: T, index: number) => html`
                        <fhir-wrapper
                                label="${show(index + 1)}"
                                variant="primary"
                                ?summary=${summary}
                        >
                            ${generator(data, pluralBase, key)}
                        </fhir-wrapper >
                    `)}
          </fhir-wrapper >
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
