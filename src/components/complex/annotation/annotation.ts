import {html, TemplateResult}              from 'lit'
import {customElement}                     from 'lit/decorators.js'
import {ValidationError, ValidationErrors} from '../../../internal/base/base-element'
import {BaseElementContextConsumer}        from '../../../internal/base/base-element-context-consumer'
import {oneOf}                             from '../../../shell/layout/oneOf'
import {PrimitiveType}                     from '../../primitive/type-converters'
import {AnnotationData}                    from './annotation.data'

@customElement('fhir-annotation')
export class Annotation extends BaseElementContextConsumer<AnnotationData> {

  constructor() {super('Annotation')}

  protected validate(data: AnnotationData): ValidationErrors {
    const errors: ValidationError[] = super.validate(data)

    if (data.authorString && data.authorReference) {
      errors.push({ id: this.type + '::author[x]', err: 'can only have one of authorString or authorReference' })
    }
    return errors
  }

  protected renderAlways(data: AnnotationData): TemplateResult | TemplateResult[] {
    //console.log(this.type, 'render always', data)
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
