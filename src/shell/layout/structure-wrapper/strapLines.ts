import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'
import {hasSome}              from '../directives'
import {show}                 from '../show'

/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 * @param key
 * @param label
 * @param collection
 * @param verbose
 * @param generator
 * @param summary
 * @param summaryMode
 */
export function strapLines(key: string,
                           label: string,
                           collection: string[],
                           verbose: boolean,
                           generator: { (data: string, label: string, key: string): TemplateResult },
                           summary: boolean = true,
                           summaryMode: boolean = false
): TemplateResult {
  if (!summaryMode || summaryMode && summary) {

    if (hasSome(collection)) {
      if (verbose) {
        return html`
            <fhir-wrapper-2 label="${label}" variant="details" ?summary=${summary} ?summaryonly=${summaryMode}>
                ${map(collection, (data: string, index: number) => generator(data, label + ' ' + show(index + 1), key))}
            </fhir-wrapper-2>
        `
      }

      return html`
          <fhir-wrapper-2 label="${label}" variant="details" ?summary=${summary} ?summaryonly=${summaryMode}>
              ${map(collection, (data: string, index: number) => generator(data, show(index + 1), key))}
          </fhir-wrapper-2>
      `
    }


    if (verbose) {
      return html`
          <fhir-wrapper-2 label="${label}" ?summaryonly=${summaryMode}>
              <fhir-empty-list ></fhir-empty-list >
          </fhir-wrapper-2>`
    }
  }
  return html``
}
