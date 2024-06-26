import {html}                                           from 'lit'
import {customElement, property, queryAssignedElements} from 'lit/decorators.js'
import {ShoelaceStyledElement}                          from '../../../shell/shoelace-styled-element'
import {componentStyles}                                from './primitive-value.styles'

@customElement('fhir-value')
export class PrimitiveValue extends ShoelaceStyledElement {


  static styles = componentStyles

  @property()
  public placeholder = 'n/a'

  @property()
  public text = ''

  @property()
  declare variant: string

  @property()
  public link = ''

  @queryAssignedElements({slot: 'before'})
  beforeSlot!: Array<HTMLElement>

  @queryAssignedElements({slot: 'after'})
  afterSlot!: Array<HTMLElement>


  protected render(): unknown {
    return html`
      <div id=${this.id} class="${this.variant}">
        ${(this.computeValue())}
      </div>`
  }

  private computeValue = () => {

    if (this.link) {
      return html`
        <a href=${this.link}>
          <slot name="before"></slot>
          ${this.text}
          <slot name="after"></slot>
        </a>
      `
    }

    if (!this.text && this.placeholder) {
      return html`<span class="placeholder">${this.placeholder}</span>`
    }

    return html`
      <slot name="before"></slot>${this.text}
      <slot name="after"></slot>`

  }
}
