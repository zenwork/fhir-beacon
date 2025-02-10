import {html, TemplateResult} from 'lit'
import {PrimitiveType}        from '../../components/primitive/type-converters/type-converters'
import {DisplayConfig}        from '../../shell/types'
import {ResourceData}         from './domain-resource.data'



export function renderResourceComponent(data: ResourceData | undefined,
                                        displayConfig: DisplayConfig,
                                        summary: boolean = false): TemplateResult {
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
              ?summary=${summary}
          ></fhir-substance >`
      case 'Medication':
        return html`
          <fhir-medication
              .data=${data}
              .mode=${displayConfig.mode}
              ?showerror=${displayConfig.showerror}
              ?verbose=${displayConfig.verbose}
              ?open=${displayConfig.open}
              ?summary=${summary}
          ></fhir-medication >`
      case 'Patient':
        return html`
          <fhir-patient
              .data=${data}
              .mode=${displayConfig.mode}
              ?showerror=${displayConfig.showerror}
              ?verbose=${displayConfig.verbose}
              ?open=${displayConfig.open}
              ?summary=${summary}
          ></fhir-patient >`
      case 'Observation':
        return html`
            <fhir-observation
                    .data=${data}
                    .mode=${displayConfig.mode}
                    ?showerror=${displayConfig.showerror}
                    ?verbose=${displayConfig.verbose}
                    ?open=${displayConfig.open}
                    ?summary=${summary}
            ></fhir-observation >`
      case 'Appointment':
        return html`
            <fhir-appointment
                    .data=${data}
                    .mode=${displayConfig.mode}
                    ?showerror=${displayConfig.showerror}
                    ?verbose=${displayConfig.verbose}
                    ?open=${displayConfig.open}
                    ?summary=${summary}
            ></fhir-appointment >`
      case 'Slot':
        return html`
            <fhir-slot
                    .data=${data}
                    .mode=${displayConfig.mode}
                    ?showerror=${displayConfig.showerror}
                    ?verbose=${displayConfig.verbose}
                    ?open=${displayConfig.open}
                    ?summary=${summary}
            ></fhir-slot >`
      case 'Account':
        return html`
            <fhir-account
                    .data=${data}
                    .mode=${displayConfig.mode}
                    ?showerror=${displayConfig.showerror}
                    ?verbose=${displayConfig.verbose}
                    ?open=${displayConfig.open}
                    ?summary=${summary}
            ></fhir-account >`
      default:
        return html`
            <fhir-primitive label="resource"
                            value="[${data.resourceType}] is not supported"
                            .type=${PrimitiveType.none}
                            ?summary=${summary}
            ></fhir-primitive>
        `

    }
  } else {
    return html``
  }
}
