import {html, TemplateResult} from 'lit'
import {ResourceData}         from '../resources/structures'

export function renderResourceComponent(data: ResourceData | undefined): TemplateResult {
  if (data) {
    switch (data.resourceType) {
      case 'Substance':
        return html`
          <fhir-substance .data=${data}></fhir-substance >`
      case 'Medication':
        return html`
          <fhir-medication .data=${data}></fhir-medication >`
      default:
        return html`
          <fhir-not-supported description="contained reference can not be rendered"></fhir-not-supported >`
    }
  } else {
    return html``
  }
}
