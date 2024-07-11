import {html, TemplateResult}              from 'lit'
import {customElement}                     from 'lit/decorators.js'
import {ValidationError, ValidationErrors} from '../../../internal/base/base-element'
import {BaseElementContextConsumer}        from '../../../internal/base/base-element-context-consumer'
import {BaseElementData}                   from '../../../internal/base/base-element.data'
import {PrimitiveType}                     from '../../primitive/type-converters'
import {AnnotationData}                    from './annotation.data'

@customElement('fhir-annotation')
export class Annotation extends BaseElementContextConsumer<AnnotationData> {

  constructor() {super('Annotation')}

  protected renderDisplay(data: AnnotationData): TemplateResult | TemplateResult[] {
    return this.renderAll(data)
  }

  protected renderStructure(data: AnnotationData): TemplateResult | TemplateResult[] {
    return this.renderAll(data)
  }

  protected validate(data: AnnotationData): ValidationErrors {
    const errors: ValidationError[] = super.validate(data)

    if (data.authorString && data.authorReference) {
      errors.push({ id: this.type + '::author[x]', err: 'can only have one of authorString or authorReference' })
    }
    console.log('errors:', errors)
    return errors
  }

  private renderAll = (data: AnnotationData) => {
    // TODO: need a good way to handle 'only one of' cases (ex: author[x])
    const author = oneOf(this,
      [
        {
          data: data.authorReference,
          html: (d: any) => html`
            <fhir-reference label="author" .data=${d} summary></fhir-reference >`
        },
        {
          data: data.authorString,
          html: (d: any) => html`
            <fhir-primitive label="author" .value=${d} summary></fhir-primitive >`
        }
      ]
    )

    return html`
      ${author}
      <fhir-primitive label="time" .value=${data.time} .type=${PrimitiveType.datetime} summary></fhir-primitive >
      <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.markdown} summary></fhir-primitive >
    `
  }
}


type Choice<C, D> = { data: any, html: (data: any, context: C) => TemplateResult }

/**
 * Applies a conditional template rendering based on the given choices to resolve "on-of" cases depicted with an [x]
 * in the spec.
 *
 * @param {BaseElementContextConsumer} context - The base element context consumer object.
 * @param {Choice[]} choices - An array of choices.
 * @returns {TemplateResult | TemplateResult[]} - The rendered template result or an array of rendered template results.
 */
function oneOf<C extends BaseElementContextConsumer<D>, D extends BaseElementData>(
  context: C,
  choices: Choice<C, D>[]): TemplateResult | TemplateResult[] {

  const results: TemplateResult[] = []

  choices.forEach(choice => {
    console.log('choice', choice)
    if (choice.data) {
      results.push(choice.html(choice.data, context))
    }
  })


  if (results.length === 1) {
    return results[0]
  }

  console.log(context.showerror, context.errors)

  if (context.showerror && context.errors.find(e => e.id.match(/.*author\[x].*/))) {
    const err = context.errors.find(e => e.id.match(/.*author\[x].*/))
    if (err) {
      return html`
        <fhir-wrapper .label=${err.id} variant='validation-error'>
          ${results[1]}
          ${html`<p >* ${err.err}</p >`}
        </fhir-wrapper >`
    }
  }

  return results
}
