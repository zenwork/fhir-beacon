import {html} from 'lit'

export const renderError = (
  showError: boolean, verbose: boolean, label: string, value: string
) => {
  return html`
    <fhir-primitive
        label=${label}
        value=${value}
    ></fhir-primitive>`
}
