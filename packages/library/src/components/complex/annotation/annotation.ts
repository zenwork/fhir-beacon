/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, TemplateResult}                          from 'lit'
import {customElement}                                 from 'lit/decorators.js'
import {BaseElement, choiceOf, Decorated, Validations} from '../../../internal'
import {DisplayConfig}                                 from '../../../types'
import {PrimitiveType}                                 from '../../primitive/type-converters/type-converters'
import {AnnotationData}                                from './annotation.data'



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
    const author = choiceOf(this,
                            '',
                            '',
                            [
                                {
                                  data: data.authorReference,
                                  html: (d: any) => html`
                                      <fhir-reference key="authorReference"
                                                      label="author"
                                                      .data=${d}
                                                      summary
                                      ></fhir-reference>`
                                },
                                {
                                  data: data.authorString,
                                  html: (d: any) => html`
                                      <fhir-primitive key="authorString"
                                                      label="author"
                                                      .value=${d}
                                                      summary
                                      ></fhir-primitive>`
                                }
                              ])

    return [
      html`
          ${author}
          <fhir-primitive key="time" .value=${data.time} .type=${PrimitiveType.datetime} summary></fhir-primitive>
          <fhir-primitive key="text" .value=${data.text} .type=${PrimitiveType.markdown} summary></fhir-primitive>
      `
    ]
  }


  protected edited(data: AnnotationData, key: string, oldValue: unknown, newValue: unknown): void {
    super.edited(data, key, oldValue, newValue)
    console.log(oldValue, newValue, data)
  }
}
