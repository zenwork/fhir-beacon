import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'

/**
 * Renders a Backbone collection using provided template and labels.
 *
 * @param {string} groupLabel - The label for the collection group.
 * @param {string | null} itemLabel - The label for each item in the collection.
 * @param {T[]} collection - The collection of items to render.
 * @param {function(item: T, index: number): TemplateResult} templateGenerator - The function that generates the template for each item in the collection.
 * @param {boolean} [verbose=false] - Whether to display verbose output.
 *
 * @return {TemplateResult} - The rendered result as a TemplateResult.
 */
export function renderBackboneCollection<T>(groupLabel: string,
                                            itemLabel: string | null,
                                            collection: T[],
                                            templateGenerator: (item: T, index: number) => TemplateResult,
                                            verbose: boolean = false): TemplateResult {

  if (collection || verbose) {
    return html`
      <fhir-structure-wrapper label="${groupLabel}" ?hide=${!collection || collection.length <= 1}>
        ${collection && collection.length > 0 ? map(collection, (i, idx) => html`
          <fhir-structure-wrapper label="${itemLabel} [${idx + 1}]" ?hide=${!itemLabel && !verbose}>
            ${templateGenerator(i, idx)}
          </fhir-structure-wrapper >
        `) : html`
          <fhir-empty-list ></fhir-empty-list >`}
      </fhir-structure-wrapper >
    `
  }

  return html``

}
