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
 * @param open
 */
export function strap<T extends Record<any, any>>(key: string,
                                                  pluralBase: string,
                                                  collection: T[],
                                                  verbose: boolean,
                                                  generator: { (data: T, label: string, key: string): TemplateResult },
                                                  summary: boolean = true,
                                                  summaryMode: boolean = false,
                                                  open: boolean = false
): TemplateResult {
  if (!summaryMode || summaryMode && summary) {
    const plural = pluralize(pluralBase)
    const label = pluralBase
    const k = asReadable(key, 'lower')

    if (hasMany(collection)) {
      if (verbose) {
        return html`
            <fhir-wrapper-2 label="${plural}" variant="details" ?summary=${summary} ?open=${open}>
                ${map(collection, (data: T, index: number) => generator(data, label + ' ' + show(index + 1), key))}
            </fhir-wrapper-2>
        `
      }

      return html`
          <fhir-wrapper-2 label="${plural}" variant="details" ?summary=${summary} ?open=${open}>
              ${map(collection, (data: T, index: number) => generator(data, show(index + 1), key))}
          </fhir-wrapper-2>
      `
    }

    if (hasOnlyOne(collection)) {
      return html`
          <fhir-wrapper-2 label="${k}" variant="details" ?summary=${summary} ?open=${open}>
              ${map(collection, (data: T, index: number) => generator(data, show(index + 1), key))}
          </fhir-wrapper-2>
      `

    }

    if (verbose) {
      return html`
          <fhir-wrapper-2 label="${label}" ?headless=${summary} ?open=${open}>
              <fhir-empty-list></fhir-empty-list>
          </fhir-wrapper-2>`
    }
  }

  return html``
}
