import {html, TemplateResult}       from 'lit'
import {map}                        from 'lit/directives/map.js'
import {asReadable}                 from '../../../components'
import {DisplayConfig, DisplayMode} from '../../../types'
import {hasMany, hasOnlyOne}        from '../directives'
import {pluralize}                  from '../pluralize'
import {show}                       from '../show'

type WrapperConfig<T> = {
  key: string,
  pluralBase: string,
  collection: T[],
  generator: { (data: T, label: string, key: string): TemplateResult },
  summary: boolean,
  config: DisplayConfig
}

/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 * @param key
 * @param pluralBase
 * @param collection
 * @param generator
 * @param summary
 * @param config
 */
export function strap<T>({
                           key,
                           pluralBase,
                           collection,
                           generator,
                           summary = true,
                           config
                         }: WrapperConfig<T>
): TemplateResult {
  if (!config.summaryonly || config.summaryonly && summary) {
    const plural = pluralize(pluralBase)
    const label = pluralBase
    const k = asReadable(key, 'lower')

    if (hasMany(collection)) {
      if (config.verbose) {
        return html`
            <fhir-wrapper-2 label="${plural}"
                            variant="details"
                            ?summary=${summary}
                            ?open=${config.open}
                            ?summaryonly=${config.summaryonly}
            >
                ${map(collection, (data: T, index: number) => generator(data, label + ' ' + show(index + 1), key))}
            </fhir-wrapper-2>
        `
      }

      return html`
          <fhir-wrapper-2 label="${plural}"
                          variant="details"
                          ?summary=${summary}
                          ?open=${config.open}
                          ?summaryonly=${config.summaryonly}
          >
              ${map(collection, (data: T, index: number) => generator(data, show(index + 1), key))}
          </fhir-wrapper-2>
      `
    }

    if (hasOnlyOne(collection)) {
      return html`
          <fhir-wrapper-2 label="${k}"
                          variant="details"
                          ?summary=${summary}
                          ?open=${config.open}
                          ?summaryonly=${config.summaryonly}
          >
              ${map(collection, (data: T, index: number) => generator(data, show(index + 1), key))}
          </fhir-wrapper-2>
      `

    }

    if (config.verbose && config.mode === DisplayMode.structure) {
      return html`
          <fhir-wrapper-2 label="${label}" ?open=${config.open} ?summaryonly=${config.summaryonly}>
              ${generator(null as unknown as T, '*', key)}
          </fhir-wrapper-2>`
    }
  }

  return html``
}
