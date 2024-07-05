import {html, PropertyValues}                        from 'lit'
import {customElement, property, queryAssignedNodes} from 'lit/decorators.js'
import {ShoelaceStyledElement}                       from '../../../shell/shoelace-styled-element'
import {textHostStyles}                              from '../../../styles/textHostStyles'
import {componentStyles}                             from './primitive-label.styles'

@customElement('fhir-label')
export class PrimitiveLabel extends ShoelaceStyledElement {

  static styles = [textHostStyles, componentStyles]

  @property({ reflect: true })
  declare text: string

  @property({ reflect: true })
  declare variant: string

  @property({ reflect: true })
  public delimiter: string = ':'

  @property({ reflect: true })
  declare for: string

  @queryAssignedNodes()
  declare assignedElements: Array<HTMLElement>


  render() {
    return html`<label class="${this.variant}" for=${this.for}>
      ${this.isSlotted ? html`` : this.text}${this.isSlotted || !this.text ? '' : this.delimiter}
      <slot></slot>
    </label>`
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties)

    if (this.assignedElements.length == 0) return

    if (this.assignedElements[0].tagName == 'SLOT') {
      if ((this.assignedElements[0] as HTMLSlotElement).assignedElements().length > 0) {
        this.isSlotted = true
      }
    } else if (this.assignedElements[0].children?.length > 0) {
      this.isSlotted = true
    }

  }

}
