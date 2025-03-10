/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, TemplateResult}                       from 'lit'
import {customElement}                              from 'lit/decorators.js'
import {BaseElement, Decorated, oneOf, Validations} from '../../../internal'
import {DisplayConfig}                              from '../../../shell/types'
import {PrimitiveType}                              from '../../primitive/type-converters/type-converters'
import {ReferenceData}                              from '../../special'
import {AnnotationData, AuthorFhirString}           from './annotation.data'



@customElement('fhir-annotation')
export class Annotation extends BaseElement<AnnotationData> {

  constructor() {super('Annotation')}

  public validate(data: AnnotationData, validations: Validations): void {

    if (data.authorString && data.authorReference) {
      validations.add({
                        fqk: { path: [{ node: this.type + '::author[x]' }] },
                        message: 'can only have one of authorString or authorReference'
                         })
    }
  }

  public renderDisplay(_config: DisplayConfig,
                       data: Decorated<AnnotationData>,
                       _validations: Validations): TemplateResult[] {
    return this.renderAll(data)
  }


  public renderStructure(_config: DisplayConfig,
                         data: Decorated<AnnotationData>,
                         _validations: Validations): TemplateResult[] {
    return this.renderAll(data)
  }

  protected renderAll(data: Decorated<AnnotationData>): TemplateResult[] {
    const author = oneOf(this,
                         '',
                         '',
                         [
                                {
                                  data: data.authorReference,
                                  html: (d: ReferenceData) => html`
                                      <fhir-reference key="authorReference"
                                                      label="author"
                                                      .data=${d}
                                                      summary
                                      ></fhir-reference>`
                                },
                                {
                                  data: data.authorString,
                                  html: (d: AuthorFhirString) => html`
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
          <fhir-primitive key="text" .value=${data.text} .type=${PrimitiveType.markdown} summary variant="fixed-width"></fhir-primitive>
      `
    ]
  }


  protected edited(data: AnnotationData, key: string, oldValue: unknown, newValue: unknown): void {
    super.edited(data, key, oldValue, newValue)
    console.log(oldValue, newValue, data)
  }
}
