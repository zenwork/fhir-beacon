import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'
import {asReadable}           from '../../../components/primitive/type-formatters/asReadable'
import {DisplayMode}          from '../../displayMode'
import {DisplayConfig}        from '../../types'
import {hasMany, hasOnlyOne}  from '../directives'
import {pluralize}            from '../pluralize'
import {show}                 from '../show'



export type Generators = 'fhir-identifier' | 'fhir-codeable-concept' | 'fhir-codeable-reference' | 'fhir-reference'

export const generators: {
  [key: string]: { (data: unknown, label: string, key: Generators, index: number): TemplateResult }
} = {
  'fhir-identifier': (data: unknown, label: string, key: string) => html`
      <fhir-identifier key=${key} label=${label} .data=${data} summary></fhir-identifier>`,
  'fhir-codeable-concept': (data: unknown, label: string, key: string) => html`
      <fhir-codeable-concept key=${key} label=${label} .data=${data} summary></fhir-codeable-concept>`,
  'fhir-codeable-reference': (data: unknown, label: string, key: string) => html`
      <fhir-codeable-reference key=${key} label=${label} .data=${data} summary></fhir-codeable-reference>`,
  'fhir-reference': (data: unknown, label: string, key: string) => html`
      <fhir-reference key=${key} label=${label} .data=${data} summary></fhir-reference>`

}

type WrapperConfig<T> = {
  key?: string,
  pluralBase?: string,
  collection: T[],
  generator: { (data: T, label: string, key: string, index: number): TemplateResult }
    | Generators,
  summary?: boolean,
  config: DisplayConfig
}


/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 *
 * @param key key defined in spec
 * @param pluralBase optional. key will be used if not defined
 * @param collection  data
 * @param generator  name of element (ex:fhir-identifier) or generator function
 * @param summary    defaults to true if not provided
 * @param config   display config
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
  if (!key && typeof generator === 'string') {
    key = generator.substring(5)
  }

  if (typeof generator === 'string') generator
    = generators[generator] as { (data: T, label: string, key: string): TemplateResult }

  if (key && typeof generator === 'function') {

    if (!config.summaryonly || config.summaryonly && summary) {
      const plural = pluralize(pluralBase || key)
      const label = pluralBase || key
      const k = asReadable(key, 'lower')

      if (hasMany(collection)) {
        if (config.verbose) {
          return html`
              <fhir-wrapper label="${plural}"
                            variant="details"
                            ?summary=${summary}
                            ?open=${config.open}
                            ?summaryonly=${config.summaryonly}
              >
                  ${map(collection,
                        (data: T, index: number) => generator(data, label + ' ' + show(index + 1), key, index))}
              </fhir-wrapper>
          `
        }

        return html`
            <fhir-wrapper label="${plural}"
                          variant="details"
                          ?summary=${summary}
                          ?open=${config.open}
                          ?summaryonly=${config.summaryonly}
            >
                ${map(collection, (data: T, index: number) => generator(data, show(index + 1), key, index))}
            </fhir-wrapper>
        `
      }

      if (hasOnlyOne(collection)) {
        return html`
            <fhir-wrapper label="${k}"
                          variant="details"
                          ?summary=${summary}
                          ?open=${config.open}
                          ?summaryonly=${config.summaryonly}
            >
                ${map(collection, (data: T, index: number) => generator(data, show(index + 1), key, index))}
            </fhir-wrapper>
        `

      }

      if (config.verbose && config.mode === DisplayMode.structure) {
        return html`
            <fhir-wrapper label="${label}" ?open=${config.open} ?summaryonly=${config.summaryonly}>
               ${generator(null as unknown as T, '*', key, 0)}
            </fhir-wrapper>`
      }
    }
  }

  return html``
}
