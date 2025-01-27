import {watch}                                                       from './chunk.2NT6DI7B.js'
import {__decorateClass}                                             from './chunk.CLOX737Y.js'
import {to}                                                          from './chunk.EH2PNIGX.js'
import {er, ke}                                                      from './chunk.FK6RKZHR.js'
import {button_default, button_default2}                             from './chunk.GLYREFHN.js'
import {Rt}                                                          from './chunk.HBRIRAGU.js'
import {appearance_default}                                          from './chunk.IMQ5VF4L.js'
import {LocalizeController}                                          from './chunk.JVQWFNCH.js'
import {size_default}                                                from './chunk.KRGARW7X.js'
import {variants_default}                                            from './chunk.NS6XBGFB.js'
import {WaBlurEvent, WaFocusEvent}                                   from './chunk.Q3R7XCWP.js'
import {MirrorValidator}                                             from './chunk.RH6KZZ6S.js'
import {e, n, r, t, WaInvalidEvent, WebAwesomeFormAssociatedElement} from './chunk.ZFRMLSYQ.js'

// src/components/button/button.ts
var WaButton = class extends WebAwesomeFormAssociatedElement {
    constructor() {
        super(...arguments)
        this.assumeInteractionOn = ['click']
        this.localize = new LocalizeController(this)
        this.visuallyHiddenLabel = false
        this.invalid = false
        this.title = ''
        this.variant = 'neutral'
        this.appearance = 'accent'
        this.size = 'medium'
        this.caret = false
        this.disabled = false
        this.loading = false
        this.pill = false
        this.type = 'button'
        this.name = null
        this.value = null
        this.href = ''
        this.form = null
    }

    handleBlur() {
        this.dispatchEvent(new WaBlurEvent())
    }

    handleFocus() {
        this.dispatchEvent(new WaFocusEvent())
    }

    handleClick() {
        const form = this.getForm()
        if (!form) return
        const lightDOMButton = this.constructLightDOMButton()
        this.parentElement?.append(lightDOMButton)
        lightDOMButton.click()
        lightDOMButton.remove()
    }

    constructLightDOMButton() {
        const button = document.createElement('button')
        button.type = this.type
        button.style.position = 'absolute'
        button.style.width = '0'
        button.style.height = '0'
        button.style.clipPath = 'inset(50%)'
        button.style.overflow = 'hidden'
        button.style.whiteSpace = 'nowrap'
        if (this.name) {
            button.name = this.name
        }
        button.value = this.value || '';
        ['form', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'].forEach((attr) => {
            if (this.hasAttribute(attr)) {
                button.setAttribute(attr, this.getAttribute(attr))
            }
        })
        return button
    }

    handleInvalid() {
        this.dispatchEvent(new WaInvalidEvent())
    }

    handleLabelSlotChange(event) {
        const elements = event.target.assignedElements({flatten:true})
        if (elements.length === 1 && elements[0].localName === 'wa-visually-hidden') {
            this.visuallyHiddenLabel = true
        }
    }

    isButton() {
        return this.href ? false : true
    }

    isLink() {
        return this.href ? true : false
    }

    handleDisabledChange() {
        this.updateValidity()
    }

    // eslint-disable-next-line
    setValue(..._args) {
    }

    static get validators() {
        return [...super.validators, MirrorValidator()]
    }

    /** Simulates a click on the button. */
    click() {
        this.button.click()
    }

    /** Removes focus from the button. */
    blur() {
        this.button.blur()
    }

    /** Sets focus on the button. */
    focus(options) {
        this.button.focus(options)
    }

    getBoundingClientRect() {
        let rect = super.getBoundingClientRect()
        let buttonRect = this.button.getBoundingClientRect()
        if (rect.width === 0 && buttonRect.width > 0) {
            return buttonRect
        }
        return rect
    }

    render() {
        const isLink = this.isLink()
        const tag = isLink ? er`a` : er`button`
        return ke`
      <${tag}
        part="base"
        class=${Rt({
                                                      button:true,
                                                      'wa-button':true,
                                                      caret:this.caret,
                                                      disabled:this.disabled,
                                                      loading:this.loading,
                                                      rtl:this.localize.dir() === 'rtl',
                                                      'visually-hidden-label':this.visuallyHiddenLabel
                                                  })}
        ?disabled=${to(isLink ? void 0 : this.disabled)}
        type=${to(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${to(isLink ? void 0 : this.name)}
        value=${to(isLink ? void 0 : this.value)}
        href=${to(isLink ? this.href : void 0)}
        target=${to(isLink ? this.target : void 0)}
        download=${to(isLink ? this.download : void 0)}
        rel=${to(isLink && this.rel ? this.rel : void 0)}
        role=${to(isLink ? void 0 : 'button')}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="prefix"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="suffix" part="suffix" class="suffix"></slot>
        ${this.caret ? ke`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              ` : ''}
        ${this.loading ? ke`<wa-spinner part="spinner"></wa-spinner>` : ''}
      </${tag}>
    `
    }
}
WaButton.shadowStyle = [variants_default, appearance_default, size_default, button_default, button_default2]
__decorateClass([
                    e('.wa-button')
                ], WaButton.prototype, 'button', 2)
