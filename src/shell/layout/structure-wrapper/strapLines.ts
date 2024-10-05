import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'
import {asReadable}           from '../../../components'
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

    const k = asReadable(key, 'lower')

    if (hasSome(collection)) {
      if (verbose) {
        return html`
            <fhir-structure-wrapper label="${label}" variant="primary" ?summary=${summary}>
                ${map(collection, (data: string, index: number) => generator(data, label + ' ' + show(index + 1), key))}
            </fhir-structure-wrapper >
        `
      }

      return html`
          <fhir-structure-wrapper label="${label}" variant="primary" ?summary=${summary}>
              ${map(collection, (data: string, index: number) => generator(data, show(index + 1), key))}
          </fhir-structure-wrapper >
      `
    }


    if (verbose) {
      return html`
          <fhir-wrapper label="${k} > ${label}">
              <fhir-empty-list ></fhir-empty-list >
          </fhir-wrapper >`
    }
  }
  return html``
}
