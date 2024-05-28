import {html, TemplateResult} from 'lit'
import {ResourceData}         from '../../components/resources'
import {DisplayConfig}        from '../../contexts/context'

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
      default:
        return html`
          <fhir-not-supported description="contained reference can not be rendered"></fhir-not-supported >`
    }
  } else {
    return html``
  }
}
