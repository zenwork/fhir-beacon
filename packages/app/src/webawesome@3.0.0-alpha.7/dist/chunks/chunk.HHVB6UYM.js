import {watch}                                  from './chunk.2NT6DI7B.js'
import {getIconLibrary, unwatchIcon, watchIcon} from './chunk.67G6K3RA.js'
import {__decorateClass}                        from './chunk.CLOX737Y.js'
import {ke}                                     from './chunk.S3625EU6.js'
import {nt}                                     from './chunk.XCFYBH5U.js'
import {WaLoadEvent}                            from './chunk.YAKPUWOF.js'
import {n, r, t, WebAwesomeElement}             from './chunk.ZFRMLSYQ.js'

// src/events/error.ts
var WaErrorEvent = class extends Event {
    constructor() {
        super('wa-error', {bubbles:true, cancelable:false, composed:true})
    }
}

// src/components/icon/icon.css
var icon_default = ':host {\n  --primary-color: currentColor;\n  --primary-opacity: 1;\n  --secondary-color: currentColor;\n  --secondary-opacity: 0.4;\n\n  display: inline-flex;\n  box-sizing: content-box !important;\n  width: auto;\n  height: 1em;\n}\n\nsvg {\n  display: inline-block;\n  width: auto;\n  height: inherit;\n  fill: currentColor;\n\n  .fa-primary {\n    color: var(--primary-color);\n    opacity: var(--primary-opacity);\n  }\n\n  .fa-secondary {\n    color: var(--secondary-color);\n    opacity: var(--secondary-opacity);\n  }\n}\n\n:host([fixed-width]) {\n  width: 1em;\n  justify-content: center;\n}\n'

// src/components/icon/icon.ts
var CACHEABLE_ERROR = Symbol()
var RETRYABLE_ERROR = Symbol()
var parser
var iconCache = /* @__PURE__ */ new Map()
var WaIcon = class extends WebAwesomeElement {
    constructor() {
        super(...arguments)
        this.initialRender = false
        this.svg = null
        this.label = ''
        this.library = 'default'
    }

    connectedCallback() {
        super.connectedCallback()
        watchIcon(this)
    }

    firstUpdated() {
        this.initialRender = true
        this.setIcon()
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        unwatchIcon(this)
    }

    getIconSource() {
        const library = getIconLibrary(this.library)
        if (this.name && library) {
            return {
                url:library.resolver(this.name, this.family, this.variant),
                fromLibrary:true
            }
        }
        return {
            url:this.src,
            fromLibrary:false
        }
    }

    /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
    async resolveIcon(url, library) {
        let fileData
        if (library?.spriteSheet) {
            this.svg = ke`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`
            await this.updateComplete
            const svg = this.shadowRoot.querySelector('[part=\'svg\']')
            if (typeof library.mutator === 'function') {
                library.mutator(svg)
            }
            return this.svg
        }
        try {
            fileData = await fetch(url, {mode:'cors'})
            if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR
        } catch {
            return RETRYABLE_ERROR
        }
        try {
            const div = document.createElement('div')
            div.innerHTML = await fileData.text()
            const svg = div.firstElementChild
            if (svg?.tagName?.toLowerCase() !== 'svg') return CACHEABLE_ERROR
            if (!parser) parser = new DOMParser()
            const doc = parser.parseFromString(svg.outerHTML, 'text/html')
            const svgEl = doc.body.querySelector('svg')
            if (!svgEl) return CACHEABLE_ERROR
            svgEl.part.add('svg')
            return document.adoptNode(svgEl)
        } catch {
            return CACHEABLE_ERROR
        }
    }

    handleLabelChange() {
        const hasLabel = typeof this.label === 'string' && this.label.length > 0
        if (hasLabel) {
            this.setAttribute('role', 'img')
            this.setAttribute('aria-label', this.label)
            this.removeAttribute('aria-hidden')
        } else {
            this.removeAttribute('role')
            this.removeAttribute('aria-label')
            this.setAttribute('aria-hidden', 'true')
        }
    }

    async setIcon() {
        const {url, fromLibrary} = this.getIconSource()
        const library = fromLibrary ? getIconLibrary(this.library) : void 0
        if (!url) {
            this.svg = null
            return
        }
        let iconResolver = iconCache.get(url)
        if (!iconResolver) {
            iconResolver = this.resolveIcon(url, library)
            iconCache.set(url, iconResolver)
        }
        if (!this.initialRender) {
            return
        }
        const svg = await iconResolver
        if (svg === RETRYABLE_ERROR) {
            iconCache.delete(url)
        }
        if (url !== this.getIconSource().url) {
            return
        }
        if (nt(svg)) {
            this.svg = svg
            return
        }
        switch (svg) {
            case RETRYABLE_ERROR:
            case CACHEABLE_ERROR:
                this.svg = null
                this.dispatchEvent(new WaErrorEvent())
                break
            default:
                this.svg = svg.cloneNode(true)
                library?.mutator?.(this.svg)
                this.dispatchEvent(new WaLoadEvent())
        }
    }

    updated(changedProperties) {
        super.updated(changedProperties)
        const library = getIconLibrary(this.library)
        const svg = this.shadowRoot?.querySelector('svg')
        if (svg) {
            library?.mutator?.(svg)
        }
    }

    render() {
        if (this.hasUpdated) {
            return this.svg
        }
        return ke`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`
    }
}
WaIcon.shadowStyle = icon_default
__decorateClass([
                    r()
                ], WaIcon.prototype, 'svg', 2)
__decorateClass([
                    n({reflect:true})
                ], WaIcon.prototype, 'name', 2)
__decorateClass([
                    n({reflect:true})
                ], WaIcon.prototype, 'family', 2)
__decorateClass([
                    n({reflect:true})
                ], WaIcon.prototype, 'variant', 2)
__decorateClass([
                    n({attribute:'fixed-width', type:Boolean, reflect:true})
                ], WaIcon.prototype, 'fixedWidth', 2)
__decorateClass([
                    n()
                ], WaIcon.prototype, 'src', 2)
__decorateClass([
                    n()
                ], WaIcon.prototype, 'label', 2)
__decorateClass([
                    n({reflect:true})
                ], WaIcon.prototype, 'library', 2)
__decorateClass([
                    watch('label')
                ], WaIcon.prototype, 'handleLabelChange', 1)
__decorateClass([
                    watch(['family', 'name', 'library', 'variant', 'src'])
                ], WaIcon.prototype, 'setIcon', 1)
WaIcon = __decorateClass([
                             t('wa-icon')
                         ], WaIcon)

export {
    WaErrorEvent,
    WaIcon
}
