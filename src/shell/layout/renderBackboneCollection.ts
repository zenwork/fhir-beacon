import {html, TemplateResult} from 'lit'
import {map}                  from 'lit/directives/map.js'
import {hasSome}              from './directives'

//TODO: need to decide if backnbone elements have a seperate element or not
export function renderSingleBackbone<T>(itemLabel: null | string,
                                        idx: number | null,
                                        verbose: boolean,
                                        template: TemplateResult) {
  return html`
    <fhir-structure-wrapper label="${itemLabel} ${idx ? '[' + (idx + 1) + ']' : ''}" ?hide=${!itemLabel && !verbose}>
      ${template}
    </fhir-structure-wrapper >
  `
}

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
        ${hasSome(collection)
          ? map(collection, (i, idx) => renderSingleBackbone(itemLabel, idx, verbose, templateGenerator(i, idx)))
          : html`
              <fhir-empty-list ></fhir-empty-list >`
        }
      </fhir-structure-wrapper >
    `
  }

  return html``

}
