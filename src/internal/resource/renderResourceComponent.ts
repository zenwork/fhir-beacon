import {html, TemplateResult} from 'lit'
import {PrimitiveType}        from '../../components/primitive/type-converters/type-converters'

import {DisplayConfig} from '../contexts/context.data'

import {ResourceData} from './domain-resource.data'

export function renderResourceComponent(data: ResourceData | undefined, displayConfig: DisplayConfig): TemplateResult {
  if (data && displayConfig) {
    switch (data.resourceType) {
      case 'Substance':
        return html`
          <fhir-substance
              .data=${data}
              .mode=${displayConfig.mode}
              ?showerror=${displayConfig.showerror}
              ?verbose=${displayConfig.verbose}
              ?open=${displayConfig.open}
          ></fhir-substance >`
      case 'Medication':
        return html`
          <fhir-medication
              .data=${data}
              .mode=${displayConfig.mode}
              ?showerror=${displayConfig.showerror}
              ?verbose=${displayConfig.verbose}
              ?open=${displayConfig.open}
          ></fhir-medication >`
      case 'Patient':
        return html`
          <fhir-patient
              .data=${data}
              .mode=${displayConfig.mode}
              ?showerror=${displayConfig.showerror}
              ?verbose=${displayConfig.verbose}
              ?open=${displayConfig.open}
          ></fhir-patient >`
      default:
        return html`
          <fhir-primitive label="resource" value="[${data.resourceType}] is not supported" .type=${PrimitiveType.none}></fhir-primitive >
        `

    }
  } else {
    return html``
  }
}
