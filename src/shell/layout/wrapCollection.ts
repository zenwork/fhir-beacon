import {html, nothing, TemplateResult} from 'lit'
import {map}                           from 'lit/directives/map.js'
import {hasMany, hasOnlyOne}           from './directives'
import './structure-wrapper/structure-wrapper'
import './wrapper/wrapper'
import './empty-set'

/**
 * Wrap a collection with the structured wrapper only when there is more than one entry
 * @param colName
 * @param data
 * @param verbose
 * @param generator
 */
export function wrap<T>(colName: string,
                        data: T[],
                        verbose: boolean,
                        generator: { (data: T, idx: string): TemplateResult },
                        summary: boolean = true): TemplateResult | any {
  return hasMany(data)
         ? html`
      <fhir-wrapper label="${colName}" variant="primary" ?summary=${summary}>
          ${map(data, (i: T, x: number) => generator(i, show(x)))}
        </fhir-wrapper > `
         : hasOnlyOne(data)
           ? generator(data[0], '')
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
                <fhir-wrapper label=${colName + show(x)}>${generator(i, '')}</fhir-wrapper >`)}
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
          ${map(data, (i: T, x: number) => generator(i, show(x)))}
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
  return typeof idx === 'number' ? ' [' + idx + ']' : ''
}
