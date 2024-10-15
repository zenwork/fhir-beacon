import {html, TemplateResult} from 'lit'
import {isBlank} from '../../../utilities'
import {BaseElement}          from '../../BaseElement'

type Choice<C> = { data: any, html: (data: any, name: string, error: string | undefined, context: C) => TemplateResult }

/**
 * Renders values when only on-of the provided choices should be rendered
 *
 * @param {BaseElement} contextElement - The base element providing context state.
 * @param name
 * @param error
 * @param {Choice[]} choices - An array of choices containing data to evaluate and template to conditionally render for
 *   that data.
 * @returns {TemplateResult | TemplateResult[]} - The rendered template result or an array of rendered template
 *   results.
 * @see http://hl7.org/fhir/formats.html#choice
 */
export function choiceOf<C extends BaseElement<any>>(contextElement: C,
                                                     name: string,
                                                     error: string | undefined,
                                                     choices: Choice<C>[]): TemplateResult[] {

  const templateResults: TemplateResult[] = []

  // add template if data is present
  choices.forEach(choice => {
    if (!isBlank(choice.data)) {
      templateResults.push(choice.html(choice.data, name, error, contextElement))
    }
  })

  // return result if only one choice is present
  if (templateResults.length === 1) {
    return templateResults
  }

  // return all results and error messages if showerror is set
  if (contextElement.showerror && templateResults.length > 1) {
    return [
      html`
          <fhir-wrapper .label=
                        ${'too many values'}
                        variant='error'
                        ?summaryonly=${contextElement.summaryonly}
        >
            ${templateResults}
            ${html`
                <fhir-error text="${'only one of the above should be present'}"></fhir-error>`}
          </fhir-wrapper>`
    ]
  }

  // otherwise return all results
  return templateResults
}
