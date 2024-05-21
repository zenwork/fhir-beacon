import {html}          from 'lit'
import {PrimitiveType} from '../data/primitive/converters'

export const renderError = (showError: boolean, verbose: boolean, label: string, value: string) => {
  return html`
    <fhir-primitive
        label=${label}
        value=${value}
        type=${PrimitiveType.forced_error}
        ?showerror=${showError}
        ?verbose=${verbose}
    ></fhir-primitive>`
}
