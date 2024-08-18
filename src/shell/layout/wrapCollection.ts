import {html, nothing, TemplateResult} from 'lit'
import {map}                           from 'lit/directives/map.js'
import {asReadable}                    from '../../components'
import {hasMany, hasOnlyOne, hasSome}  from './directives'

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
export function wrapBB<T>(key: string,
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
                          ${generator(data, pluralBase + show(index + 1), key)}
                      `)}
            </fhir-wrapper >
        `
      }

      return html`
          <fhir-wrapper label="${plural}" variant="primary" ?summary=${summary}>
              ${map(collection,
                    (data: T, index: number) => html`
                        ${generator(data, show(index + 1), key)}
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

    if (verbose) {
      label = k + (k ? '/' : '') + label
      return html`
          <fhir-wrapper label="${k} > ${label}">
              <fhir-empty-list ></fhir-empty-list >
          </fhir-wrapper >`
    }
  }
  return html``
}

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
    const k = asReadable(key, 'lower')

    if (hasMany(collection)) {
      if (verbose) {
        label = k + (k ? '/' : '') + label
        return html`
            <fhir-wrapper label="${pluralize(label)}" variant="primary" ?summary=${summary}>
                ${map(collection, (data: T, index: number) => generator(data, label + ' ' + show(index + 1), key))}
            </fhir-wrapper >
        `
      }

      return html`
          <fhir-wrapper label="${pluralize(label)}" variant="primary" ?summary=${summary}>
              ${map(collection, (data: T, index: number) => generator(data, label + ' ' + show(index + 1), key))}
          </fhir-wrapper >
      `
    }
    if (hasOnlyOne(collection)) {
      if (verbose) {
        label = k + (k ? '/' : '') + label
        return html`

            ${map(collection, (data: T) => generator(data, label, key))}

        `
      }

      return html`

          ${map(collection, (data: T) => generator(data, label, key))}

      `
    }


    if (verbose) {
      label = k + (k ? '/' : '') + label
      return html`
          <fhir-wrapper label="${k} > ${label}">
              <fhir-empty-list ></fhir-empty-list >
          </fhir-wrapper >`
    }
  }
  return html``
}


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

/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 * @param colName
 * @param data
 * @param verbose
 * @param generator
 * @deprecated use {@link wrap} instead
 */
export function wrapc<T>(
  colName: string, data: T[], verbose: boolean, generator: { (data: T, idx: string): TemplateResult }
): TemplateResult | any {
  return hasMany(data)
         ? html`
              <fhir-wrapper label="${colName}" variant="primary">
                  ${map(data,
                        (i: T, x: number) => html`
                            <fhir-wrapper label=${colName + show(x + 1)}>${generator(i, '')}</fhir-wrapper >`)}
              </fhir-wrapper >
    `
         : hasOnlyOne(data)
           ? html`
                      <fhir-wrapper label="${colName}" variant="primary"> ${generator(data[0], '')}</fhir-wrapper > `
           : verbose
             ? html`
                              <fhir-wrapper label="${colName}">
                                  <fhir-empty-list ></fhir-empty-list >
                              </fhir-wrapper >`
             : nothing
}

/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 * @param colName
 * @param data
 * @param verbose
 * @param generator
 * @param summary
 * @deprecated use {@link strap} instead
 */
export function wraps<T>(colName: string,
                         data: T[],
                         verbose: boolean,
                         generator: { (data: T, idx: string): TemplateResult },
                         summary: boolean = true
): TemplateResult | any {
  return hasMany(data)
         ? html`
              <fhir-structure-wrapper label="${colName}" ?summary=${summary}>
                  ${map(data, (i: T, x: number) => generator(i, show(x + 1)))}
              </fhir-structure-wrapper >
    `
         : hasOnlyOne(data)
           ? generator(data[0], '')
           : verbose
             ? html`
                              <fhir-structure-wrapper label="${colName}">
                                  <fhir-empty-list ></fhir-empty-list >
                              </fhir-structure-wrapper >`
             : nothing
}

/**
 * Displays the index if it is a number, otherwise returns an empty string.
 * @param {number|string} idx - The index to be displayed.
 * @return {string} - The formatted index or an empty string.
 */
export function show(idx: number | ''): string {
  return typeof idx === 'number' ? ' ' + idx : ''
}


function pluralize(word: string): string {

  // Regular patterns for different pluralization rules
  const pluralRules: { [key: string]: RegExp } = {
    ies: /(?<=[^aeiou])y$/i,
    oes: /(o)$/i,
    shes: /(sh)$/i,
    ches: /(ch)$/i,
    xes: /(x)$/i,
    ses: /(s)$/i,
    zes: /(z)$/i,
    ves: /(f|fe)$/i
  }

  // Applying the pluralization rules
  if (pluralRules['ies'].test(word)) {
    return word.replace(pluralRules['ies'], 'ies')
  }

  for (const [suffix, regex] of Object.entries(pluralRules)) {
    if (suffix === 'ies') continue // already handled
    if (regex.test(word)) {
      if (suffix !== 'ves') return word + 'es'
      return word.replace(pluralRules['ves'], 'ves')
    }
  }

  // Default pluralization rule
  return word + 's'
}
