import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'
import {hasMany, hasOnlyOne}  from '../directives'
import {pluralize}            from '../pluralize'
import {show}                 from '../show'

/**
 * Wraps lines based on the given parameters.
 *
 * @param key - The key to be used for wrapping lines. It will be converted to lower case.
 * @param label - The base string to be used for pluralization.
 * @param collection - The array of strings to be processed.
 * @param verbose - A boolean value indicating whether the verbose mode is enabled or not.
 * @param generator - A function to generate a TemplateResult based on the provided data, label, and key.
 * @param summary - An optional boolean value indicating whether to display the summary or not.
 *
 * @param summaryMode
 * @return A TemplateResult object representing the wrapped lines, or any other value if an error occurs.
 */
export function wrapLines<T>(key: string,
                             label: string,
                             collection: T[],
                             verbose: boolean,
                             generator: { (data: T, label: string, key: string): TemplateResult },
                             summary: boolean = true,
                             summaryMode: boolean = false
): TemplateResult {
  if (!summaryMode || summaryMode && summary) {

    if (hasMany(collection)) {
      if (verbose) {
        return html`
            <fhir-wrapper label="${pluralize(label)}" ?summary=${summary} ?summaryonly=${summaryMode}>
                ${map(collection, (data: T, index: number) => generator(data, label + ' ' + show(index + 1), key))}
            </fhir-wrapper>
        `
      }

      return html`
          <fhir-wrapper label="f${pluralize(label)}" ?summary=${summary} ?summaryonly=${summaryMode}>
              ${map(collection, (data: T, index) => generator(data, `${show(index + 1)}`, key))}
          </fhir-wrapper>
      `
    }
    if (hasOnlyOne(collection)) {
      if (verbose) {
        return html`

            ${map(collection, (data: T) => generator(data, label, key))}

        `
      }

      return html`

          ${map(collection, (data: T) => generator(data, label, key))}

      `
    }


    if (verbose) {
      // label = k + (k ? '/' : '') + label
      return html`
          <fhir-wrapper label="${label}" ?summaryonly=${summaryMode}>
              <fhir-empty-list ></fhir-empty-list >
          </fhir-wrapper>`
    }
  }
  return html``
}
