import {html, TemplateResult}                           from 'lit'
import {customElement}                                  from 'lit/decorators.js'
import {BaseElement, ValidationError, ValidationErrors} from '../../../internal'
import {oneOf}                                          from '../../../internal/base/oneOf'
import {PrimitiveType}                                  from '../../primitive/type-converters/type-converters'
import {AnnotationData}                                 from './annotation.data'

@customElement('fhir-annotation')
export class Annotation extends BaseElement<AnnotationData> {

  constructor() {super('Annotation')}

  protected validate(data: AnnotationData): ValidationErrors {
    const errors: ValidationError[] = super.validate(data)

    if (data.authorString && data.authorReference) {
      errors.push({ id: this.type + '::author[x]', err: 'can only have one of authorString or authorReference' })
    }
    return errors
  }

  protected renderAll(data: AnnotationData): TemplateResult | TemplateResult[] {
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
