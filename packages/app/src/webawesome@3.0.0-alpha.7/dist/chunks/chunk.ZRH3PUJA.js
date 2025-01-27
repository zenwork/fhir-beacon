import {__decorateClass}                          from './chunk.CLOX737Y.js'
import {to}                                       from './chunk.EH2PNIGX.js'
import {er, ke}                                   from './chunk.FK6RKZHR.js'
import {Rt}                                       from './chunk.HBRIRAGU.js'
import {WaBlurEvent, WaFocusEvent}                from './chunk.Q3R7XCWP.js'
import {e, n, t, WebAwesomeFormAssociatedElement} from './chunk.ZFRMLSYQ.js'

// src/components/icon-button/icon-button.css
var icon_button_default = ':host {\n  --background-color-hover: var(--wa-color-neutral-fill-quiet);\n\n  display: inline-block;\n  color: var(--wa-color-text-quiet);\n}\n\n.icon-button {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  background: none;\n  border: none;\n  border-radius: var(--wa-border-radius-s);\n  font-size: inherit;\n  color: inherit;\n  padding: var(--wa-space-xs);\n  cursor: pointer;\n  transition: color var(--wa-transition-fast) var(--wa-transition-easing);\n  -webkit-appearance: none;\n}\n\n:host(:not([disabled])) .icon-button:hover,\n:host(:not([disabled])) .icon-button:focus-visible {\n  background-color: var(--wa-color-neutral-fill-quiet);\n  color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));\n}\n\n:host(:not([disabled])) .icon-button:active {\n  color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));\n}\n\n.icon-button:focus {\n  outline: none;\n}\n\n:host([disabled]) .icon-button {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.icon-button:focus-visible {\n  outline: var(--wa-focus-ring);\n  outline-offset: var(--wa-focus-ring-offset);\n}\n\n.icon {\n  pointer-events: none;\n}\n'

// src/components/icon-button/icon-button.ts
var WaIconButton = class extends WebAwesomeFormAssociatedElement {
    constructor() {
        super(...arguments)
        this.name = null
        this.label = ''
        this.disabled = false
    }

    handleBlur() {
        this.dispatchEvent(new WaBlurEvent())
    }

    handleFocus() {
        this.dispatchEvent(new WaFocusEvent())
    }

    handleClick(event) {
        if (this.disabled) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    /** Simulates a click on the icon button. */
    click() {
        this.button.click()
    }

    /** Removes focus from the icon button. */
    blur() {
        this.button.blur()
    }

    /** Sets focus on the icon button. */
    focus(options) {
        this.button.focus(options)
    }

    render() {
        const isLink = this.href ? true : false
        const tag = isLink ? er`a` : er`button`
        return ke`
      <${tag}
        part="base"
        class=${Rt({
                                                      'icon-button':true
                                                  })}
        ?disabled=${to(isLink ? void 0 : this.disabled)}
        type=${to(isLink ? void 0 : 'button')}
        href=${to(isLink ? this.href : void 0)}
        target=${to(isLink ? this.target : void 0)}
        download=${to(isLink ? this.download : void 0)}
        rel=${to(isLink && this.target ? 'noreferrer noopener' : void 0)}
        role=${to(isLink ? void 0 : 'button')}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-label="${this.label}"
        tabindex=${this.disabled ? '-1' : '0'}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <wa-icon
          class="icon"
          name=${to(this.name)}
          family=${to(this.family)}
          variant=${to(this.variant)}
          library=${to(this.library)}
          src=${to(this.src)}
          aria-hidden="true"
          fixed-width
        ></wa-icon>
      </${tag}>
    `
    }
}
WaIconButton.shadowStyle = icon_button_default
__decorateClass([
                    e('.icon-button')
                ], WaIconButton.prototype, 'button', 2)
__decorateClass([
                    n({reflect:true})
                ], WaIconButton.prototype, 'name', 2)
__decorateClass([
                    n({reflect:true})
                ], WaIconButton.prototype, 'family', 2)
__decorateClass([
                    n({reflect:true})
                ], WaIconButton.prototype, 'variant', 2)
__decorateClass([
                    n()
                ], WaIconButton.prototype, 'library', 2)
__decorateClass([
                    n()
                ], WaIconButton.prototype, 'src', 2)
__decorateClass([
                    n()
                ], WaIconButton.prototype, 'href', 2)
__decorateClass([
                    n()
                ], WaIconButton.prototype, 'target', 2)
__decorateClass([
                    n()
                ], WaIconButton.prototype, 'download', 2)
__decorateClass([
                    n()
                ], WaIconButton.prototype, 'label', 2)
__decorateClass([
                    n({type:Boolean})
                ], WaIconButton.prototype, 'disabled', 2)
WaIconButton = __decorateClass([
                                   t('wa-icon-button')
                               ], WaIconButton)

export {
    WaIconButton
}
