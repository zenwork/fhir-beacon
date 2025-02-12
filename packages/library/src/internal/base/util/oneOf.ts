import {html, TemplateResult} from 'lit'
import {DisplayMode}          from '../../../shell/displayMode'
import {isBlank}              from '../../../utilities'
import {BaseElement}          from '../../BaseElement'



type Choice<C, D> = {
  data: D | undefined,
  html: (data: D, name: string, error: string | undefined, context: C) => TemplateResult
}

export function choice<C extends BaseElement<any>, D>(data: D | undefined,
                                                      html: (data: D,
                                                             name: string,
                                                             error: string | undefined,
                                                             context: C) => TemplateResult): Choice<C, D> {
  return { data, html }
}
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
export function oneOf<C extends BaseElement<any>, T extends Array<Choice<C, any>>>(contextElement: C,
                                                                                   name: string,
                                                                                   error: string | undefined,
                                                                                   choices: [...T]): TemplateResult[] {

  let templateResults: TemplateResult[] = []
  let countPropsPresent = 0

  if (contextElement.mode === DisplayMode.structure && contextElement.verbose) {
    // add all templates
    choices.forEach(choice => {
      if (!isBlank(choice.data)) {
        countPropsPresent++
      }
      templateResults.push(choice.html(choice.data, name, error, contextElement))
    })
    templateResults = [
      html`
          <fhir-wrapper .label=${name}
                        ?summaryonly=${contextElement.summaryonly}
          >
              ${templateResults}
          </fhir-wrapper>`
    ]


  } else {

    // add template if data is present
    choices.forEach(choice => {
      if (!isBlank(choice.data)) {
        countPropsPresent++
        templateResults.push(choice.html(choice.data, name, error, contextElement))
      }
    })


  }

  // return all results and error messages if showerror is set
  if (contextElement.showerror && countPropsPresent++ > 1) {
    templateResults = [
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
