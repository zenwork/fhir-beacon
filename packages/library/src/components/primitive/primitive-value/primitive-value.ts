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

  /**
   * Value representation variants.
   * accepted values:
   * - `fixed-width` - flow large blocks of text to a specific width
   * - `hide-overflow` - collapse large blocks of text
   * - `checkbox` - show a checkbox instead of text.
   */
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
      'variant-fixed-width': this.variant === 'fixed-width',
      'variant-hide-overflow': this.variant === 'hide-overflow',
      'variant-checkbox': this.variant === 'checkbox'
    }
    return html`
      <div class="${classMap(classes)}">
        ${this.computeValue()}
      </div>`
  }

  private computeValue = () => {
    if (this.variant === 'checkbox') {
      return html`
          <slot name="before"></slot>
          <sl-checkbox ?checked=${Boolean(this.text)} disabled size="small"></sl-checkbox>
          <slot name="after"></slot>`
    }

    if (this.link) {
      return html`
        <a href="${this.link}" target='_blank'>
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
