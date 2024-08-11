import {html, nothing, TemplateResult} from 'lit'
import {map}                           from 'lit/directives/map.js'
import {hasMany, hasOnlyOne}           from './directives'

/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 * @param context
 * @param pluralBase
 * @param data
 * @param verbose
 * @param generator
 * @param summary
 */
export function wrap<T>(context: string,
                        pluralBase: string,
                        data: T[],
                        verbose: boolean,
                        generator: { (data: T, idx: string, ctx: string): TemplateResult },
                        summary: boolean = true): TemplateResult | any {

  const plural = pluralize(pluralBase)

  if (hasMany(data) || verbose) {
    if (verbose) {
      return html`
        <fhir-wrapper label="${context ? context + ' > ' : ''}${plural}" variant="primary" ?summary=${summary}>
          ${map(data, (data: T, index: number) => generator(data, pluralBase + show(index + 1), context ? context : pluralBase + show(index + 1)))}
        </fhir-wrapper > `
    }

    return html`
      <fhir-wrapper label="${plural}" variant="primary" ?summary=${summary}>
        ${map(data, (data: T, index: number) => generator(data, show(index + 1), context))}
      </fhir-wrapper > `
  }

  if (hasOnlyOne(data)) {
    if (verbose) {
      return generator(data[0], (context ? context + ' > ' : '') + pluralBase, context)

    }


    return generator(data[0], pluralBase, context)
  }

  if (verbose) {
    return html`
      <fhir-wrapper label="${context} > ${pluralBase}">
        <fhir-empty-list ></fhir-empty-list >
      </fhir-wrapper >`
  }
  return html``
}

/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 * @param colName
 * @param data
 * @param verbose
 * @param generator
 */
export function wrapc<T>(colName: string,
                         data: T[],
                         verbose: boolean,
                         generator: { (data: T, idx: string): TemplateResult }): TemplateResult | any {
  return hasMany(data)
         ? html`
        <fhir-wrapper label="${colName}" variant="primary">
          ${map(data,
              (i: T, x: number) => html`
                <fhir-wrapper label=${colName + show(x + 1)}>${generator(i, '')}</fhir-wrapper >`)}
        </fhir-wrapper > `
         : hasOnlyOne(data)
           ? html`
        <fhir-wrapper label="${colName}" variant="primary">
          ${generator(data[0], '')}
        </fhir-wrapper > `
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
        </fhir-structure-wrapper > `
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
    'ies': /(?<=[^aeiou])y$/i,
    'oes': /(o)$/i,
    'shes': /(sh)$/i,
    'ches': /(ch)$/i,
    'xes': /(x)$/i,
    'ses': /(s)$/i,
    'zes': /(z)$/i,
    'ves': /(f|fe)$/i
  }

  // Applying the pluralization rules
  if (pluralRules['ies'].test(word)) {
    return word.replace(pluralRules['ies'], 'ies')
  }
  for (const [suffix, regex] of Object.entries(pluralRules)) {
    if (suffix === 'ies') continue  // already handled
    if (regex.test(word)) {
      if (suffix !== 'ves') return word + 'es'
      return word.replace(pluralRules['ves'], 'ves')
    }
  }
  // Default pluralization rule
  return word + 's'
}
