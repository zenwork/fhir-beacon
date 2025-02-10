import {html, TemplateResult}   from 'lit'
import {customElement}          from 'lit/decorators.js'
import {BaseElement, Decorated} from '../../../internal'
import {DisplayConfig}          from '../../../shell/types'
import {PrimitiveType}          from '../../primitive'
import {AttachmentData}         from './attachment.data'



const { decimal, datetime, positiveInt, integer64, url, base64, code, none } = PrimitiveType

@customElement('fhir-attachment')
export class Attachment extends BaseElement<AttachmentData> {
  constructor() {super('Attachment')}

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AttachmentData>): TemplateResult[] {
    return this.generate(data)
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<AttachmentData>): TemplateResult[] {
    return this.generate(data)
  }

  private generate(data: Decorated<AttachmentData>) {
    return [
      html`
          <fhir-primitive key="contentType"
                          label="content type"
                          .value=${data.contentType}
                          type=${code}
                          summary
          ></fhir-primitive>
          <fhir-primitive key="language"
                          label="langauge"
                          .value=${data.language}
                          .type=${code}
                          summary
          ></fhir-primitive>
          <fhir-primitive key="data"
                          label="data"
                          .value=${data.data}
                          .type=${base64}
                          variant="hide-overflow"
          ></fhir-primitive>
          <fhir-primitive key="url" label="url" .value=${data.url} .type=${url} summary></fhir-primitive>
          <fhir-primitive key="size"
                          label="size"
                          .value=${data.size}
                          .type=${integer64}
                          summary
          ></fhir-primitive>
          <fhir-primitive key="hash"
                          label="hash"
                          .value=${data.hash}
                          .type=${base64}
                          summary
          ></fhir-primitive>
          <fhir-primitive key="title"
                          label="title"
                          .value=${data.title}
                          .type=${none}
                          summary
                          translate
          ></fhir-primitive>
          <fhir-primitive key="creation"
                          label="creation"
                          .value=${data.creation}
                          .type=${datetime}
                          summary
          ></fhir-primitive>
          <fhir-primitive key="height"
                          label="height"
                          .value=${data.height}
                          .type=${positiveInt}
                          trialuse
          ></fhir-primitive>
          <fhir-primitive key="width"
                          label="width"
                          .value=${data.width}
                          .type=${positiveInt}
                          trialuse
          ></fhir-primitive>
          <fhir-primitive key="frames"
                          label="frames"
                          .value=${data.frames}
                          .type=${positiveInt}
                          trialuse
          ></fhir-primitive>
          <fhir-primitive key="duration"
                          label="duration"
                          .value=${data.duration}
                          .type=${decimal}
                          trialuse
          ></fhir-primitive>

      `
    ]
  }
}
