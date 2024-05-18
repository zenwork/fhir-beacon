import {html}          from 'lit'
import {customElement} from 'lit/decorators.js'
import {FhirElement}   from '../data/primitive/FhirElement'

@customElement('fhir-empty-set')
export class Empty extends FhirElement {

  protected render(): unknown {
    return html`
      <fhir-value placeholder="empty set"></fhir-value> `
  }
}
