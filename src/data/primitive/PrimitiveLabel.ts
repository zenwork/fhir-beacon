import {css, html, PropertyValues}                   from 'lit'
import {customElement, property, queryAssignedNodes} from 'lit/decorators.js'
import {FhirElement}                                 from './FhirElement'

@customElement('fhir-label')
export class PrimitiveLabel extends FhirElement {

  static styles = css`
    label {
      color: var(--sl-color-primary-700);
    }
  `

  @property()
  declare text: string

  @property()
  public delimiter: string = ': '

  @property()
  declare for: string

  @queryAssignedNodes()
  declare assignedElements: Array<HTMLElement>


  render() {
    return html`<label for=${this.for}}>${this.isSlotted ? '' : this.text}${this.isSlotted || !this.text ? '' : this.delimiter}
      <slot></slot>
    </label>`
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties)

    if (this.assignedElements.length == 0) {
      return
    }

    if (this.assignedElements[0].tagName == 'SLOT') {
      if ((this.assignedElements[0] as HTMLSlotElement).assignedElements().length > 0) {
        this.isSlotted = true
      }
    } else if (this.assignedElements[0].children.length > 0) {
      this.isSlotted = true
    }

  }

}