__decorateClass([
                    r()
                ], WaButton.prototype, 'visuallyHiddenLabel', 2)
__decorateClass([
                    r()
                ], WaButton.prototype, 'invalid', 2)
__decorateClass([
                    n()
                ], WaButton.prototype, 'title', 2)
__decorateClass([
                    n({reflect:true})
                ], WaButton.prototype, 'variant', 2)
__decorateClass([
                    n({reflect:true})
                ], WaButton.prototype, 'appearance', 2)
__decorateClass([
                    n({reflect:true})
                ], WaButton.prototype, 'size', 2)
__decorateClass([
                    n({type:Boolean, reflect:true})
                ], WaButton.prototype, 'caret', 2)
__decorateClass([
                    n({type:Boolean})
                ], WaButton.prototype, 'disabled', 2)
__decorateClass([
                    n({type:Boolean, reflect:true})
                ], WaButton.prototype, 'loading', 2)
__decorateClass([
                    n({type:Boolean, reflect:true})
                ], WaButton.prototype, 'pill', 2)
__decorateClass([
                    n()
                ], WaButton.prototype, 'type', 2)
__decorateClass([
                    n({reflect:true})
                ], WaButton.prototype, 'name', 2)
__decorateClass([
                    n({reflect:true})
                ], WaButton.prototype, 'value', 2)
__decorateClass([
                    n()
                ], WaButton.prototype, 'href', 2)
__decorateClass([
                    n()
                ], WaButton.prototype, 'target', 2)
__decorateClass([
                    n()
                ], WaButton.prototype, 'rel', 2)
__decorateClass([
                    n()
                ], WaButton.prototype, 'download', 2)
__decorateClass([
                    n({reflect:true})
                ], WaButton.prototype, 'form', 2)
__decorateClass([
                    n({attribute:'formaction'})
                ], WaButton.prototype, 'formAction', 2)
__decorateClass([
                    n({attribute:'formenctype'})
                ], WaButton.prototype, 'formEnctype', 2)
__decorateClass([
                    n({attribute:'formmethod'})
                ], WaButton.prototype, 'formMethod', 2)
__decorateClass([
                    n({attribute:'formnovalidate', type:Boolean})
                ], WaButton.prototype, 'formNoValidate', 2)
__decorateClass([
                    n({attribute:'formtarget'})
                ], WaButton.prototype, 'formTarget', 2)
__decorateClass([
                    watch('disabled', {waitUntilFirstUpdate:true})
                ], WaButton.prototype, 'handleDisabledChange', 1)
WaButton = __decorateClass([
                               t('wa-button')
                           ], WaButton)

export {
    WaButton
}
