import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'
import {asReadable}           from '../../../components'
import {hasMany, hasOnlyOne}  from '../directives'
import {pluralize}            from '../pluralize'
import {show}                 from '../show'

/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 * @param key
 * @param pluralBase
 * @param collection
 * @param verbose
 * @param generator
 * @param summary
 * @param summaryMode
 */
export function strap<T>(key: string,
                         pluralBase: string,
                         collection: T[],
                         verbose: boolean,
                         generator: { (data: T, label: string, key: string): TemplateResult },
                         summary: boolean = true,
                         summaryMode: boolean = false
): TemplateResult {
  if (!summaryMode || summaryMode && summary) {
    const plural = pluralize(pluralBase)
    const label = pluralBase
    const k = asReadable(key, 'lower')

    if (hasMany(collection)) {
      if (verbose) {
        return html`
            <fhir-structure-wrapper label="${plural}" variant="primary" ?summary=${summary}>
                ${map(collection, (data: T, index: number) => generator(data, label + ' ' + show(index + 1), key))}
            </fhir-structure-wrapper >
        `
      }

      return html`
          <fhir-structure-wrapper label="${plural}" variant="primary" ?summary=${summary}>
              ${map(collection, (data: T, index: number) => generator(data, show(index + 1), key))}
          </fhir-structure-wrapper >
      `
    }

    if (hasOnlyOne(collection)) {
      return html`
          <fhir-structure-wrapper label="${k}" variant="primary" ?summary=${summary}>
              ${map(collection, (data: T, index: number) => generator(data, show(index + 1), key))}
          </fhir-structure-wrapper >
      `

    }

    if (verbose) {
      return html`
          <fhir-structure-wrapper label="${label}" ?hide=${summary}>
              <fhir-empty-list ></fhir-empty-list >
          </fhir-structure-wrapper >`
    }
  }

  return html``
}
