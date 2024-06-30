import {html}                  from 'lit'
import {customElement}         from 'lit/decorators.js'
import {ShoelaceStyledElement} from '../shoelace-styled-element'

@customElement('fhir-empty-list')
export class EmptySet extends ShoelaceStyledElement {

  protected render(): unknown {
    return html`
      <fhir-value placeholder="empty list"></fhir-value > `
  }
}
