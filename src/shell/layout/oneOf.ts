import {html, TemplateResult} from 'lit'
import {BaseElement}          from '../../internal/base/base-element'

type Choice<C> = { data: any, html: (data: any, context: C) => TemplateResult }

/**
 * Renders values when only on-of the provided choices should be rendered
 *
 * @param {BaseElement} contextElement - The base element providing context state.
 * @param {Choice[]} choices - An array of choices containing data to evaluate and template to conditionally render for that data.
 * @returns {TemplateResult | TemplateResult[]} - The rendered template result or an array of rendered template results.
 */
export function oneOf<C extends BaseElement<any>>(contextElement: C, choices: Choice<C>[]): TemplateResult | TemplateResult[] {

  const templateResults: TemplateResult[] = []

  // add template if data is present
  choices.forEach(choice => {
    if (choice.data) {
      templateResults.push(choice.html(choice.data, contextElement))
    }
  })

  // return result if only one choice is present
  if (templateResults.length === 1) {
    return templateResults[0]
  }

  // return all results and error messages if showerror is set
  if (contextElement.showerror) {
    const matchingError = contextElement.errors.find(e => e.id.match(/.*author\[x].*/))
    return html`
      <fhir-wrapper .label=${matchingError?.id ?? 'unknown error id'} variant='validation-error'>
        ${templateResults}
        ${html`<p >* ${matchingError?.err ?? 'unknown error'}</p >`}
      </fhir-wrapper >`
  }

  // otherwise return all results
  return templateResults
}
