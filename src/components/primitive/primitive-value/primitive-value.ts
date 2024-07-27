import {html}                                           from 'lit'
import {customElement, property, queryAssignedElements} from 'lit/decorators.js'
import {classMap}                                       from 'lit/directives/class-map.js'
import {ShoelaceStyledElement}                          from '../../../shell/shoelace-styled-element'
import {textHostStyles}                                 from '../../../styles/textHostStyles'
import {isBlank}                                        from '../../../utilities/isBlank'
import {componentStyles}                                from './primitive-value.styles'

@customElement('fhir-value')
export class PrimitiveValue extends ShoelaceStyledElement {


  static styles = [textHostStyles, componentStyles]

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
    const classes = {
      placeholder: this.variant === 'placeholder',
      error: this.variant === 'error',
      'fixed-width': this.variant === 'fixed-width',
      'hide-overflow': this.variant === 'hide-overflow'
    }
    return html`
      <div class="${classMap(classes)}">
        ${this.computeValue()}
      </div>`
  }

  private computeValue = () => {
    if (this.link) {
      return html`
        <a href="${this.link}" >
          <slot name="before"></slot>
          ${this.text}
          <slot name="after"></slot>
        </a>
      `
    }

    if (isBlank(this.text) && this.placeholder) {
      return html`<span class="placeholder">${this.placeholder}</span>`
    }

    return html`
      <slot name="before"></slot >
      ${this.text}
      <slot name="after"></slot>`
  }
}
