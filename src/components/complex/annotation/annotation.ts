/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, TemplateResult}                from 'lit'
import {customElement}                       from 'lit/decorators.js'
import {BaseElement, Decorated, Validations} from '../../../internal'
import {oneOrError}                          from '../../../internal/base/util/oneOrError'
import {DisplayConfig}                       from '../../../types'
import {PrimitiveType}                       from '../../primitive/type-converters/type-converters'
import {AnnotationData}                      from './annotation.data'

@customElement('fhir-annotation')
export class Annotation extends BaseElement<AnnotationData> {

  constructor() {super('Annotation')}

  public validate(data: AnnotationData, validations: Validations): void {

    if (data.authorString && data.authorReference) {
      validations.addErr({
                           key: this.type + '::author[x]',
                           err: 'can only have one of authorString or authorReference'
                         })
    }
  }

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AnnotationData>,
                       validations: Validations): TemplateResult[] {
    return this.renderAll(data)
  }


  public renderStructure(config: DisplayConfig,
                         data: Decorated<AnnotationData>,
                         validations: Validations): TemplateResult[] {
    return this.renderAll(data)
  }

  protected renderAll(data: Decorated<AnnotationData>): TemplateResult[] {
    const author = oneOrError(this,
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
                              ])

    return [
      html`
          ${author}
          <fhir-primitive label="time" .value=${data.time} .type=${PrimitiveType.datetime} summary></fhir-primitive >
          <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.markdown} summary></fhir-primitive >
      `
    ]
  }
}
